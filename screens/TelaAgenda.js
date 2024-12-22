// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text, StatusBar, Modal, StyleSheet } from 'react-native';
// import { Agenda, LocaleConfig } from 'react-native-calendars';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { Card } from 'react-native-paper';
// import { 
//     configAxios,
//     baseUrlAgendamentos
//   } from '../util/constantes';
// import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';




// LocaleConfig.locales['fr'] = {
//   monthNames: [
//     'Janeiro',
//     'Fevereiro',
//     'Março',
//     'Abril',
//     'Maio',
//     'Junho',
//     'Julho',
//     'Agosto',
//     'Setembro',
//     'Outubro',
//     'Novembro',
//     'Dezembro',
//   ],
//   monthNamesShort: [
//     'Jan',
//     'Fev',
//     'Mar',
//     'Abr',
//     'Mai',
//     'Jun',
//     'Jul',
//     'Ago',
//     'Set',
//     'Out',
//     'Nov',
//     'Dez',
//   ],
//   dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
//   dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
//   today: 'Hoje',
// };

// LocaleConfig.defaultLocale = 'fr';

// function generateEmptyDates(startDate, endDate) {
//   const emptyDates = {};
//   const currentDate = new Date(startDate);
  

//   while (currentDate <= endDate) {
//     const formattedDate = currentDate.toISOString().split('T')[0];
//     emptyDates[formattedDate] = [];
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return emptyDates;
// }

// export default function TelaAgenda({route}) {
//   const [agendamentos, setAgendamentos] = useState([]);
//   const [atualizaLista, setAtualizaLista] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
//   const [modalVisible2, setModalVisible2] = useState(false);
//   const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
//   const [items, setItems] = useState({});
//   const [selectedDate, setSelectedDate] = useState(new Date()); // Definir a data selecionada como o dia atual
//   const navigation = useNavigation();
//   const [data, setData] = useState([]);



//   function atualiza() {  
//     console.log('get');
//     axios.get(baseUrlAgendamentos + "/?populate=*", configAxios)
//       .then(function (response) {
//         if (response.status == 200) {          
//           setAgendamentos(response.data.data);
//           // setList(response.data.data);
//           setExcluidoModalVisible(false);
//         }        
//       })
//       .catch(error => {
//         alert("Erro", "Houve um erro na comunicação com o servidor!");
//         console.log(error);
//       });
//   }

//   useEffect(() => {
//     atualiza();    
//   }, [atualizaLista, route.params]);

//   function remover() {  
//     console.log("Dados antes da exclusão:", data);
//     if (data && data.id){
//     axios.delete(baseUrlAgendamentos + data.id, configAxios)
//       .then(function (response) {
//         if (response.status == 200) {
//           setAtualizaLista(atualizaLista + 1);
//           mostrarMensagemExcluido();
//         } else {
//           alert("Erro", "Houve um erro na comunicação com o servidor!");
//         }
        
//       })
//       .catch(error => {

//         if (error.response) {
//           // A requisição foi feita e o servidor respondeu com um código de status fora do intervalo 2xx
//           console.error('Response data:', error.response.data);
//           console.error('Response status:', error.response.status);
//           console.error('Response headers:', error.response.headers);
//         } else if (error.request) {
//           // A requisição foi feita, mas não houve resposta do servidor
//           console.error('Request data:', error.request);
//         } else {
//           // Alguma coisa aconteceu ao configurar a requisição que disparou um erro
//           console.error('Error message:', error.message);
//         }
//         console.error('Error config:', error.config);
        
//       });
//     } else {
//       console.error("Invalid data or data.id is undefined");
//     }
//   }

  
//   useEffect(() => {
//     const startDate = new Date(); // Defina a data de início, se desejar
//     const endDate = new Date(); // Defina a data de término, se desejar
//     endDate.setDate(endDate.getDate() + 60); // Defina a data de término, por exemplo, 1 ano no futuro

//     const newItems = generateEmptyDates(startDate, endDate, agendamentos);

//     agendamentos.forEach((item) => {
//       const date = item.attributes.data; // Supondo que "data" seja a data no formato 'YYYY-MM-DD'
//       console.log(date)
      
//       if (!newItems[date]) {
//         newItems[date] = [];
//       }
//       newItems[date].push({
//         id: `${item.id}`,
//         name: `${item.attributes.cliente?.data?.attributes?.nome}`,
//         data: `${item.attributes.data}`,
//         hora: `${item.attributes.hora}`,
//       });
//     });

//     setItems(newItems);
//   }, []);

