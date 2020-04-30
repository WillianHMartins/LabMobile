import React,  { useState, useEffect} from 'react'
import { View, AsyncStorage, KeyboardAvoidingView, Platform, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native'

import api from '../services/api'

import logo from '../assets/images/logo.png'

export default function Login({ navigation }) {
    const [username, setUsername] = useState('')
    const [types, setTypes] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List')
            }
        })
    }, [])

    async function handleSubmit() {
        const response = await api.post('/clients', {
            username
        })

        const { _id } = response.data

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('types', types)

        navigation.navigate('List')
    }


    return (
		<KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
			<Image source={logo} />

				<View style={styles.form}>
				<Text style={styles.label}>Seu Usuário no GitHub</Text>
				<TextInput
					style={styles.input}
					placeholder='Seu usuário no GitHub'
						placeholderTextColor='#999'
					keyboardType='email-address'
					autoCapitalize='none'
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
				/>

				<Text style={styles.label}>Empréstimos *</Text>
				<TextInput
					style={styles.input}
					placeholder='Tipo de Empréstimo'
					placeholderTextColor='#999'
					autoCapitalize='words'
                    autoCorrect={false}
                    value={types}
                    onChangeText={setTypes}
				/>

				<TouchableOpacity onPress={handleSubmit} style={styles.button}>
					<Text style={styles.buttonText}>Buscar empréstimos</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	form: {
		alignSelf: 'stretch',
		paddingHorizontal: 30,
		marginTop: 30,
	},

	label: {
		fontWeight: 'bold',
		color: '#444',
		marginBottom: 8,
	},

	input: {
		borderWidth: 1,
		borderColor: 'transparent',
		borderBottomColor: '#0083A9',
		paddingHorizontal: 20,
		fontSize: 16,
		color: '#444',
		height: 44,
		marginBottom: 20,
	},

	button: {
		height: 42,
		backgroundColor: '#0083A9',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2,
		shadowColor: '#0083A9',
		shadowOffset: {
			width: 3,
			height: 3,
		},
		shadowOpacity: 5.27,
		shadowRadius: 5.65,

		elevation: 2,
	},

	buttonText: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
