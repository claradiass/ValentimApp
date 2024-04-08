// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import {
//   Ionicons,
//   AntDesign,
//   MaterialIcons,
//   FontAwesome5,
//   Entypo,
// } from '@expo/vector-icons';





// // Função para gerar dados fictícios de despesas e lucros para uma semana específica
// const generateDataForWeek = (selectedDate) => {
//   // Implementação fictícia para gerar dados de exemplo
//   const data = {
//     '2023-09-25': { expenses: 100, profits: 500 },
//     '2023-09-26': { expenses: 50, profits: 300 },
//     '2023-09-27': { expenses: 200, profits: 600 },
//     '2023-09-28': { expenses: 150, profits: 700 },
//     '2023-09-29': { expenses: 120, profits: 400 },
//     '2023-09-30': { expenses: 80, profits: 350 },
//     '2023-10-01': { expenses: 90, profits: 400 }, // Próxima semana
//   };

//   return data[selectedDate] || { expenses: 0, profits: 0 };
// };

// export default function TelaRelatorioDiario(){
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [data, setData] = useState({ expenses: 0, profits: 0 });

//   // Função para lidar com a seleção de data no calendário
//   const handleDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     const newData = generateDataForWeek(day.dateString);
//     setData(newData);
//   };

//   const formatDateToBrazilian = (date) => {
//     if (!date) return '';
//     const [year, month, day] = date.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   return (
//     <ScrollView style={styles.container}>
//     <View>
//     <View style={{ marginBottom: 100 }}>
//       <View style={styles.calendarContainer}>
//         <Calendar
//           onDayPress={handleDayPress}
//           markedDates={{ [selectedDate]: { selected: true } }}
//           theme={{
//             calendarBackground: '#053F5C',
//             dayTextColor: '#FFF',
//             dayBackgroundColor: 'black',
//             todayTextColor: '#F7AD19',
//             textSectionTitleColor: '#F7AD19',
//             monthTextColor: '#FFF',
//             selectedDayBackgroundColor: '#FFF',
//             selectedDayTextColor: '#053F5C',
//             arrowColor: '#FFF',
//             disabledDayTextColor: 'red', 
   
//           }}
//           style={styles.roundedCalendar}
//         />
//       </View>
//       {data && (
//         <View style={styles.dataContainer}>
//           <Text style={styles.text7}>Dados da dia selecionado</Text>

//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-around',
//                   marginTop: 10,
//                 }}>
//                 <View
//                   style={{
//                     backgroundColor: '#053F5C',
//                     borderRadius: 10,
//                     width: 110,
//                     height: 150,
//                     alignItems: 'center',
//                     flexDirection: 'column',
//                     justifyContent: 'space-around',
//                   }}>
//                   <Text style={styles.text4}>Despesas</Text>
//                   <Entypo name="emoji-sad" color="#F7AD19" size={40} />
//                   <Text style={styles.text4}>R$ {data.expenses}</Text>
//                 </View>

//                 <View
//                   style={{
//                     backgroundColor: '#053F5C',
//                     borderRadius: 10,
//                     width: 110,
//                     height: 150,
//                     alignItems: 'center',
//                     flexDirection: 'column',
//                     justifyContent: 'space-around',
//                   }}>
//                   <Text style={styles.text4}>Rendimento</Text>
//                   <Entypo name="emoji-happy" color="#F7AD19" size={40} />
//                   <Text style={styles.text4}>R$ {data.profits}</Text>
//                 </View>
//                 <View
//                   style={{
//                     backgroundColor: '#F7AD19',
//                     borderRadius: 10,
//                     width: 110,
//                     height: 150,
//                     alignItems: 'center',
//                     flexDirection: 'column',
//                     justifyContent: 'space-around',
//                   }}>
//                   <Text style={styles.text3}>Lucro</Text>
//                   <Entypo name="emoji-flirt" color="#053F5C" size={40} />
//                   <Text style={styles.text3}>
//                     R$ {data.profits - data.expenses}
//                   </Text>
//                 </View>
//               </View>
//         </View>
//       )}
//       </View>
//     </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   calendarContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   dataContainer: {
//     marginTop: 20,
//   },
//   roundedCalendar: {
//     borderRadius: 10,
//   },