//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   const mostrarMensagemExcluido = () => {
//     setExcluidoModalVisible(true);
//     toggleModal();
//   };

//   const toggleModal2 = () => {
//     setModalVisible2(!modalVisible2);
//   };

//   const mostrarMensagemExcluido2 = () => {
//     setExcluidoModalVisible2(true);
//     toggleModal2();
//   };

//   const loadItems = (day) => {
//     setTimeout(() => {
//       // Carregar itens adicionais para o dia, se necessário
//     }, 1000);
//   };



//   const renderItem = (item) => {
//     return (
//       <View style={{ marginRight: 10, marginTop: 20 }}>
//           <Card>
//             <Card.Content>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}>
//                 <View>
//                   <Text style={styles.textbotao3}>{item.name}</Text>
//                   <Text style={styles.textbotao3}>{item.hora.slice(0, -7)}</Text>
//                 </View>
//                 <View>
//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   onPress={() => { 
//                   console.log("Selected Data:", data);
//                   setData(item);
//                   toggleModal();
//                     }}
//                 >
//                   <Feather
//                     name="trash-2"
//                     color="#053F5C"
//                     size={25}
//                     style={{ alignSelf: 'center' }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   onPress={() => navigation.navigate('TelaAgendamentoAtualizar', {dado : item.name})}>
                  
//                   <Feather
//                     name="edit"
//                     color="#053F5C"
//                     size={25}
//                     style={{ alignSelf: 'center', marginTop: 10 }}
//                   />
//                 </TouchableOpacity>
//                 </View>
//               </View>
//             </Card.Content>
//           </Card>
//       </View>
//     );
//   };

//   // const renderItem = ({ item }) => <ItemListaAgenda data={item} toggleModal={toggleModal} setData={setData} />;

//   // const renderItem = ({ item }) => (
//   //   <ItemListaAgenda
//   //     data={item.data}
//   //     hora={item.hora}
//   //     toggleModal={toggleModal}
//   //     setData={setData}
//   //   />
//   // );
  
  
//   const renderEmptyItem = () => <View style={styles.emptyItem} />;

//   const calendarTheme = {
//     calendarBackground: '#053F5C', 
//     dayTextColor: '#FFF',
//     todayTextColor: '#FFF', 
//     selectedDayBackgroundColor: '#F7AD19',
//     selectedDayTextColor: '#053F5C', 
//     dotColor: '#F7AD19',
//     textSectionTitleColor: "#FFF",
//     monthTextColor: "#FFF",
//     agendaKnobColor: '#F7AD19', // Cor do botão para carregar mais eventos
//     selectedDay: {
//       backgroundColor: '#053F5C', // Cor de fundo dos dias com eventos
//       borderRadius: 0,
//     },
//     'stylesheet.calendar.main': {
//       emptyDayContainer: {
//         backgroundColor: '#f0f0f0', // Cor de fundo para dias sem serviços
//       },
//     },
// };

//   return (
//     <View style={{ flex: 1}}>
//       <View style={styles.detalhe}>
//         <Text style={styles.text1}>Agenda</Text>
//       </View>
//       <Agenda
//         items={items}
//         loadItemsForMonth={loadItems}
//         renderItem={renderItem}
//         theme={calendarTheme}
//         ListFooterComponent={renderEmptyItem}
//         hideKnob={false}
//         selected={selectedDate} 
//         // renderEmptyData={() => { return null }}
        
//       />

//         <View>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={toggleModal}>
//             <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 <Text style={styles.textbotao}>Deseja excluir esse serviço?</Text>
//                 <View style={styles.bots}>
//                 <TouchableOpacity style={styles.bot} onPress={() => remover()}>
//                   <Text style={styles.textbotao2} >Sim</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
//                   <Text style={styles.textbotao} >Cancelar</Text>
//                 </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//         </View>

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={excluidoModalVisible}
//           onRequestClose={() => setExcluidoModalVisible(false)}>
//           <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.textbotao}>Serviço excluído com sucesso!</Text>
//               <TouchableOpacity
//                 style={styles.bot3}
//                 onPress={() => atualiza()}>
//                 <Text style={styles.textbotao2}>Fechar</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   textbotao: {
//     fontSize: 14,
//     color: 'white',
//     fontFamily: 'Urbanist_900Black',
//     textAlign: 'center',
//   },
  
//   textbotao2: {
//     fontSize: 14,
//     color: '#053F5C',
//     fontFamily: 'Urbanist_900Black',
//     textAlign: 'center',
//   },

//   textbotao3: {
//     fontSize: 14,
//     color: '#053F5C',
//     fontFamily: 'Urbanist_900Black',
//   },

