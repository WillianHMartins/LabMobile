import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'

import api from '../services/api'

function EmprestimoList({ type, navigation }) {
    const [emprestimos, setEmprestimos] = useState([])

    useEffect(() => {
        async function loadEmprestimos() {
            const response = await api.get('/emprestimos', {
                params: { type }
            })

            setEmprestimos(response.data);
        }

        loadEmprestimos()
	}, [])
	
	function handleNavigate(id) {
		navigation.navigate('Solicitation', {id})
	}
    
    return (
			<View style={styles.container}>
				<Text style={styles.title}>
					Empréstimos <Text style={styles.bold}>{type}</Text>
				</Text>
				<FlatList
					style={styles.list}
					data={emprestimos}
					keyExtractor={(emprestimo) => emprestimo._id}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<View style={styles.listItem}>
							<Image source={{ uri: 'https://blog.guiabolso.com.br/wp-content/uploads/2016/05/empr%C3%A9stimo-na-Caixa-2-640x525.jpg' }} style={styles.thumbnail}/>
							<Text style={styles.name}>Empréstimo: {item.name}</Text>
							<Text style={styles.price}>Taxa de Juros: {item.rateInterest}</Text>
							<TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
								<Text style={styles.buttonText}>Solicitar Emprestimo</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>
		);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
	},
	title: {
		fontSize: 20,
		color: '#444',
		paddingHorizontal: 20,
		marginBottom: 15,
	},
	bold: {
		fontWeight: 'bold',
	},
	list: {
		paddingHorizontal: 20,
	},
	listItem: {
		marginRight: 15,
	},
	thumbnail: {
		width: 200,
		height: 120,
		resizeMode: 'cover',
		borderRadius: 2,
		alignSelf: 'center'
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 10,
	},
	price: {
		fontSize: 15,
		color: '#999',
		marginTop: 5,
	},
    button: {
        marginTop: 5,
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
		fontSize: 15,
	},
});

export default withNavigation(EmprestimoList)