import React, { ChangeEvent, FC, useRef } from 'react'

import MaterialIcon from '@/components/ui/Icon'
import ButtonPrimary from '@/components/ui/buttonPrimary/ButtonPrimary'

import styles from './postCreateForm.module.scss'

interface IFooterProps {
	selectedFile: File | null
	deleteFile: () => void
	imgChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Footer: FC<IFooterProps> = ({ imgChange, deleteFile, selectedFile }) => {
	const imgUploadRef = useRef<HTMLInputElement>(null)
	return (
		<>
			<footer className={styles.footer}>
				<div>
					{selectedFile && (
						<div className={styles.attachedImg}>
							<MaterialIcon name="MdImage" />
							<span>{selectedFile.name}</span>
							<button onClick={deleteFile}>
								<MaterialIcon name="MdClose" />
							</button>
						</div>
					)}
				</div>
				<div className="flex items-center">
					<button
						onClick={(e) => {
							e.preventDefault()
							imgUploadRef.current?.click()
						}}
						className="mr-2"
					>
						<MaterialIcon name="MdAttachFile" />
					</button>
					<ButtonPrimary type="submit">Create</ButtonPrimary>
				</div>
			</footer>
			<input
				className="imgUpload"
				type="file"
				accept="image/*, .png, .jpg"
				onChange={imgChange}
				ref={imgUploadRef}
			/>
		</>
	)
}

export default Footer
