import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default SearchBar = ({ action }) => {
    return (
        <View style={styles.Container}>
            <View style={styles.InputArea}>
                <Icon style={styles.Icon} name='search' size={18} color='#000000' />
                <TextInput style={styles.Input} placeholder='Pesquisar' onChangeText={(value) => action(value)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 10
    },
    InputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        width: '65%',
        borderRadius: 5
    },
    Input: {
        paddingLeft: 10,
        paddingRight: 10,
        width: '80%',
        fontSize: 18
    },
    Icon: {
        marginLeft: 10
    }
})