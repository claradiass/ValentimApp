// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TextInput,
//   FlatList,
// } from 'react-native';

// import ComponenteC from '../components/ComponenteC';
// import results from '../components/Resultados';

// export default function TelaServicoListaConcluidos() {
//   const renderItem = ({ item }) => <Text>{item.title}</Text>;
//   const renderEmptyItem = () => <View style={styles.emptyItem} />;

//   const [searchText, setSearchText] = useState('');
//   const [list, setList] = useState(results);

//   useEffect(() => {
//     if (searchText === '') {
//       setList(results);
//     } else {
//       setList(
//         results.filter(
//           (item) =>
//             item.cliente.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
//             item.aparelho.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//         )
//       );
//     }
//   }, [searchText]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <View style={styles.content}>
//           <TextInput
//             style={styles.input}
//             placeholder="Busque aqui o cliente ou aparelho"
//             placeholderTextColor={'#fff'}
//             value={searchText}
//             onChangeText={(t) => setSearchText(t)}
//           />
//         </View>

//         <View style={styles.wrapper}>
//           <FlatList
//             style={styles.flat}
//             data={list}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <ComponenteC
//                 data={item}
//                 contentContainerStyle={{ flexGrow: 1 }}
//               />
//             )}
//             ListFooterComponent={renderEmptyItem}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   input: {
//     borderWidth: 3,
//     borderRadius: 10,
//     borderColor: '#fff',
//     marginHorizontal: 20,
//     padding: 5,
//     paddingLeft: 15,
//     fontFamily: 'Urbanist_700Bold',
//     color: '#fff',
//     marginBottom: '8%',
//     marginTop: '12%',
//   },
//   emptyItem: {
//     height: 300,
//   },
//   content: {
//     backgroundColor: '#053F5C',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
// });
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity, Modal, StatusBar, Alert } from 'react-native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import ItemListaManutencaoConcluida from '../components/ItemListaManutencaoConcluida';


export default function TelaManutencaoAtrasados({route, navigation}) {

  const [servicos, setServicos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [list, setList] = useState([]);


  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [data, setData] = useState(null);

  const [ordenacaoMaisAntiga, setOrdenacaoMaisAntiga] = useState(true);


  const iconeLixeira = () => {
    return (<Feather
              name="trash-2"
              color="#053F5C"
              size={22}
              style={{ alignSelf: 'center' }}          
            />);
    };

    useEffect( () => { 
      axios.get(baseUrlServicos + "/populate=*", configAxios)
        .then( function (response) {
          setList(response.data.data);
          setServicos(response.data.data);
        } )
        .catch(error => {
          console.log(error);
        })
    }, []) 

    function remover() { 
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
      axios.get(baseUrlServicos + "?populate=*", configAxios)
          .then(function (response) {
            if (response.status == 200) {   
              setList(response.data.data);               
              setServicos(response.data.data);
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

  const renderItem = ({ item }) => <ItemListaManutencaoConcluida data={item} toggleModal={toggleModal} setData={setData} IconeLixeira={iconeLixeira} />

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

  const servicosAtrasados = list.filter((item) => {
    // Verifica se a dataFinalizado é null
    return item.attributes.dataFinalizado != null;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.content}>
        <Text style={styles.text1}>Serviços concluidos:</Text>
          <TextInput
            style={styles.input}
            placeholder="Busque aqui pelo nome do cliente ou aparelho"
            placeholderTextColor={'#FFF'}
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
          />
          <TouchableOpacity
              style={styles.button1}
              activeOpacity={0.7}
              onPress={() => setOrdenacaoMaisAntiga(!ordenacaoMaisAntiga)}>
              <Text style={styles.text3}>{ordenacaoMaisAntiga ? 'Serviços mais antigos' : 'Serviços mais recentes'}</Text>
            </TouchableOpacity> 
        </View>

        <View style={styles.wrapper}>
          <FlatList
            style={styles.flat}
            data={servicosAtrasados.sort((a, b) => {
              const dataA = new Date(a.attributes.dataIniciado);
              const dataB = new Date(b.attributes.dataIniciado);

              return ordenacaoMaisAntiga ? dataA - dataB : dataB - dataA; })}
            
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={renderEmptyItem}
          />

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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#F7AD19',
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#FFF',
    marginHorizontal: 20,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#FFF',
    marginBottom: 10,
    marginTop: '5%',
    // marginTop: 20
  },
  emptyItem: {
    height: 400, // Ajuste a altura conforme necessário para empurrar os itens visíveis para cima
  },
  content: {
    backgroundColor: '#053F5C',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#379BD8',
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
  button1: {
    backgroundColor: '#1E5632',
    width: 200,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    fontFamily: 'Urbanist_700Bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  text3: {
    fontFamily: 'Urbanist_700Bold',
    color: '#FFF',
    textAlign: 'center',
  },
});
