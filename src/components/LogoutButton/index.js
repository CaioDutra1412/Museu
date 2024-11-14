import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AuthContext } from '../../contexts/auth';

export default LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    return(
        <TouchableOpacity style={styles.Container} onPress={() => logout()}>
            <Icon style={styles.Icon} name='power-off' size={25} color='#FFFFFF' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Container: {
        marginRight: 15
    },
    Icon: {

    }
})