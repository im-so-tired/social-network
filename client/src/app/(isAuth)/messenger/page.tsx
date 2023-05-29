'use client'

import { NextPage } from 'next'
import React, { useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'

import Heading from '@/components/ui/heading/Heading'

import { socket } from '@/api/socket.io'

const Messenger: NextPage = () => {
	const socketRef = useRef<Socket>()
	useEffect(() => {
		socketRef.current = socket
		socketRef.current.connect()
		socketRef.current.emit('findChatMessage')
		socketRef.current.on('event', (value: string) => console.log(value))
	}, [])
	return (
		<div>
			<Heading>Messenger</Heading>
		</div>
	)
}

export default Messenger
