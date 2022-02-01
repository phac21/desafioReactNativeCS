import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";

export default function Investimentos(){
    const [investimentos, setInvestimentos] = useState('');

    return(
        <View>
            <Text style={styles.screenTitle}>Resgate</Text>
            <View style={styles.screenDescription}>
                <Text>INVESTIMENTOS</Text>
                <Text>R$</Text>
            </View>
            
            <TouchableOpacity 
                    style={styles.investimentoButton}
                    activeOpacity={0.6}
                >   
                    <View style={styles.investimentoInfo}>
                        <Text style={styles.investimentoTitle}>
                            INVESTIMENTO 1
                        </Text>
                        <Text style={styles.investimentoTitle}>
                            75.100,00
                        </Text>
                    </View>
                    <Text style={styles.investimentoDescription}>
                        Minha Aposentadoria
                    </Text>
            </TouchableOpacity>

            
            {/* <FlatList/> */}

        </View>
    )
}
const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F4F4F4',
    },
    screenTitle:{
        backgroundColor: '#005AA5',
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
        borderBottomWidth: 5,
        borderBottomColor: '#FAE128',
    },
    screenDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        fontSize: 18,
    },
    investimentoButton:{
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#f4f4f4',
        marginVertical: 10,
    },
    investimentoInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    investimentoTitle:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2F2F2F',
    },
    investimentoDescription:{
        fontSize: 18,
    }
    
})