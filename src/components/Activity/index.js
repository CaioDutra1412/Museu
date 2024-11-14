import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export default Activity = () => {
    return (
        <View style={styles.Container}>
            <ActivityIndicator size='large' color='#6495ED' />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});