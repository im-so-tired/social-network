import { useLayoutEffect, useRef } from 'react'

export const useLatest = (value: any) => {
	const ref = useRef(value)
	useLayoutEffect(() => {
		ref.current = value
	}, [value])
	return ref
}
