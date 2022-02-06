import React, { useEffect, useState } from "react";

import { formatarValor } from "../utils/mascaraValor.js";

import { 
    View, 
    Text, 
    StyleSheet,  
    TouchableOpacity
} from "react-native";

export function ListaDeInvestimentos({ investimento, onPress }){
    // let saldoTotalBRL = investimento.saldoTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") ;
    // let saldoTotalBRL = investimento.saldoTotal.toFixed(2).replace('.', ','); 
    // let saldoTotalBRL = investimento.saldoTotal.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'});

    const [carencia, setCarencia] = useState(false);

    useEffect(() => {
        if (investimento.indicadorCarencia === 'S'){
            setCarencia(true);
        }
    }, [])

    return(
        <TouchableOpacity
            style={styles.investimentoButton}
            activeOpacity={0.6}
            onPress={onPress}
            disabled={carencia}
        >   
            <View style={styles.investimentoInfo}>
                <Text style={styles.investimentoTitle}>
                    {investimento.nome}
                </Text>
                <Text style={styles.investimentoTitle}>
                    {/* {investimento.saldoTotal} */}
                    {formatarValor(investimento.saldoTotal)}
                </Text>
            </View>
            <Text style={styles.investimentoDescription}>
                {investimento.objetivo}
            </Text>
        </TouchableOpacity>
    )
}

 
const styles = StyleSheet.create({
    investimentoButton:{
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#f4f4f4',
    },
    investimentoInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    investimentoTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2F2F2F',
    },
    investimentoDescription:{
        fontSize: 16,
    }
})