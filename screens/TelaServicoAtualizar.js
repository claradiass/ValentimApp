import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns-tz';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import axios from 'axios';
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';

const listaOpcoes = [
  'Escolha um',
  'MTB',
  'Speed'
];

export default function TelaServicoAtualizar({route, navigation}) {
  const [servico, setServico] = useState(route.params);
  // const [nome, setNome] = useState(clienteDados.attributes.nome);
  // const [telefone, setTelefone] = useState(clienteDados.attributes.telefone);
  // const [endereco, setEndereco] = useState(clienteDados.attributes.endereco);

  const hoje = new Date();
  const dataHoje = format(hoje, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
  const horarioHoje = format(hoje, 'HH:mm', { timeZone: 'America/Sao_Paulo' });
  const dataHorarioHoje = `${dataHoje} ${horarioHoje}`;
  const [avisoModalVisible, setAvisoModalVisible] = useState(false);



  // const [cliente, setIdCliente] = useState(servico.id);
  const [descricao_bike, setDescricao_bike] = useState(servico.attributes.descricao_bike);
  const [descricao_servico, setDescricao_servico] = useState(servico.attributes.descricao_servico);
  const [valor_total, setValor_total] = useState(servico.attributes.valor_total);
  const [total_despesas, setTotal_despesas] = useState(servico.attributes.total_despesas);
  const [valorRecebido, setValorRecebido] = useState(servico.attributes.valorRecebido);
  const [tipo_bike, setTipo_bike] = useState(servico.attributes.tipo_bike);
  const [dataFinalizado, setDataFinalizado] = useState(null);
  const [dataIniciado, setDataIniciado] = useState(servico.attributes.dataIniciado);

  const [itemSelecionado, setItemSelecionado] = useState('');
  const [showInput, setShowInput] = useState(false);

  const [realizarAtualizacao, setRealizarAtualizacao] = useState(false);
  const [servicoConcluido, setServicoConcluido] = useState(false);


  

  const handlePickerChange = (itemValor) => {
    console.log('Item Selecionado (ao alterar):', itemValor);
    setItemSelecionado(itemValor);
    setTipo_bike(itemValor)
  };

   const [modalVisible, setModalVisible] = useState(false);

  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('TelaServicoLista', { realizarAtualizacao: true });
  };

  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };

  const concluirServico = () => {
    const dataAtual = dataHorarioHoje;
    if (servicoConcluido) {
        setDataFinalizado(null);
    } else {
        setDataFinalizado(dataAtual);
    }
    setServicoConcluido((prevValue) => !prevValue);
};

  function atualizar() {
    if (!tipo_bike) {
      setAvisoModalVisible(true);
      return; // Evita a execução do restante da função se o tipo_bike estiver vazio
    }

    const dados = {
      data: {
        valor_total,
        total_despesas,
        valorRecebido,
        tipo_bike,
        descricao_servico,
        descricao_bike, 
        dataIniciado,
        dataFinalizado
      },
    };

    axios.put(baseUrlServicos  + servico.id, dados, configAxios)
      .then(response => {
        navigation.navigate('TelaServicoLista', { realizarAtualizacao: true });
        setRealizarAtualizacao(true);
        
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response data:", error.response.data);
          console.error("Status code:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request failed:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
        }
      });
  }

  function formatarData(dataString) {
    const dataISO = new Date(dataString);
    const dia = dataISO.getDate();
    const diaFormatado = dia < 10 ? `0${dia}` : dia;
    const dataFormatada = `${diaFormatado}/${dataISO.getMonth() + 1}/${dataISO.getFullYear()}`;
    return dataFormatada;
}


  return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.content}>
          <View style={styles.detalhe}>
            <Text style={styles.text1}>Atualizar manuntenção</Text>
          </View>

          <View style={styles.area}>
            <View>
              <Text style={styles.text2}>Bike:</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={itemSelecionado}
                  onValueChange={handlePickerChange}>
                  {listaOpcoes.map((opcao, index) => (
                    <Picker.Item key={index} label={opcao} value={opcao} />
                  ))}
                </Picker>
              
              </View>
            </View>
            {/* <View>
              <Text style={styles.text2}>Nome do cliente:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                value={nome}
                onChangeText={setNome}
                editable={false}
              />
            </View>
            <View>
              <Text style={styles.text2}>Contato:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#FFF'}
                value={telefone}
                onChangeText={setTelefone}
                editable={false}
              />
            </View> */}

