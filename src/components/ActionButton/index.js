import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default ActionButton = ({text, background, color, action}) => {
    return(
        <TouchableOpacity style={[styles.Container, {backgroundColor: background}]} onPress={action}>
            <Text style={[styles.Text, {color: color}]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Container: {
        padding: 15,
        borderRadius: 5
    },
    Text: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});