//   text7: {
//     fontSize: 20,
//     fontFamily: 'Urbanist_900Black',
//     color: '#053F5C',
//     marginBottom: 10,
//     alignSelf: 'center',
//     textAlign: 'center',
//   },
//   text4: {
//     fontFamily: 'Urbanist_900Black',
//     color: '#FFF',
//     fontSize: 16,
//     margin: 10,
//   },
//   text3: {
//     fontFamily: 'Urbanist_900Black',
//     color: '#053F5C',
//     fontSize: 16,
//     margin: 10,
//   },
// });





import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView,  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios'; 
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import { useFocusEffect } from '@react-navigation/native';

export default function TelaRelatorioDiario() {
  const [servico, setServico] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({ Despesas: 0, ValorPago: 0, ValorTotal: 0 });
  

  useFocusEffect(
    React.useCallback(() => {
      // Defina atualizaLista como true para buscar os dados mais recentes
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrlServicos, configAxios);
          setServico(response.data.data);
          setAtualizaLista(false);

          // Se uma data estiver selecionada, recalcule os dados
          if (selectedDate) {
            getDataForSelectedDate(selectedDate);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [selectedDate]) // Execute sempre que a data selecionada for alterada
  );

  const handleDayPress = (day) => {
    console.log("Selected Date:", day.dateString);
    setSelectedDate(day.dateString);
    getDataForSelectedDate(day.dateString);
  };

  const getDataForSelectedDate = (selectedDate) => {
    console.log("Searching for Date:", selectedDate);
  
    const selectedData = servico.filter(item => {
      // Verifica se item e item.attributes são diferentes de null
      return item && item.attributes && item.attributes.dataFinalizado && item.attributes.dataFinalizado.startsWith(selectedDate);
    });
  
    if (selectedData.length > 0) {
      console.log("Data Found:", selectedData);
  
      let totalDespesas = 0;
      let totalValorTotal = 0;
  
      selectedData.forEach(item => {
        totalDespesas += item.attributes.total_despesas;
        totalValorTotal += item.attributes.valor_total;
      });
  
      setData({
        Despesas: totalDespesas,
        ValorTotal: totalValorTotal,
      });
    } else {
      console.log("Data Not Found");
  
      setData({ Despesas: 0, ValorTotal: 0 });
    }
  };

  return (
    <ScrollView  style={styles.container}>
      <View>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{ [selectedDate]: { selected: true } }}
            theme={{
                calendarBackground: '#053F5C',
                dayTextColor: '#FFF',
                dayBackgroundColor: 'black',
                todayTextColor: '#F7AD19',
                textSectionTitleColor: '#F7AD19',
                monthTextColor: '#FFF',
                selectedDayBackgroundColor: '#FFF',
                selectedDayTextColor: '#053F5C',
                arrowColor: '#FFF',
        
              }}
              style={styles.roundedCalendar}
          />
        </View>
        {data && (
          <View style={styles.dataContainer}>
            <Text style={styles.text7}>Dados do Dia Selecionado</Text>
            <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#053F5C',
                    borderRadius: 10,
                    width: 110,
                    height: 150,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.text4}>Despesas</Text>
                  <Entypo name="emoji-sad" color="#F7AD19" size={40} />
                  <Text style={styles.text4}>R$ {data.Despesas}</Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#053F5C',
                    borderRadius: 10,
                    width: 110,
                    height: 150,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.text4}>Rendimento</Text>
                  <Entypo name="emoji-happy" color="#F7AD19" size={40} />
                  <Text style={styles.text4}>R$ {data.ValorTotal}</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F7AD19',
                    borderRadius: 10,
                    width: 110,
                    height: 150,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.text3}>Lucro</Text>
                  <Entypo name="emoji-flirt" color="#053F5C" size={40} />
                  <Text style={styles.text3}>
                    R$ {data.ValorTotal - data.Despesas}
                  </Text>
                </View>
              </View>
        </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    padding: 20,
  },
  dataContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 110
  },
  roundedCalendar: {
    borderRadius: 10,
  },

  text7: {
    fontSize: 20,
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    marginBottom: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  text4: {
    fontFamily: 'Urbanist_900Black',
    color: '#FFF',
    fontSize: 16,
    margin: 10,
  },
  text3: {
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    fontSize: 16,
    margin: 10,
  },
});