<View>
                        <Text style={styles.text2}>Data:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={'#fff'}
                            // value={formatarData(dataHoje)}
                            value={`${formatarData(dataIniciado)} ás ${dataIniciado
                            .split('T')[1]
                            .split('.')[0]
                            .slice(0, -2)
                            .slice(':', -1)}`}
                            onChangeText={setDataIniciado}
                            editable={false}
                        />
                    </View>

            <View>
              <Text style={styles.text2}>Descricão da bike:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#FFF'}
                value={descricao_bike}
                onChangeText={setDescricao_bike}
              />
            </View>
            
            <View>
              <Text style={styles.text2}>Descricão do serviço:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#FFF'}
                value={descricao_servico}
                onChangeText={setDescricao_servico}
              />
            </View>

            <View>
              <Text style={styles.text2}>Valor do serviço:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                value={String(valor_total)}
                onChangeText={setValor_total}
              />
            </View>
            <View>
              <Text style={styles.text2}>Despesas:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                value={String(total_despesas)} // Convertendo explicitamente para string
                onChangeText={setTotal_despesas}
              />

            </View>
            <View>
              <Text style={styles.text2}>Status de pagamento:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                value={String(valorRecebido)} // Convertendo explicitamente para string
                onChangeText={setValorRecebido}
              />

            </View>

            <View >
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10}} >  
                            <Text style={styles.text2}>Concluir Serviço</Text>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={concluirServico}>
                                {servicoConcluido ? (
                                    <MaterialCommunityIcons name="checkbox-marked" size={25} color="#FFF" />
                                    ) : (
                                        <MaterialCommunityIcons name="checkbox-blank-outline" size={25} color="#FFF" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text2}>Data de Finalização:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={'#fff'}
                            value={
                                dataFinalizado
                                    ? `${formatarData(dataFinalizado)} ás ${horarioHoje}`
                                    : '' 
                            }
                            editable={false}
                            onChangeText={setDataFinalizado}

                        />
                    </View>
            

            

            

          
          </View>
          <TouchableOpacity style={styles.botao} activeOpacity={0.7} onPress={atualizar}>
            <Text style={styles.textbotao}>Atualizar Serviço</Text>
          </TouchableOpacity>

          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Serviço adicionado com sucesso!</Text>
              <View style={styles.bots}>
              <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
                <Text style={styles.textbotao} >Fechar</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
  animationType="slide"
  transparent={true}
  visible={avisoModalVisible}
  onRequestClose={() => setAvisoModalVisible(false)}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.textbotao}>Por favor, selecione o tipo da bike</Text>
      <TouchableOpacity style={styles.bot2} onPress={() => setAvisoModalVisible(false)}>
        <Text style={styles.textbotao}>Fechar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
        </SafeAreaView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#053F5C"
  },
  content: {
    marginBottom: 90,
  },
  detalhe: {
    paddingLeft: 20,
    paddingBottom: 25,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#F7AD19',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'Urbanist_700Bold',
    color: '#FFF',
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    width: 320,
    height: 40,
    borderWidth: 3,
    borderColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#FFF',
  },
  area: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    width: 200,
    height: 44,
    backgroundColor: '#F7AD19',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
    marginTop: 20,
  },
  pickerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  picker: {
    width: 320,
    height: 30,
    fontSize: 16,
    color: '#FFF',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  textbotao: {
    fontSize: 14,
    color: '#053F5C',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    margin: 20,
    width: 280,
    height: 140,
    borderRadius: 20,
    padding: 35,
    elevation: 5,
    
  },
  bot2:{
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#F7AD19',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    marginTop: 20
    
  },
  bots:{
    
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center'
  }
});
