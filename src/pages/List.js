import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { SafeAreaView, Image, StyleSheet, AsyncStorage, ScrollView, Alert } from 'react-native'

import logo from '../assets/images/logo.png'

import EmprestimoList from '../components/EmprestimoList'

export default function List() {
    const [types, setTypes] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.6:4000', {
                query: { user_id }
            })

            socket.on('solicitacao_response', solicitacao => {
                Alert.alert(`Sua proposta em ${solicitacao.emprestimo.name} em ${solicitacao.date} foi ${solicitacao.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('types').then(storageTypes => {
            const arrayTypes = storageTypes.split(',').map(type => type.trim())

            setTypes(arrayTypes);
        })
    }, [])

    return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.logo} source={logo} />

            <ScrollView>
                {types.map(type => <EmprestimoList key={type} type={type} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 48,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 30
    }
})