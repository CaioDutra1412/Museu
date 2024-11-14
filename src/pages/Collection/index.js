import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';

import { AuthContext } from '../../contexts/auth';
import Card from '../../components/Card';
import SearchBar from '../../components/SearchBar';
import Activity from '../../components/Activity';

export default function Collection() {
    const [nameOrder, setNameOrder] = useState('');

    const { allItems, altered, items, isLoading } = useContext(AuthContext);

    // Impede que retorne para a tela de login
    useBackHandler(() => {
        return true;
    });

    useEffect((() => {
        allItems();
    }
    ), [altered]);

    const renderCard = () => {
        if (items.length > 0 && !isLoading) {
            return items.map((item, index) => {
                if (item.nome.toUpperCase().includes(nameOrder.toUpperCase())) {
                    return (
                        <Card key={item.id} text={
                            <View>
                                <View style={styles.TextCardArea}>
                                    <Text style={styles.TextCardTitle}>Nome: </Text>
                                    <Text style={styles.TextCard}>{item.nome}</Text>
                                </View>
                                <View style={styles.TextCardArea}>
                                    <Text style={styles.TextCardTitle}>Tipo: </Text>
                                    <Text style={styles.TextCard}>{item.tipo}</Text>
                                </View>
                                <View style={styles.TextCardArea}>
                                    <Text style={styles.TextCardTitle}>Descrição: </Text>
                                    <Text style={styles.TextCard}>{item.descricao}</Text>
                                </View>
                                <View style={styles.TextCardArea}>
                                    <Text style={styles.TextCardTitle}>Modificação: </Text>
                                    <Text style={styles.TextCard}>{item.dataAtualizacao}</Text>
                                </View>
                            </View>
                        }
                            background={index % 2 == 0 ? '#87CEEB' : '#ADD8E6'} />
                    )
                } else {
                    return <View key={item.id}></View>
                }
            })
        }
    }

    return (
        <View style={styles.Container}>
            {isLoading && <Activity/>}
            {!isLoading && <SearchBar action={setNameOrder} />}
            <ScrollView style={styles.CardArea}>
                {renderCard()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F0F8FF'
    },
    CardArea: {
        flex: 1,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },
    TextCardArea: {
        flexDirection: 'row'
    },
    TextCardTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    TextCard: {
        fontSize: 18
    }
})