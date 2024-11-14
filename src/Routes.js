import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthContext from './contexts/auth';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Dashboard from './pages/Dashboard';
import LogoutButton from './components/LogoutButton';

// Tela Inicial do app
const HomeScreen = () => {
    return <Home />;
}

// Tela de acervo
const CollectionScreen = () => {
    return <Collection />;
}

// Tela de painel
const DashboardScreen = () => {
    return <Dashboard/>
}

// Cria o menu inferior
const Tab = createBottomTabNavigator();

// Cria as telas com o menu inferior (As telas após logar)
const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === 'Meus Itens') {
                        iconName = focused
                            ? 'list'
                            : 'list';
                    } else if (route.name === 'Acervo') {
                        iconName = focused ? 'book' : 'book';
                    } else if (route.name === 'Painel') {
                        iconName = focused ? 'bar-chart' : 'bar-chart';
                    }

                    return <Icon name={iconName} size={20} color='#000000' />;
                },
                tabBarActiveTintColor: '#808080',
                tabBarInactiveTintColor: '#000000',
                tabBarLabelStyle: {
                    marginBottom: 5,
                    fontSize: 15
                }
            })}>
            <Tab.Screen
                name='Meus Itens'
                component={HomeScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#6495ED',
                    },
                    headerTintColor: '#FFFFFF',
                    headerRight: () => (
                        <LogoutButton />
                    )
                }}
            />
            <Tab.Screen
                name='Acervo'
                component={CollectionScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#6495ED',
                    },
                    headerTintColor: '#FFFFFF',
                    headerRight: () => (
                        <LogoutButton />
                    )
                }}
            />
            <Tab.Screen
                name='Painel'
                component={DashboardScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#6495ED',
                    },
                    headerTintColor: '#FFFFFF',
                    headerRight: () => (
                        <LogoutButton />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

// Cria a pilha para alocar as telas
const Stack = createStackNavigator();

// Empilha as telas para que seja possível a navegação
const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='LOGIN'>
            <Stack.Screen
                name='LOGIN' // Nome exibido no topo da tela
                component={SignIn} // Chama a tela de login
                options={{
                    headerTitleAlign: 'center',
                    headerShown: false, // Exibe/Esconde menu superior
                    headerStyle: {
                        backgroundColor: '#00008B',
                    },
                    headerTintColor: '#FFFFFF',
                    headerLeft: null
                }}
            />
            <Stack.Screen
                name='CADASTRO' // Nome exibido no topo da tela
                component={SignUp} // Chama a tela de login
                options={{
                    headerTitleAlign: 'center',
                    headerShown: false, // Exibe/Esconde menu superior
                    headerStyle: {
                        backgroundColor: '#00008B',
                    },
                    headerTintColor: '#FFFFFF',
                    headerLeft: null
                }}
            />
            <Stack.Screen
                name='INICIO'
                component={Tabs} // Chama as telas com o menu inferior (As telas após logar)
                options={{
                    headerTitleAlign: 'center',
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00008B',
                    },
                    headerTintColor: '#FFFFFF',
                    headerLeft: null
                }}
            />
        </Stack.Navigator>
    );
}

// Cria as rotas para exportar
const Routes = () => {
    return (
        <NavigationContainer>
            <AuthContext>
                <StackNavigator />
            </AuthContext>
        </NavigationContainer>
    );
}

export default Routes;