import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { VictoryBar, VictoryChart, VictoryArea, VictoryLine } from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import RadioForm from 'react-native-simple-radio-button';
import { useBackHandler } from '@react-native-community/hooks';

import { AuthContext } from '../../contexts/auth';
import Activity from '../../components/Activity';

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

var radio_props = [
    { label: 'Barra', value: 0 },
    { label: 'Linha', value: 1 },
    { label: 'Área', value: 2 }
];

export default function Dashboard() {

    const [chart, setChart] = useState(0)

    const { allItemsDashboard, altered, itemsDashboard, isLoading } = useContext(AuthContext);

    // Impede que retorne para a tela de login
    useBackHandler(() => {
        return true;
    });

    useEffect((()=> {
        allItemsDashboard();
    }
    ), [altered]);

    const genStops = () => {
        var percentage = 100 / itemsDashboard.length
        var stops = [<Stop key={0} offset='0%' stopColor={colorArray[0]} />]
        itemsDashboard.forEach((x, i) => {
            var stop = <Stop key={i + 1} offset={`${percentage * (i + 1)}%`} stopColor={pickColor(i)} />
            stops.push(stop)
        })
        return stops
    }

    const pickColor = (i) => {
        var index = indexHelper(i, colorArray.length)
        return colorArray[index]
    }

    const indexHelper = (a, b) => {
        return a >= b ? indexHelper(a - b, b) : a
    }

    const stops = genStops()

    var MyChart = <VictoryBar data={itemsDashboard}
        x='month'
        y='total'
        animate={{
            onLoad: { duration: 1000 },
            duration: 1000,
            easing: 'bounce'
        }}
        style={{
            data: {
                fill: ({ datum }) => datum.fill || 'black'
            }
        }}
    />

    if (chart === 1) {
        MyChart = <VictoryLine data={itemsDashboard}
            x='month'
            y='total'
            animate={{
                onLoad: { duration: 1000 },
                duration: 1000,
                easing: 'bounce'
            }}
            style={{
                data: {
                    stroke: 'purple',
                    strokeWidth: 3
                }
            }}
        />
    } else if (chart === 2) {
        MyChart = <VictoryArea data={itemsDashboard}
            x='month'
            y='total'
            animate={{
                duration: 1000,
                easing: 'bounce',
                onLoad: { duration: 1000 }
            }}
            style={{
                data: {
                    fill: 'url(#gradientStroke)',
                    stroke: '#1E93FA',
                    strokeWidth: 2
                }
            }}
        />
    }

    return (
        <View style={styles.container}>
            {isLoading && <Activity/>}
            {(itemsDashboard.length > 0 && !isLoading) &&
                <View style={styles.Radio}><Text style={styles.title}>Tipo de Gráfico (Itens x Mês)</Text>
                    <RadioForm
                        radio_props={radio_props}
                        formHorizontal={true}
                        labelHorizontal={false}
                        buttonColor={'#2196f3'}
                        onPress={(value) => setChart(value)}
                    />
                    <VictoryChart domainPadding={10}
                    >
                        <Defs>
                            <LinearGradient id='gradientStroke'>
                                {stops}
                            </LinearGradient>
                        </Defs>
                        {MyChart}
                    </VictoryChart>
                </View>
            }
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#F0F8FF"
    },
    title: {
        margin: 10,
        fontSize: 16,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    Radio: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})