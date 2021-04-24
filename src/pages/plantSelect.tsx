import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'
import { EnviromentButton } from '../components/EnviromentButton'
import { Header } from '../components/header'
import { Load } from '../components/load'
import { PlantCardPrimary } from '../components/plantCardPrimary'
import api from '../service/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentProps {
    key: string;
    title: string;
}

interface PlantProps {
    id: number,
    name: string,
    about: string,
    water_tips: string,
    photo: string,
    environments: [string],
    frequency: {
        times: number,
        repeat_every: string
    }
}
export function PlantSelect() {

    const [environments, setEnvironments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all')
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]) //estado auxiliar para filtrar
    const [loading, setLoading] = useState(true)

    function handleEnviromentSelected(environment: string) {
        setEnviromentSelected(environment)
        if (environment === 'all') { return setFilteredPlants(plants) }
        const filtered = plants.filter(p => p.environments.includes(environment))
        setFilteredPlants(filtered)


    }

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')
            setEnvironments([{
                key: 'all',
                title: 'Todos'
            },
            ...data
            ])
        }
        fetchEnviroment();
    }, [])

    useEffect(() => {
        async function fetchPlants() {
            const { data } = await api.get('plants?_sort=name&_order=asc')
            setPlants(data)
           

        }
        fetchPlants()
        setLoading(false)

    }, [])

    if (loading) {
        return <Load />
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
            </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
            </Text>
            </View>
            <View>
                <FlatList
                    data={environments}
                    renderItem={({ item }) => (
                        <EnviromentButton title={item.title} active={item.key === enviromentSelected} onPress={() => handleEnviromentSelected(item.key)} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },

    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },

    header: {
        paddingHorizontal: 30
    },
    list: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },


})
