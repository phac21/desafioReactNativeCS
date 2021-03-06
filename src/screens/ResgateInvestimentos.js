import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";


import { Header } from "../components/Header";
import { formatarValor } from "../utils/mascaraValor.js";

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
    const navegacao = useNavigation();

    const { investimento } = route.params;

    const [acoes, setAcoes] = useState([]);
    const [resgateTotal, setResgateTotal] = useState(0);
    const [temErro, setTemErro] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    function lidarInputChange( id, valor, valorMaximo){
        var acao = acoes.filter(acao => acao.id === id)[0];
        acao.temErro = valor > valorMaximo;
        acao.resgateInformado = parseFloat(valor);
        var acoesTemp = acoes.filter(acao => acao.id != id);
        acoesTemp.push(acao);
        setAcoes(acoesTemp);
    }   
    function lidarConfirmacaoResgate(){
        setTemErro(acoes.filter( acao => acao.temErro === true).length > 0)
        setModalOpen(true);
    }
    function lidarBotaoModal(){
        if(temErro === true){
            setModalOpen(false);
        }else{
            navegacao.navigate('Investimentos');
        }
    }

    function calcularValorMaximo(percentual, saldoTotal ){
        return(percentual / 100 * saldoTotal);
    }
   
    useEffect(() => {
        const data = investimento.acoes;
        setAcoes(data);
    }, []);

    useEffect(() => {
        var resultadoFilter = acoes.filter( acao => acao.resgateInformado > 0)
        if (resultadoFilter.length > 0){
           setResgateTotal(resultadoFilter.map(acao => acao.resgateInformado).reduce((accumulator, curr) => accumulator + curr));
        }else{
            setResgateTotal(0);
        }
    }, [acoes]);

    return(
        <View style={[{flex: 1},{justifyContent: 'space-between'}]}>
                <Header/>
                
                    <Text style={styles.subtitulo}>DADOS DO INVESTIMENTO</Text>
                    <View style={styles.investimentoDetalhe}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nome</Text>
                        <Text style={{ fontSize: 18 }}>{investimento.nome}</Text>
                    </View>
                    <View style={styles.investimentoDetalhe}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Saldo total dispon??vel</Text>
                        <Text style={{ fontSize: 18 }}>{formatarValor(investimento.saldoTotal)}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitulo}>RESGATE DO SEU JEITO</Text>
                    </View>
                    <FlatList
                        data={investimento.acoes}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (

                            <View style={styles.AcaoCard}>  
                                <View style={styles.acaoCardDetalhe}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>A????o</Text>
                                    <Text style={{ fontSize: 18 }}>{item.nome}</Text>
                                </View>
                                <View style={styles.acaoCardDetalhe}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Saldo acumulado</Text>
                                    <Text style={{ fontSize: 18 }}>{formatarValor(calcularValorMaximo(item.percentual, investimento.saldoTotal))}</Text>
                                </View>
                                <Text style={{ paddingTop: 5, fontSize: 16 }}>Valor a resgatar</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    style={styles.input}
                                    placeholder=""
                                    placeholderTextColor="#555"
                                    onChangeText={valor => lidarInputChange(item.id, valor, calcularValorMaximo(item.percentual, investimento.saldoTotal))}
                                />
                                { 
                                    item.temErro ? <Text style={{color: '#C90E0E'}}>Valor n??o pode ser maior que {formatarValor(calcularValorMaximo(item.percentual, investimento.saldoTotal))}</Text> : <></>
                                }
                            </View>
                        )}
                    />
                    <View style={styles.investimentoDetalhe}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18}}>Valor total a resgatar</Text>
                        <Text style={{ fontSize: 18}}>{formatarValor(resgateTotal)}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={lidarConfirmacaoResgate}
                    >
                        <Text style={styles.buttonText}>CONFIRMAR RESGATE</Text> 
                    </TouchableOpacity>
                <Modal 
                    visible={modalOpen}
                    transparent={true}
                >   
                {   
                    temErro ? 
                    <View style={styles.modalContainer}> 
                            <View style={styles.box}>
                                <Text style={styles.modalTitulo}>DADOS INV??LIDOS</Text>
                                <Text style={styles.modalDescricao}>Voc?? preencheu um ou mais campos com o valor acima do permitido:</Text>
                                <FlatList 
                                    data={acoes.filter(acao => acao.temErro === true)}
                                    keyExtractor={item => item.id}
                                    style={{flexGrow: 0}}
                                    renderItem={({ item }) => (
                                        <>
                                            <Text style={styles.modalDescricao}>{item.nome}:</Text>
                                            <Text style={styles.modalDescricao}>Valor m??ximo de {formatarValor(calcularValorMaximo(item.percentual, investimento.saldoTotal))}</Text>
                                        </>
                                    )}
                                />
                                <TouchableOpacity
                                    onPress={lidarBotaoModal}
                                    style={styles.button}
                                >
                                    <Text style ={styles.buttonText}>CORRIGIR</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    :
                    <View style={styles.modalContainer}> 
                            <View style={styles.box}>
                                <Text style={styles.modalTitulo}>RESGATE EFETUADO!</Text>
                                <Text style={styles.modalDescricao}>O valor solicitado estar?? em sua conta em at?? 5 dias ??teis!</Text>
                                <TouchableOpacity
                                    onPress={lidarBotaoModal}
                                    style={styles.button}
                                >
                                    <Text style ={styles.buttonText}>NOVO RESGATE</Text>
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
        borderBottomWidth: 2,
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
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#F4F4F4',
    },
    input: {
        backgroundColor: '#FFF',
        color: '#000',
        fontSize: 18,
        borderBottomWidth: 2,
        borderBottomColor: '#F4F4F4',
        padding: Platform.OS === 'ios' ? 15 :10,
        marginBottom: 10,
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
        fontSize: 16,
        color: '#005AA5',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
})