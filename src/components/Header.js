import React from "react";

import { 
    Text, 
    StyleSheet,  
} from "react-native";

export function Header(){

    return(
        <Text style={styles.screenTitle}>Resgate</Text>
    )
}

 
const styles = StyleSheet.create({
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
})