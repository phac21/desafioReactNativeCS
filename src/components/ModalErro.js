import React from "react";
import { useRoute } from "@react-navigation/native";

import { 
    View,
    Text, 
    StyleSheet,
    TouchableOpacity,  
} from "react-native";

export function ModalConfirmacao(){
    const route = useRoute();

    return(
        <View style={styles.ModalContainer}>
            <View>
                <Text>Título</Text>
                <Text>Descrição</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Ação</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

 
const styles = StyleSheet.create({
    ModalContainer:{
        width: 400,
        height: 300,
    },
})