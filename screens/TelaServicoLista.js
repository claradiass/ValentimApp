import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar
} from 'react-native';

import axios from 'axios';
import { Feather } from '@expo/vector-icons';

import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import ItemListaManutencao from '../components/ItemListaManuntencao';

import { useNavigation } from '@react-navigation/native';




export default function Home({route, navigation}) {
  const [servicos, setServicos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [list, setList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [data, setData] = useState(null);

  const iconeLixeira = () => {
    return (<Feather
              name="trash-2"
              color="#053F5C"
              size={22}
              style={{ alignSelf: 'center' }}          
            />);
    };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  
  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };
  
  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };
  
  const mostrarMensagemExcluido2 = () => {
    setExcluidoModalVisible2(true);
    toggleModal2();
  };

  useEffect(() => {  
    axios.get(baseUrlServicos + "?populate=*", configAxios)
      .then(function (response) {
        // Ordenar os serviços com base na propriedade dataIniciado (mais recentes primeiro)
        const sortedServicos = response.data.data.sort((a, b) => {
          const dateA = new Date(a.attributes.dataIniciado);
          const dateB = new Date(b.attributes.dataIniciado);
          return dateB - dateA;
        });
  
        setList(sortedServicos);
        setServicos(sortedServicos);
      })
      .catch(error => {
        console.log(error);
      });
  }, [atualizaLista, route.params]);

  function remover() {  
    console.log(data)
    axios.delete(baseUrlServicos + data.id, configAxios)
      .then(function (response) {
        if (response.status == 200) {
          setAtualizaLista(atualizaLista + 1);
          mostrarMensagemExcluido();
        } else {
          Alert.alert("Erro", "Houve um erro na comunicação com o servidor!");
        }
        
      })
      .catch(error => {
        Alert.alert("Erro", "Houve um erro na comunicação com o servidor!");
        console.log(error);
      });
  }

  function atualiza() {
    console.log('get');
    axios.get(baseUrlServicos + "/?populate=*", configAxios)
        .then(function (response) {
          if (response.status == 200) {  
            const sortedServicos = response.data.data.sort((a, b) => {
              const dateA = new Date(a.attributes.dataIniciado);
              const dateB = new Date(b.attributes.dataIniciado);
              return dateB - dateA;
            });
      
            setList(sortedServicos);
            setServicos(sortedServicos);
            setExcluidoModalVisible(false);
          }        
        })
        .catch(error => {
          Alert.alert("Erro", "Houve um erro na comunicação com o servidor!");
          console.log(error);
        });
  }
  
  useEffect(() => {
    atualiza();    
  }, [atualizaLista, route.params]);

  const renderItem = ({ item  }) => <ItemListaManutencao data={item } toggleModal={toggleModal} setData={setData} IconeLixeira={iconeLixeira} />;  

  const renderEmptyItem = () => <View style={styles.emptyItem} />;


  useEffect(() => {
    if (searchText === '') {
      setList(servicos);
    } else {
      setList(
        servicos.filter(
          (item) =>
            item.attributes.tipo_bike.toLowerCase().indexOf(searchText.toLowerCase()) > -1 
            ||      
            (item.attributes.cliente.data.attributes.nome && item.attributes.cliente.data.attributes.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1)          // // item.attributes.cliente.data.attributes.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1 
        )
      );        
  
    }
  }, [searchText]);

  console.log(servicos)

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Serviços</Text>

          <TextInput
            style={styles.input}
            placeholder="Busque serviços aqui"
            placeholderTextColor={'#fff'}
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
          />

          <View style={styles.buttons}>
          <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('TelaServicoListaPendentes')}>
              <Text style={styles.text2}>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('TelaServicoListaConcluidos')}>
              <Text style={styles.text2}>Concluidos</Text>
            </TouchableOpacity>
            
          </View>

          
        </View>

        <FlatList
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderEmptyItem}
        />
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
                <TouchableOpacity style={styles.bot} onPress={() => remover()}>
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
                onPress={() => atualiza()}>
                <Text style={styles.textbotao2}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>




    



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    // paddingBottom: 100
  },
  content: {
    marginBottom: 90,
  },
  detalhe: {
    backgroundColor: '#053F5C',
    posistion: 'absolute',

    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#F7AD19',
    marginTop: 20,
  },
  input: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#fff',
    margin: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff',
  },
  emptyItem: {
    height: 200, 
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#F7AD19',
    width: 80,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    fontFamily: 'Urbanist_700Bold',
  },
  text2: {
    fontFamily: 'Urbanist_700Bold',
    color: '#053F5C',
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
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
});
