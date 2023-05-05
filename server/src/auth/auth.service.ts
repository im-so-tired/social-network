import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly JwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokenPair(user.id);
    return {
      user: this.userService.returnUserFields(user),
      ...tokens,
    };
  }

  async register(dto: RegisterDto, avatar: Express.Multer.File) {
    const oldUser = await this.userRepository.findOneBy({ email: dto.email });
    if (oldUser)
      throw new BadRequestException(
        'User with this email is already in the system!',
      );

    const salt = await genSalt(10);

    const newUser = this.userRepository.create({
      ...dto,
      password: await hash(dto.password, salt),
      avatarPath: avatar ? avatar.filename : 'default-avatar.jpg',
    });

    const tokens = await this.issueTokenPair(newUser.id);
    const user = await this.userRepository.save(newUser);
    return {
      user: this.userService.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Please sign in!');
    try {
      const result = await this.JwtService.verifyAsync(refreshToken);
      const user = await this.userService.byId(result.id);
      const tokens = await this.issueTokenPair(user.id);
      return {
        user,
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token or expired');
    }
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('User not found');
    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword) throw new UnauthorizedException('Wrong password');
    return user;
  }

  async issueTokenPair(userId: number) {
    const data = { id: userId };
    const refreshToken = await this.JwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.JwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { refreshToken, accessToken };
  }
}