//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#053F5C',
//     margin: 20,
//     width: 280,
//     height: 140,
//     borderRadius: 20,
//     padding: 35,
//     elevation: 5,
//   },
//   bot:{
//     width: 50,
//     height: 30,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center'
//   },
//   bot2:{
//     width: 80,
//     height: 30,
//     borderWidth: 2,
//     borderRadius: 10,
//     borderColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   bot3:{
//     width: 80,
//     height: 30,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     marginTop: 20
//   },
//   bots:{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//     marginTop: 20
//   },
//   detalhe: {
//     backgroundColor: '#053F5C',
//     posistion: 'absolute',
//     paddingLeft: 20,
//     paddingBottom: 10,
//     paddingTop: 10,
//     paddingRight: 20,
//   },
//   text1: {
//     fontSize: 30,
//     fontFamily: 'Urbanist_900Black',
//     color: '#FFF',
//     marginTop: 20,
//   },
//   emptyItem: {
//     height: 2000, 
//   },
//   button: {
//     right: 20,
//     bottom: 80,
//     zIndex: 1,
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     borderRadius: 60 / 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#053F5C',
//     shadowRadius: 10,
//     shadowOpacity: 0.3,
//     shadowOffset: {
//       height: 10,
//     },
//     borderColor: "#FFF",
//     borderWidth: 2
//   },
//   menu: {
//     backgroundColor: '#053F5C',
//     borderColor: "#FFF",
//     borderWidth: 2

//   },
// });

// // const renderItem = ({ item }) => <ItemListaAgenda data={item} toggleModal={toggleModal} setData={setData} />;

//   // const renderItem = ({ item }) => (
//   //   <ItemListaAgenda
//   //     data={item.data}
//   //     hora={item.hora}
//   //     toggleModal={toggleModal}
//   //     setData={setData}
//   //   />
//   // );
  



import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StatusBar, Modal, StyleSheet } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Card } from 'react-native-paper';
import { 
    configAxios,
    baseUrlAgendamentos
  } from '../util/constantes';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';


LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'fr';

function generateEmptyDates(startDate, endDate) {
  const emptyDates = {};
  const currentDate = new Date(startDate);
  

  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split('T')[0];
    emptyDates[formattedDate] = [];
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return emptyDates;
}

