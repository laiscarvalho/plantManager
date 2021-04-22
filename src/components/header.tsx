import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import colors from '../styles/colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/lais.jpeg';
import fonts from '../styles/fonts';


export function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>Olá,</Text>
                <Text style={styles.userName}>Laís</Text>
            </View>
            <Image source={userImg} style={styles.img} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },

    img:{
        width:80,
        height:80,
        borderRadius:40
    },
    greetings:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    userName:{
        fontSize:32,
        fontFamily: fonts.heading,
        color:colors.heading,
        lineHeight:40
    }
})
