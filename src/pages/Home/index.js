import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Modal, Alert } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';

import { AuthContext } from '../../contexts/auth';
import Button from '../../components/Button';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import SearchBar from '../../components/SearchBar';
import Activity from '../../components/Activity';

export default function Home() {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [id, setId] = useState('');
    const [uid, setUid] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [nameOrder, setNameOrder] = useState('');
    const [toEdit, setToEdit] = useState(false);

    const { insert, updateItem, listItems, allItemsUser, removeItem, altered, isLoading } = useContext(AuthContext);

    // Impede que retorne para a tela de login
    useBackHandler(() => {
        return true;
    });

    useEffect((() => {
        allItemsUser();
    }
    ), [altered]);

    const resetFields = () => {
        setNome('');
        setTipo('');
        setDescricao('');
        setId('');
        setUid('');
    }

    const insertItem = () => {
        resetFields();
        insert(nome, tipo, descricao);
        setModalVisible(!modalVisible);
    }

    const setItem = (item) => {
        setNome(item.nome);
        setTipo(item.tipo);
        setDescricao(item.descricao);
        setId(item.id);
        setUid(item.uid);
        setToEdit(true);
        setModalVisible(!modalVisible);
    }

    const updateItemUser = () => {
        let item = {
            id,
            uid,
            nome,
            tipo,
            descricao
        }
        updateItem(item);
        resetFields();
        setToEdit(false);
        setModalVisible(!modalVisible);
    }

    const removeItemUser = (item) => {
        Alert.alert('Atenção', 'Deseja realmente excluir o item?', [
            { text: 'SIM', onPress: () => removeItem(item) },
            { text: 'NÃO' },
        ]);
    }

    const closeModal = () => {
        setModalVisible(!modalVisible);
        setToEdit(false);
        resetFields();
    }

    const renderCard = () => {
        if (listItems.length > 0 && !isLoading) {
            return listItems.map((item, index) => {
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
                            background={index % 2 == 0 ? '#87CEEB' : '#ADD8E6'}
                            update={() => setItem(item)}
                            remove={() => removeItemUser(item)} />
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
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.ModalText}>Nome</Text>
                        <TextInput style={styles.Input} placeholder='Nome' placeholderTextColor='#C3C3C3' onChangeText={(value) => setNome(value)} value={nome} />
                        <Text style={styles.ModalText}>Tipo</Text>
                        <TextInput style={styles.Input} placeholder='Tipo' placeholderTextColor='#C3C3C3' onChangeText={(value) => setTipo(value)} value={tipo} />
                        <Text style={styles.ModalText}>Descrição</Text>
                        <TextInput style={styles.InputArea} multiline = {true} numberOfLines={5} placeholder='Descrição' placeholderTextColor='#C3C3C3' onChangeText={(value) => setDescricao(value)} value={descricao} />
                        <View style={styles.ButtonArea}>
                            {toEdit
                                ? <ActionButton text='EDITAR' background='#0000CD' color='#FFFFFF' action={() => updateItemUser()} />
                                : <ActionButton text='CADASTRAR' background='#0000CD' color='#FFFFFF' action={() => insertItem()} />}
                            <ActionButton text='FECHAR' background='#B22222' color='#FFFFFF' action={() => closeModal()} />
                        </View>
                    </View>
                </View>
            </Modal>
            {!isLoading && <SearchBar action={setNameOrder} />}
            <ScrollView style={styles.CardArea}>
                {renderCard()}
            </ScrollView>
            <View style={styles.ButtonAddArea}>
                <Button action={() => setModalVisible(!modalVisible)} />
            </View>
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
    ButtonArea: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    Input: {
        borderWidth: 1,
        borderColor: '#C3C3C3',
        borderRadius: 5,
        width: '100%',
        color: '#000000',
        fontSize: 20,
        padding: 5,
        marginTop: 10,
        marginBottom: 10
    },
    InputArea: {
        borderWidth: 1,
        borderColor: '#C3C3C3',
        borderRadius: 5,
        width: '100%',
        color: '#000000',
        fontSize: 20,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        height: 100,
        textAlign: 'justify'
    },
    ButtonAddArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        padding: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F8FF'
    },
    modalView: {
        backgroundColor: '#F0F8FF',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    ModalText: {
        fontSize: 18,
        fontWeight: 'bold'
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