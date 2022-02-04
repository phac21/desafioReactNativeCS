import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, FlatList} from "react-native";
import { useNavigation } from '@react-navigation/native'


import { ListaDeInvestimentos } from "../components/ListaInvestimentos";
import { Load } from "../components/Load";

import {api} from "../services/Api";
import { Header } from "../components/Header";

export default function Investimentos(){
    const navegacao = useNavigation();

    const [investimentos, setInvestimentos] = useState();
    const [carregando, setCarregando] = useState(true);
    
    function lidarSelecaoInvestimento(investimento){
        navegacao.navigate('ResgateInvestimentos', {investimento})
        console.log('você clicou no investimento')
    }
    useEffect(() => {
        async function buscarInvestimentos() {
            try {
                const response = await api.get('/');
                const data = response.data.response.data.listaInvestimentos;
                
                setInvestimentos(data);

            } catch (error) {
                console.log(error);
            }finally{
                setCarregando(false);
            }

        }
        buscarInvestimentos();
    }, []);    


    return(
        <View>
            <Header/>
            <Text style={styles.screenDescription}>
                <Text>INVESTIMENTOS</Text>
                <Text>R$</Text>
            </Text>


            {
                carregando ? <Load/> :
                <FlatList 
                    data={investimentos}
                    keyExtractor={item => item.nome}
                    renderItem={({ item }) => (
                        <ListaDeInvestimentos
                        // key={item.nome}
                        investimento={item}
                        onPress={() => lidarSelecaoInvestimento(item)}
                    />
                    )}
                />
            }
            

            {/* { carregando ? <Load/> : <Text></Text>} */}

        </View>
    )
}
const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F4F4F4',
    },
    screenDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        fontSize: 16,
    }
})