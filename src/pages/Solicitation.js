import React, { useState } from 'react';
import { SafeAreaView, Alert, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import api from '../services/api';

export default function Solicitation({ navigation }) {
	const [price, setPrice] = useState('')
	const id = navigation.getParam('id')

	async function handleSubmit() {
		const user_id = await AsyncStorage.getItem('user');

		await api.post(`/emprestimos/${id}/solicitacoes`, {
			price
		}, {
			headers: { user_id }
		})

			Alert.alert('Solicitação de proposta de empréstimo enviada com sucesso!');

			navigation.navigate('List');
	}

	function handleCancel() {
		navigation.navigate('List')
	}
		
		
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.label}>Valor do Empréstimo</Text>
			<TextInputMask
				style={styles.input}
				type={'money'}
				options={{
					precision: 2,
					separator: ',',
					delimiter: '.',
					unit: 'R$ ',
					suffixUnit: '',
				}}
				placeholder='R$ 0,00'
				placeholderTextColor='#999'
				value={price}
				onChangeText={setPrice}
			/>
			
			<TouchableOpacity onPress={handleSubmit} style={styles.button}>
				<Text style={styles.buttonText}>Enviar Proposta</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
				<Text style={styles.buttonText}>Cancelar Proposta</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 30
	},

	label: {
		fontWeight: 'bold',
		color: '#444',
		marginBottom: 8,
		marginTop: 20,
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

	cancelButton: {
		marginTop: 10,
		height: 42,
		backgroundColor: '#ccc',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2,
		shadowColor: '#ccc',
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
})
