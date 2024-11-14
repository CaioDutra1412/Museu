import { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../services/connection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import { doc, setDoc, updateDoc, collection, addDoc, query, where, getDocs, getDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    const [listItems, setListItems] = useState([]);
    const [itemsDashboard, setItemsDashboard] = useState([]);
    const [items, setItems] = useState([]);
    const [altered, setAltered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        const loadStorage = async () => {
            const storageUser = await AsyncStorage.getItem('MuseuUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, [])

    const actualDate = () => {
        return moment()
            .utcOffset('-03:00')
            .format('DD/MM/YYYY HH:mm:ss');
    }

    const siginIn = async (email, password) => {
        setIsLoading(true);
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const userLogged = userCredential.user;
                const userDescription = await searchUser(userLogged.uid);
                let user = {
                    uid: userLogged.uid,
                    email: userLogged.email,
                    ...userDescription
                }
                setUser(user);
                storageUser(user);
                setLoadingAuth(false);
                navigation.navigate('INICIO');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Erro: ' + errorCode + ' - ' + errorMessage);
            });
            setIsLoading(false);
    }


    const siginUp = async (email, password, nome) => {
        setIsLoading(true);
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await setDoc(doc(firebase, 'users', uid), {
                    nome: nome
                })
                    .then(() => {
                        console.log('Cadastrou com sucesso!');
                    })
                    .catch((error) => {
                        console.log('Erro: ', error)
                    })
            })
            .catch((error) => {
                console.log(error);
            })
            setIsLoading(false);
    }

    const insert = async (nome, tipo, descricao) => {
        setIsLoading(true);
        const uid = user.uid;
        const dataAtualizacao = actualDate();
        await addDoc(collection(firebase, 'itens'), {
            nome,
            tipo,
            descricao,
            uid,
            dataAtualizacao
        })
            .then(() => {
                let data = {
                    nome,
                    tipo,
                    descricao,
                    uid,
                    dataAtualizacao
                }

                setItem(data);
                setLoadingAuth(false);
                console.log('Cadastrou com sucesso!');
                setAltered(!altered);
            })
            .catch((error) => {
                console.log('Erro: ', error)
            })
            setIsLoading(false);
    }

    const updateItem = async (item) => {
        setIsLoading(true);
        const { id, uid, nome, tipo, descricao } = item;
        const dataAtualizacao = actualDate();
        await updateDoc(doc(firebase, 'itens', id), {
            nome,
            tipo,
            descricao,
            dataAtualizacao
        })
            .then(() => {
                let data = {
                    id,
                    uid,
                    nome,
                    tipo,
                    descricao,
                    dataAtualizacao
                }

                setItem(data);
                setLoadingAuth(false);
                setAltered(!altered);
                console.log('Atualizou com sucesso!');
            })
            .catch((error) => {
                console.log('Erro: ', error)
            })
            setIsLoading(false);
    }

    const removeItem = async (item) => {
        setIsLoading(true);
        const { id } = item;
        await deleteDoc(doc(firebase, 'itens', id))
            .then(() => {
                setAltered(!altered);
                console.log('Excluiu com sucesso!');
            })
            .catch((error) => {
                console.log('Erro: ', error)
            })
        setIsLoading(false);
    }

    const allItemsUser = async () => {
        setIsLoading(true);
        try {
            const itens = collection(firebase, 'itens');
            const q = query(itens, where('uid', '==', user.uid), orderBy('dataAtualizacao', 'desc'));
            const querySnapshot = await getDocs(q);
            let itensAux = [];
            querySnapshot.forEach((doc) => {
                let obj = { id: doc._key.path.segments[6], ...doc.data() }
                itensAux.push(obj);
            });
            setListItems(itensAux);

        } catch (error) {
            console.log('Errozzzzzz: ', error)
        }
        setIsLoading(false);
    }

    const allItems = async () => {
        setIsLoading(true);
        try {
            const itens = collection(firebase, 'itens');
            const q = query(itens, orderBy('dataAtualizacao', 'desc'));
            const querySnapshot = await getDocs(q);
            let itensAux = [];
            querySnapshot.forEach((doc) => {
                let obj = { id: doc._key.path.segments[6], ...doc.data() }
                itensAux.push(obj);
            });
            setItems(itensAux);

        } catch (error) {
            console.log('Errozzzzzz: ', error)
        }
        setIsLoading(false);
    }

    const allItemsDashboard = async () => {
        setIsLoading(true);
        try {
            const itens = collection(firebase, 'itens');
            const q = query(itens, orderBy('nome', 'asc'));
            const querySnapshot = await getDocs(q);
            let itensAux = [];
            let auxData = [];
            querySnapshot.forEach((doc) => {
                let obj = { id: doc._key.path.segments[6], ...doc.data() }
                itensAux.push(obj);
            });

            for (let i = 1; i <= 12; i++) {
                const total = await countMonth(i, itensAux);
                const color = selectColor(i);
                auxData.push({
                    month: i,
                    total,
                    fill: color
                })
            }

            setItemsDashboard(auxData);
        } catch (error) {
            console.log('Erro: ', error)
        }
        setIsLoading(false);
    }

    const countMonth = async (index, list) => {
        const aux = await list.filter(item => 
            +item.dataAtualizacao.substring(3,5) == index
        )
        return aux.length;
    }

    const selectColor = (index) => {
        let color = '#000000';

        switch (index) {
            case 1:
                color = '#808080';
                break;
            case 2:
                color = '#0000FF';
                break;
            case 3:
                color = '#008000';
                break;
            case 4:
                color = '#8B4513';
                break;
            case 5:
                color = '#800080';
                break;
            case 6:
                color = '#FF69B4';
                break;
            case 7:
                color = '#FF0000';
                break;
            case 8:
                color = '#FFA500';
                break;
            case 9:
                color = '#FFD700';
                break;
            case 10:
                color = '#ADD8E6';
                break;
            case 11:
                color = '#66CDAA';
                break;
            case 12:
                color = '#DDA0DD';
                break;
        }
        return color;
    }

    const searchUser = async (id) => {
        try {
            const docRef = doc(firebase, 'users', id);
            const description = (await getDoc(docRef)).data();
            return description;
        } catch (error) {
            console.log('Erro: ', error)
        }
    }

    const storageUser = async (data) => {
        await AsyncStorage.setItem('MuseuUser', JSON.stringify(data));
    }


    const logout = async () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('Desconectado!');
            navigation.navigate('LOGIN');
        }).catch((error) => {
            console.log('Erro ao desconectar: ', error)
        });
        await AsyncStorage.removeItem('MuseuUser');
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                loading,
                siginUp,
                siginIn,
                logout,
                navigation,
                insert,
                updateItem,
                removeItem,
                allItemsUser,
                listItems,
                items,
                allItems,
                altered,
                itemsDashboard,
                allItemsDashboard,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}