import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import { Header } from "../components/Header";

import { 
    View, 
    Text, 
    StyleSheet, 
    Platform, 
    FlatList,
    TextInput
} from "react-native";

export default function Investimentos(){
    const route = useRoute();
    const { investimento } = route.params;

    return(
        <View>
            <Header/>
            <Text>DADOS DO INVESTIMENTO</Text>
            <View style={styles.screenDescription}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nome</Text>
                <Text style={{ fontSize: 18 }}>{investimento.nome}</Text>
            </View>
            <View style={styles.screenDescription}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Saldo total disponível</Text>
                <Text style={{ fontSize: 18 }}>{investimento.saldoTotal}</Text>
            </View>

            <FlatList
                data={investimento.acoes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <>
                        <Text>{item.nome}</Text>
                        <Text>Saldo acumulado</Text>
                        <TextInput
                            // style={styles.input}
                            placeholder="Nova Skill"
                            placeholderTextColor="#555"
                            // onChangeText={setNovaSkill}
                        />
                        
                    </>

                )}
            />


        </View>
    )
}
const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F4F4F4',
    },
    screenDescriptionDetails: {
        fontSize: 28,
    },
    screenDescription: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})