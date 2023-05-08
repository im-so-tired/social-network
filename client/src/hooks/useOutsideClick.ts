import { MutableRefObject, useEffect } from 'react'

import { useLatest } from './useLatest'

export const useOutsideClick = (
	elemRef: MutableRefObject<any>,
	toggleRef: MutableRefObject<any>,
	handler: () => void
) => {
	const handlerRef = useLatest(handler)
	useEffect(() => {
		if (elemRef == null || toggleRef == null) return
		const handleClick = (e: Event) => {
			e.stopPropagation()
			if (
				elemRef.current !== e.target &&
				!toggleRef.current.contains(e.target)
			) {
				handlerRef.current()
			}
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [elemRef, handlerRef, toggleRef])
}
