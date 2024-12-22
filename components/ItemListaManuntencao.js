import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import bike from '../assets/bike.png';
import { useNavigation } from '@react-navigation/native';

export default function ItemListaManutencao({
  data,
  setData,
  toggleModal,
  IconeLixeira,
})  {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);



  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };

  const [modalVisible2, setModalVisible2] = useState(false);

  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };

  const mostrarMensagemExcluido2 = () => {
    setExcluidoModalVisible2(true);
    toggleModal2();
  };

  function formatarData(dataString) {
    const dataISO = new Date(dataString);
    const dia = dataISO.getDate();
    const mes = dataISO.getMonth() + 1; // Note que os meses começam do zero
    const ano = dataISO.getFullYear();

    // Adiciona zero à esquerda se o dia for menor que 10
    const diaFormatado = dia < 10 ? `0${dia}` : dia;

    const dataFormatada = `${diaFormatado}/${mes}/${ano}`;
    return dataFormatada;
}

const figuras = () => {
  if (data.attributes.tipo_bike === 'MTB') {
    return (
      <Image
        source={require('../assets/mtb.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
        style={{ width: 100, height: 100 }} // ajuste o estilo conforme necessário
      />
    );
  
  } else {
    return (
      <Image
        source={require('../assets/speed.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
        style={{ width: 100, height: 100 }} // ajuste o estilo conforme necessário
      />
    );
  }
};


if (!data.attributes.dataFinalizado) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}> {data.attributes.tipo_bike} </Text>
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setData(data);
              toggleModal();
            }}>
            <IconeLixeira />
          </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.text2}>Cliente: {data.attributes.cliente.data.attributes.nome} </Text>
          <Text style={styles.text2}>Contato: {data.attributes.cliente.data.attributes.telefone} </Text>
          <Text style={styles.text2}>Endereço: {data.attributes.cliente.data.attributes.endereco} </Text>
          <Text style={styles.text2}>Descrição da bike: {data.attributes.descricao_bike} </Text>
          <Text style={styles.text2}>Iniciado em: {formatarData(data.attributes.dataIniciado)} </Text>
          <Text style={styles.text2}>Descrição do serviço: {data.attributes.descricao_servico}</Text>
          <Text style={styles.text2}>Valor do serviço: {data.attributes.valor_total}</Text>
          <Text style={styles.text2}>Status de pagamento: {data.attributes.valorRecebido}</Text>
          <Text style={styles.text2}>Despesas: {data.attributes.total_despesas}</Text>
        </View>
        <Image source={bike} style={styles.img} />
      </View>

      <View >
      <TouchableOpacity
        style={styles.botao}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('TelaServicoAtualizar', data)}>
        <Text style={styles.textbotao2}>Atualizar</Text>
      </TouchableOpacity>
      </View>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={toggleModal2}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Deseja concluir serviço?</Text>
              <View style={styles.bots}>
              <TouchableOpacity style={styles.bot} onPress={mostrarMensagemExcluido2}>
                <Text style={styles.textbotao2} >Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
                <Text style={styles.textbotao} >Cancelar</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={excluidoModalVisible2}
        onRequestClose={() => setExcluidoModalVisible2(false)}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textbotao}>Serviço concluido com sucesso!</Text>
            <TouchableOpacity
              style={styles.bot3}
              onPress={() => setExcluidoModalVisible2(false)}>
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>






      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Deseja excluir esse serviço?</Text>
              <View style={styles.bots}>
              <TouchableOpacity style={styles.bot} onPress={mostrarMensagemExcluido}>
                <Text style={styles.textbotao2} >Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
                <Text style={styles.textbotao} >Cancelar</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={excluidoModalVisible}
        onRequestClose={() => setExcluidoModalVisible(false)}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textbotao}>Serviço excluído com sucesso!</Text>
            <TouchableOpacity
              style={styles.bot3}
              onPress={() => setExcluidoModalVisible(false)}>
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
} else {
  return null;
}

 
  
};


const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#053F5C',
    marginTop: 10,
    borderBottomWidth: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  text: {
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
    fontSize: 18,
    color: '#053F5C',
  },

  text2: {
    fontSize: 14,
    color: '#053F5C',
    fontFamily: 'Urbanist_700Bold',
    maxWidth: 230,
  },

  img: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 15,
    marginHorizontal: 25,
  },

  botao2: {
    width: 150,
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#053F5C',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
  },

  botao: {
    width: "90%",
    height: 44,
    backgroundColor: '#F7AD19',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
  },

  textbotao: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },

  textbotao2: {
    fontSize: 14,
    color: '#053F5C',
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
    backgroundColor: '#053F5C',
    margin: 20,
    width: 280,
    height: 140,
    borderRadius: 20,
    padding: 35,
    elevation: 5,
    
  },
  bot:{
    width: 50,
    height: 30,
    backgroundColor: '#F7AD19',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  bot2:{
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  bot3:{
    width: 80,
    height: 30,
    backgroundColor: '#F7AD19',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  bots:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20
  }
});