export default function TelaAgenda({route}) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date()); // Definir a data selecionada como o dia atual
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const calendarTheme = {
    calendarBackground: '#053F5C', 
    dayTextColor: '#FFF',
    todayTextColor: '#FFF', 
    selectedDayBackgroundColor: '#F7AD19',
    selectedDayTextColor: '#053F5C', 
    dotColor: '#F7AD19',
    textSectionTitleColor: "#FFF",
    monthTextColor: "#FFF",
    agendaKnobColor: '#F7AD19', // Cor do botão para carregar mais eventos
    selectedDay: {
      backgroundColor: '#053F5C', // Cor de fundo dos dias com eventos
      borderRadius: 0,
    },
    'stylesheet.calendar.main': {
      emptyDayContainer: {
        backgroundColor: '#f0f0f0', // Cor de fundo para dias sem serviços
      },
    },
  };

  function atualiza() {  
    console.log('get');
    axios.get(baseUrlAgendamentos + "?populate=*", configAxios)
      .then(function (response) {
        if (response.status == 200) {          
          setAgendamentos(response.data.data);
          // setList(response.data.data);
          setExcluidoModalVisible(false);
        }        
      })
      .catch(error => {
        alert("Erro", "Houve um erro na comunicação com o servidor!");
        console.log(error);
      });
  }

  function remover() {  
    console.log("Dados antes da exclusão:", data);
    if (data && data.id){
    axios.delete(baseUrlAgendamentos + data.id, configAxios)
      .then(function (response) {
        if (response.status == 200) {
          setAtualizaLista(atualizaLista + 1);
          mostrarMensagemExcluido();
        } else {
          alert("Erro", "Houve um erro na comunicação com o servidor!");
        }
        
      })
      .catch(error => {

        if (error.response) {
          // A requisição foi feita e o servidor respondeu com um código de status fora do intervalo 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // A requisição foi feita, mas não houve resposta do servidor
          console.error('Request data:', error.request);
        } else {
          // Alguma coisa aconteceu ao configurar a requisição que disparou um erro
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        
      });
    } else {
      console.error("Invalid data or data.id is undefined");
    }
  }

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

  const loadItems = (day) => {
    setTimeout(() => {
      // Carregar itens adicionais para o dia, se necessário
    }, 1000);
  };

  // Specify how each date should be rendered. day can be undefined if the item is not first in that day
  const renderEmptyDay = () => {
    return <View />;
  };

  //returns card for empty slots.
  const renderEmptyItem = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesome
            name="calendar-times-o"
            color="#F7AD19"
            size={30}
            style={{ alignSelf: 'center' }}
          />
        <Text style={styles.text3}>
        Não há agendamentos para o dia selecionado!
        </Text>
        </View>
    );
  };

  const renderItem = (item) => {
    return (
      <View style={{ marginRight: 10, marginTop: 20 }}>
          <Card>
          <View style={{marginBottom: 5, backgroundColor: '#F7AD19'}} >
                <Text style={styles.textbotao4}>Horário: {item.hora.slice(0, -7)}</Text>
              </View>
            <Card.Content>
              

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} >
                  <MaterialCommunityIcons
                    name="calendar"
                    color="#F7AD19"
                    size={50}
                    style={{ alignSelf: 'center', marginRight: 10 }}
                  />
                  <View>
                  <View>
                  <Text style={styles.textbotao3}>Cliente: {item.name}</Text>
                  <Text style={styles.textbotao3}>Telefone: {item.telefone}</Text>
                  <Text style={styles.textbotao3}>Endereço: {item.endereco}</Text>


                </View>

                  </View>
                
                  </View>
                
                <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => { 
                  console.log("Selected Data:", data);
                  setData(item);
                  toggleModal();
                    }}
                >
                  <Feather
                    name="trash-2"
                    color="#F7AD19"
                    size={25}
                    style={{ alignSelf: 'center' }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('TelaAgendaAtualizar', {dados: item })}>
                  <Feather
                    name="edit"
                    color="#F7AD19"
                    size={25}
                    style={{ alignSelf: 'center', marginTop: 10 }}
                  />
                </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>
      </View>
    );
  };

  // const renderEmptyItem = () => <View style={styles.emptyItem} />;

  useEffect(() => {
    atualiza();    
  }, [atualizaLista, route.params]);


  useEffect( () => {
    const newItems = {} //generateEmptyDates(startDate, endDate);

    agendamentos.forEach((item) => {
      const date = item.attributes.data; // Supondo que "data" seja a data no formato 'YYYY-MM-DD'
      console.log(date)
      
      if (!newItems[date]) {
        newItems[date] = [];
      }
      newItems[date].push({
        id: `${item.id}`,
        name: `${item.attributes.cliente?.data?.attributes?.nome || 'Cliente Desconhecido'}`,
        hora: `${item.attributes.hora}`,
        data: `${item.attributes.data}`,
        idCliente: `${item.attributes.cliente?.data?.id || 'Cliente Desconhecido'}`,
        telefone: `${item.attributes.cliente?.data?.attributes?.telefone || 'Cliente Desconhecido'}`,
        endereco: `${item.attributes.cliente?.data?.attributes?.endereco || 'Cliente Desconhecido'}`,

      });
    });

    setItems(newItems);
  }, [agendamentos])
  return (
    <View style={{ flex: 1}}>
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Agenda</Text>
      </View>
      <Agenda
        items={items}
        renderEmptyData={renderEmptyItem}
        renderItem={renderItem}
        theme={calendarTheme}
        selected={selectedDate} 
        
      />
      <View style={{height: 70}}/>

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textbotao}>Deseja excluir esse Agendamento?</Text>
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
              <Text style={styles.textbotao}>Agendamento excluído com sucesso!</Text>
              <TouchableOpacity
                style={styles.bot3}
                onPress={() => atualiza()}>
                <Text style={styles.textbotao2}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

  textbotao3: {
    fontSize: 14,
    color: '#053F5C',
    fontFamily: 'Urbanist_900Black',
    maxWidth: "80%",
    minWidth: '80%'
  },

  textbotao4: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
    marginBottom: 5
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
  detalhe: {
    backgroundColor: '#053F5C',
    posistion: 'absolute',
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#FFF',
    marginTop: 20,
  },
  text3: {
    fontSize: 16,
    fontFamily: 'Urbanist_900Black',
    color: '#F7AD19',
    marginTop: 5,
  },
  emptyItem: {
    height: 2000, 
  },
  button: {
    right: 20,
    bottom: 80,
    zIndex: 1,
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#053F5C',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
    borderColor: "#FFF",
    borderWidth: 2
  },
  menu: {
    backgroundColor: '#053F5C',
    borderColor: "#FFF",
    borderWidth: 2

  },
});








