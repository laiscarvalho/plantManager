import React from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import waterImg from '../assets/watering.png'
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/core';

export function Welcome() {
    const navigation = useNavigation();
    function handleStart(){
        navigation.navigate('UserIdentification')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie suas plantas de forma fácil
             </Text>
                <Image source={waterImg} style={styles.image} resizeMode="contain" />
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
             </Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleStart}>
                    <Text >
                        <Feather name='chevron-right' style={styles.buttonIcon} />
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 38
    },

    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },

    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
        textAlign: 'center',
    },

    image: {
        height: Dimensions.get('window').width * 0.7 // imagem responsiva
    },

    buttonIcon: {
        fontSize: 28,
        color: colors.white
    },

    wrapper: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        paddingHorizontal: 20
    }
})