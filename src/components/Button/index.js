import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default Button = ({action}) => {
    return(
        <TouchableOpacity style={styles.Container} onPress={action}>
            <Icon name='add' size={30} color='#FFFFFF' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6495ED',
        borderRadius: 30,
        width: 45,
        height: 45
    }
});