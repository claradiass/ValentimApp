import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, StatusBar, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

// import { format } from 'date-fns';
import { format, parse } from 'date-fns-tz';
import axios from 'axios';
import { 
  configAxios,
  baseUrlAgendamentos
} from '../util/constantes';

const listaOpcoes = [
  'Escolha um',
  'ar-condicionado',
  'geladeira',
  'freezer',
  'outros',
];

export default function TelaManutencaoAdicionar({ route, navigation }) {
  const [clienteDados, setClienteDados] = useState(route.params);
  const [nome, setNome] = useState(clienteDados.attributes.nome);
  const [telefone, setTelefone] = useState(clienteDados.attributes.telefone);
  const [endereco, setEndereco] = useState(clienteDados.attributes.endereco);
  const [dataSelecionada, setDataSelecionada] = useState(route.params.data);
  const [hora, setHora] = useState(null);
  const [data, setData] = useState(null);
  const [cliente, setIdCliente] = useState(clienteDados.id);
  const [itemSelecionado, setItemSelecionado] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [avisoModalVisible, setAvisoModalVisible] = useState(false);


  const mostrarAvisoModal = () => {
    setAvisoModalVisible(true);
  };
  

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    hideTimePicker();
    // Formatando a hora para o formato desejado com fuso horário 'UTC'
    const horaFormatada = format(time, 'HH:mm:ss.SSS', { timeZone: 'America/Sao_Paulo' });
    setHora(horaFormatada);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    // Formatando a data para o formato desejado com fuso horário 'UTC'
    const dataFormatada = format(date, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
    setData(dataFormatada);
  };

  const handlePickerChange = (itemValor) => {
    setItemSelecionado(itemValor);
    if (itemValor === 'outros') {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
    navigation.navigate('ClienteLista')
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };

  


  function formatarData(dataString) {
    if (!dataString) {
      return ''; // or any default value that makes sense in your context
    }
  
    // Suponha que a dataString esteja no formato 'YYYY-MM-DD'
    const partes = dataString.split('-');
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`; // Formato 'DD/MM/YYYY'
    return dataFormatada;
  }
  

  function adicionar() {
    if (!data || !hora) {
        // Mostrar o modal de aviso
        mostrarAvisoModal();
    
        return;
    }

    const dados = {
      data: {
        data,
        hora,
        cliente,
      },
    };
  
    axios
      .post(baseUrlAgendamentos, dados, configAxios)
      .then((response) => {
        navigation.navigate('TelaAgenda', { realizarAtualizacao: true });
      })
      .catch((error) => {
        console.error('Erro ao fazer a requisição:', error);
        if (error.response) {
          console.error('Dados da resposta:', error.response.data);
          console.error('Status do código:', error.response.status);
        }
      });
  }

  

  return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.content}>
          <View style={styles.detalhe}>
            <Text style={styles.text1}>Adicionar novo agendamento</Text>
          </View>
          <View style={styles.area}>
            <View>
              <Text style={styles.text2}>Nome do cliente:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                value={nome}
                editable={false}
              />
            </View>
            <View>
              <Text style={styles.text2}>Contato:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                keyboardType="numeric"
                value={telefone}
                editable={false}

              />
            </View>
            <View>
              <Text style={styles.text2}>Endereço:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                value={endereco}
                editable={false}

              />
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              value={data}
              onChangeText={setData}
              confirmTextStyle={{ color: "#33cc33" }}
              confirmText="Confirmar"
              />

            <View>
              <Text style={styles.text2}>Data:</Text>
              <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.input2}>{formatarData(data)}</Text>
              </TouchableOpacity>
              {/* <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                value={formatarData(dataSelecionada)}
                editable={false}
              /> */}
            </View>

            

            <View>
            <Text style={styles.text2}>Hora:</Text>
            <TouchableOpacity onPress={showTimePicker}>
              <Text style={styles.input2}>{hora ? hora.slice(0, -7) : ' '}</Text>
            </TouchableOpacity>
          </View>

          {/* ... (restante do código) */}

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
            value={hora}
            onChangeText={setHora}
          />

            
          </View>
          <TouchableOpacity style={styles.botao} activeOpacity={0.7} onPress={ adicionar }>
            <Text style={styles.textbotao}>Adicionar Agendamento</Text>
          </TouchableOpacity>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Agendamento adicionado com sucesso!</Text>
              <View style={styles.bots}>
              <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
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
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <Text style={styles.textbotao2}>Por favor, preencha os campos de data e hora.</Text>
                    <TouchableOpacity style={styles.bot2} onPress={() => setAvisoModalVisible(false)}>
                        <Text style={styles.textbotao2}>Fechar</Text>
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
    color: '#fff',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    width: 320,
    height: 40,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff', 
  },
  input2: {
    width: 320,
    height: 40,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff', 
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
    color: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
  },
  textbotao: {
    fontSize: 14,
    color: '#053F5C',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },

  textbotao2: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: '#053F5C',
    margin: 20,
    width: 280,
    height: 140,
    borderRadius: 20,
    padding: 35,
    elevation: 5,
    
  },
  bot2:{
    marginTop: 10,
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#F7AD19',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  bots:{
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center'
  }
});
