import cn from 'classnames'
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import Footer from '@/components/common/postCreateForm/Footer'

import styles from './postCreateForm.module.scss'
import { useCreatePostMutation } from '@/redux/api/posts.api'

export interface IPostCreateData {
	title: string
	message: string
}

const PostCreateForm: FC = memo(() => {
	const [createPost, { isSuccess }] = useCreatePostMutation()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IPostCreateData>({ mode: 'onSubmit' })
	useEffect(() => {
		if (isSuccess) reset()
	}, [isSuccess, reset])
	const onSubmit = (textData: IPostCreateData) => {
		const data = {
			...textData,
			image: selectedFile,
		}
		const formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (value) formData.append(key, value)
		}
		createPost(formData)
	}
	const [selectedFile, setSelectedFile] = useState<File | null>(null)

	const attachedImgChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedFile(e.target.files[0])
		}
	}
	return (
		<div className="island mt-4 p-8 pb-2">
			<h4 className="text-xl font-medium mb-2">Add new post</h4>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="relative mb-[1.5rem]">
					<input
						placeholder="Title"
						className={cn('primaryInput', styles.title, {
							[styles.isError]: errors.title,
						})}
						{...register('title', {
							required: { value: true, message: 'Required field!' },
						})}
					/>
					{errors.title && (
						<span className="errorMessage">{errors.title.message}</span>
					)}
				</div>
				<div className="relative">
					<textarea
						placeholder="Description"
						rows={6}
						className={cn('primaryInput', styles.description)}
						{...register('message')}
					/>
					{errors.message && (
						<span className="errorMessage">{errors.message.message}</span>
					)}
				</div>
				<Footer
					selectedFile={selectedFile}
					deleteFile={() => setSelectedFile(null)}
					imgChange={attachedImgChange}
				/>
			</form>
		</div>
	)
})
PostCreateForm.displayName = 'PostCreateForm'
export default PostCreateForm
