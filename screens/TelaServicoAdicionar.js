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

export default function TelaServicoAdicionar({route, navigation}) {
  const [clienteDados, setClienteDados] = useState(route.params);
  const [nome, setNome] = useState(clienteDados.attributes.nome);
  const [telefone, setTelefone] = useState(clienteDados.attributes.telefone);
  const [endereco, setEndereco] = useState(clienteDados.attributes.endereco);

  const hoje = new Date();
  const dataHoje = format(hoje, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
  const horarioHoje = format(hoje, 'HH:mm', { timeZone: 'America/Sao_Paulo' });
  const dataHorarioHoje = `${dataHoje} ${horarioHoje}`;
  const [avisoModalVisible, setAvisoModalVisible] = useState(false);



  const [cliente, setIdCliente] = useState(clienteDados.id);
  const [descricao_bike, setDescricao_bike] = useState("");
  const [descricao_servico, setDescricao_servico] = useState("");
  const [valor_total, setValor_total] = useState("0");
  const [total_despesas, setTotal_despesas] = useState("0");
  const [valorRecebido, setValorRecebido] = useState("0");
  const [tipo_bike, setTipo_bike] = useState("");
  const [dataFinalizado, setDataFinalizado] = useState(null);
  const [dataIniciado, setDataIniciado] = useState(dataHorarioHoje);

  const [itemSelecionado, setItemSelecionado] = useState('');
  const [showInput, setShowInput] = useState(false);

  const [realizarAtualizacao, setRealizarAtualizacao] = useState(false);

  

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

  function adicionar() {
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
        dataFinalizado,
        cliente
      },
    };

    axios.post(baseUrlServicos, dados, configAxios)
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
    const data = new Date(dataString);
    
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
  
    const dataFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    return dataFormatada;
  }

  const formatarValor = (input) => {
    // Remover todos os pontos e vírgulas, exceto o último ponto
    const numero = parseFloat(input.replace(/[^\d,]|,(?=[^,]*$)/g, '').replace(',', '.'));
  
    // Verificar se o resultado é um número válido
    if (isNaN(numero)) {
      return "0"; // ou qualquer outro valor padrão desejado
    }
  
    // Formatar o número
    const valorFormatado = new Intl.NumberFormat('pt-BRL', {
      minimumFractionDigits: 2,
    }).format(numero);
  
    return valorFormatado;
  };
  
  
  
 
  // const outro = (valorFormatado) => {
  //   valorFormatado.replace(/[^\d,]/g, '').replace(/\./g, '').replace(',', '.')
  // }


  return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.content}>
          <View style={styles.detalhe}>
            <Text style={styles.text1}>Adicionar nova manuntenção</Text>
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
            <View>
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
            </View>

            <View>
              <Text style={styles.text2}>Serviço inicido em:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                value={formatarData(dataIniciado)}
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
                value={valor_total}
                onChangeText={setValor_total}
              />
            </View>
            <View>
              <Text style={styles.text2}>Despesas:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
                value={total_despesas}
                onChangeText={setTotal_despesas}
              />
            </View>
            <View>
        <Text style={styles.text2}>Valor Recebido:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor={'#FFF'}
          keyboardType="numeric"
          value={formatarValor(valorRecebido)}
          onChangeText={(valor) => setValorRecebido(formatarValor(valor))}
        />
      </View>

            

            

            

          
          </View>
          <TouchableOpacity style={styles.botao} activeOpacity={0.7} onPress={adicionar}>
            <Text style={styles.textbotao}>Adicionar Serviço</Text>
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
