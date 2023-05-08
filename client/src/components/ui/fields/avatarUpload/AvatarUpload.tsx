import Image from 'next/image'
import { ChangeEvent, FC, useRef } from 'react'

import styles from './avatarUpload.module.scss'

interface IFileInput {
	label: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	alt: string
	src: string
}

const FileInput: FC<IFileInput> = ({ label, onChange, alt, src }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const handleClick = () => {
		inputRef.current?.click()
	}
	return (
		<label htmlFor={label} className={styles.avatarUpload}>
			{label}
			<input
				type="file"
				accept="image/*, .png, .jpg"
				onChange={onChange}
				ref={inputRef}
			/>
			<div className="flex-shrink-0 relative w-[100px] h-[100px] overflow-hidden mt-[.3rem]">
				<Image alt={alt} src={src} onClick={handleClick} fill />
			</div>
		</label>
	)
}

export default FileInput
