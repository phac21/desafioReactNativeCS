import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";


import { Header } from "../components/Header";
import {ModalConfirmacao} from "../components/ModalConfirmacao"

import { 
    View, 
    Text, 
    StyleSheet, 
    Platform, 
    FlatList,
    TextInput,
    TouchableOpacity,
    Modal,
} from "react-native";

export default function Investimentos(){
    const route = useRoute();
    const { investimento } = route.params;
    const navegacao = useNavigation();


    const [modalOpen, setModalOpen] = useState(false);
    const [valorResgate, setValorResgate] = useState('');
    const [acoes, setAcoes] = useState();
    const [temErro, setTemErro] = useState(false);

    function lidarInputChange( id, valor, valorMaximo){

        var acao = acoes.filter(acao => acao.id === id)[0];
        acao.temErro = valor > valorMaximo;
        acao.valorMaximo = valorMaximo;
        var acoesTemp = acoes.filter(acao => acao.id != id);
        acoesTemp.push(acao);

        setAcoes(acoesTemp);

    }   
    function lidarConfirmacaoResgate(){
        setTemErro(acoes.filter( acao => acao.temErro === true).length > 0)
        console.log(acoes)
        setModalOpen(true);
    }
    function lidarBotaoModal(){
        if(temErro === true){
            setModalOpen(false);
        }else{
            navegacao.navigate('Investimentos');
        }
    }
    useEffect(() => {
        const data = investimento.acoes;
        setAcoes(data);
        // console.log(acoes);
    }, []);

    return(
        <View style={[{flex: 1},{justifyContent: 'space-between'}]}>
                <Header/>
                {/* <View style={styles.viewStyle}> */}
                    <Text style={styles.subtitulo}>DADOS DO INVESTIMENTO</Text>
                    <View style={styles.investimentoDetalhe}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nome</Text>
                        <Text style={{ fontSize: 18 }}>{investimento.nome}</Text>
                    </View>
                    <View style={styles.investimentoDetalhe}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Saldo total disponível</Text>
                        <Text style={{ fontSize: 18 }}>{investimento.saldoTotal}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitulo}>RESGATE DO SEU JEITO</Text>
                    </View>
                    <FlatList
                        data={investimento.acoes}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.AcaoCard}>  
                                <Text styles={styles.acaoCardDetalhe}>
                                    <Text>Ação</Text>
                                    <Text style={{marginLeft: 'auto'}}>{item.nome}</Text>
                                </Text>
                                <Text>
                                    <Text>Saldo acumulado</Text>
                                    <Text>{item.percentual}</Text>
                                </Text>

                                <TextInput
                                    keyboardType='numeric'
                                    style={styles.input}
                                    placeholder="R$"
                                    placeholderTextColor="#555"
                                    onChangeText={valor => lidarInputChange(item.id, valor, (item.percentual / 100 * investimento.saldoTotal))}
                                />
                                { 
                                    item.temErro ? <Text>`Valor não pode ser maior que {item.valorMaximo}`</Text> : <></>
                                }
                            </View>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={lidarConfirmacaoResgate}
                        // onPress={() => lidarConfirmacaoResgate(confirmacaoInvestimento)}
                    >
                        <Text style={styles.buttonText}>CONFIRMAR RESGATE</Text> 
                    </TouchableOpacity>
                {/* </View> */}
                <Modal 
                    visible={modalOpen}
                    transparent={true}
                >   
                {   
                    temErro ? 
                    <View style={styles.modalContainer}> 
                            <View style={styles.box}>
                                <Text style={styles.modalTitulo}>Dádos Inválidos</Text>
                                <Text style={styles.modalDescricao}>Você preencheu um ou mais campos com o valor acima do permitido:</Text>
                                <FlatList 
                                    data={acoes.filter(acao => acao.temErro === true)}
                                    keyExtractor={item => item}
                                    renderItem={({ item }) => (
                                        <Text style={styles.modalDescricao}>{item.id}</Text>
                                    )}
                                />
                                

                                <TouchableOpacity
                                    onPress={lidarBotaoModal}
                                    style={styles.button}
                                >
                                    <Text style ={styles.buttonText}>Corrigir</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    :
                    <View style={styles.modalContainer}> 
                            <View style={styles.box}>
                                <Text style={styles.modalTitulo}>Sucesso</Text>
                                <Text style={styles.modalDescricao}>descricao</Text>
                                <Text style={styles.modalDescricao}>Detalhes Erro</Text>

                                <TouchableOpacity
                                    onPress={lidarBotaoModal}
                                    style={styles.button}
                                >
                                        
                                    <Text style ={styles.buttonText}>novo resgate</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                }
                </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F4F4F4',
    },
    subtitulo:{
        padding: 15,
        fontSize: 16,
    },
    investimentoDetalhe: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F4F4F4',
    },
    AcaoCard:{
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 10,
    },
    acaoCardDetalhe:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input :{
        backgroundColor: '#FFF',
        color: '#000',
        fontSize: 18,
        fontWeight: "bold",
        padding: Platform.OS === 'ios' ? 15 :10,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#FAE128',
        padding: 15,
        alignItems: 'center',
    },
    buttonText:{
        color: '#005AA5',
        fontSize: 17,
        fontWeight: "bold",
    },
    modalContainer:{
        flex:1,
        backgroundColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box:{
        flex: 1,
        backgroundColor: '#F4F4F4',
        marginHorizontal: 15,
    },
    modalTitulo:{
        fontWeight: 'bold',
        fontSize: 22,
        color: '#005AA5',
        alignSelf: 'center',
        padding: 15,
    },
    modalDescricao:{
        fontSize: 18,
        color: '#005AA5',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
})