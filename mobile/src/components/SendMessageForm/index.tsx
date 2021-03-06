import React, { useState } from 'react'

import { Alert, Keyboard, TextInput, View } from 'react-native'
import { api } from '../../services/api'
import { COLORS } from '../../theme'
import { Button } from '../Button'

import { styles } from './styles'

export function SendMessageForm() {
	const [message, setMessage] = useState('')
	const [sendingMessage, setSendingMessage] = useState(false)

	async function handleMessageSubmit() {
		const messageFormatted = message.trim()

		if (messageFormatted.length > 0) {
			setSendingMessage(true)
			await api.post('/messages', { message: messageFormatted })

			setMessage('')
			Keyboard.dismiss()
			setSendingMessage(false)
			Alert.alert('Message sent successfully')
		} else {
			Alert.alert('Write a message to send')
		}
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				keyboardAppearance='dark'
				multiline
				maxLength={140}
				placeholder='What is your expectations for the event?'
				placeholderTextColor={COLORS.GRAY_PRIMARY}
				onChangeText={setMessage}
				value={message}
				editable={!sendingMessage}
			/>

			<Button
				title='Send Message'
				backgroundColor={COLORS.PINK}
				color={COLORS.WHITE}
				isLoading={sendingMessage}
				onPress={handleMessageSubmit}
			/>
		</View>
	)
}
