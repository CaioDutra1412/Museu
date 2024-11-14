import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default Card = ({ text, background, update, remove }) => {
    return (
        <View style={styles.Container}>
            <View style={[styles.TextArea, { backgroundColor: background }]}>
                {text}
            </View>
            {(update && remove) &&
                <View style={styles.ButtonArea}>
                    <TouchableOpacity style={styles.Update} onPress={update}>
                        <Text style={styles.TextButton}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Remove} onPress={remove}>
                        <Text style={styles.TextButton}>Remover</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        padding: 1,
        marginTop: 10,
        marginBottom: 10
    },
    TextArea: {
        width: '100%',
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    ButtonArea: {
        flexDirection: 'row',
        width: '100%'
    },
    Update: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        backgroundColor: '#0000CD',
        padding: 3,
        borderBottomLeftRadius: 5
    },
    Remove: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        backgroundColor: '#B22222',
        padding: 3,
        borderBottomRightRadius: 5
    },
    TextButton: {
        color: '#CDCDCD'
    }
})