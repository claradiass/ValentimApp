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

// export default function TelaRalatorioSemanal(){
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [data, setData] = useState({ expenses: 0, profits: 0 });

//   const formatDateToBrazilian = (date) => {
//     if (!date) return '';
//     const [year, month, day] = date.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   const generateDataForWeek = (startDate) => {
//     let expenses = 0;
//     let profits = 0;

//     for (let i = 0; i < 7; i++) {
//       const currentDate = addDays(startDate, i);
//       const dailyData = generateDailyData(currentDate);
//       expenses += dailyData.expenses;
//       profits += dailyData.profits;
//     }

//     return { expenses, profits };
//   };

//   const generateDailyData = (date) => {
//     const data = {
//       '2023-09-25': { expenses: 100, profits: 500 },
//       '2023-09-26': { expenses: 50, profits: 300 },
//       '2023-09-27': { expenses: 200, profits: 600 },
//       '2023-09-28': { expenses: 150, profits: 700 },
//       '2023-09-29': { expenses: 120, profits: 400 },
//       '2023-09-30': { expenses: 80, profits: 350 },
//       '2023-10-01': { expenses: 90, profits: 400 },
//     };

//     return data[date] || { expenses: 0, profits: 0 };
//   };

//   const addDays = (dateString, days) => {
//     if (!dateString) return null;
//     const currentDate = new Date(dateString);
//     currentDate.setDate(currentDate.getDate() + days);
//     const year = currentDate.getFullYear();
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//     const day = String(currentDate.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const handleDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     const newData = generateDataForWeek(day.dateString);
//     setData(newData);
//   };

//   const getMarkedDates = () => {
//     if (selectedDate) {
//       const markedDates = {};
//       markedDates[selectedDate] = {
//         startingDay: true,
//         color: '#F7AD19',
//         textColor: 'white',
//       };

//       for (let i = 1; i < 8; i++) {
//         const nextDate = addDays(selectedDate, i);
//         markedDates[nextDate] = { color: '#F7AD19', textColor: '#053F5C' };
//       }

//       return markedDates;
//     }

//     return {};
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View>
//         <View style={{ marginBottom: 100 }}>
//           <View style={styles.calendarContainer}>
//             <Calendar
//               onDayPress={handleDayPress}
//               markingType={'period'}
//               markedDates={getMarkedDates()}
//               theme={{
//                 calendarBackground: '#053F5C',
//                 dayTextColor: '#FFF',
//                 dayBackgroundColor: 'black',
//                 todayTextColor: '#F7AD19',
//                 textSectionTitleColor: '#F7AD19',
//                 monthTextColor: '#FFF',
//                 arrowColor: '#FFF',
//               }}
//               style={styles.roundedCalendar}
//             />
//           </View>
//           {data && (
//             <View style={styles.dataContainer}>
//               <Text style={styles.text7}>Dados da Semana Selecionada</Text>

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
//             </View>
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   calendarContainer: {
//     padding: 20,
//     flex: 1,
//   },
//   dataContainer: {
//     marginTop: 20,
//   },

//   text7: {
//     fontSize: 20,
//     fontFamily: 'Urbanist_900Black',
//     color: '#053F5C',
//     marginBottom: 10,
//     alignSelf: 'center',
//     textAlign: 'center',
//   },
//   roundedCalendar: {
//     borderRadius: 10,
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


// // <View
// //                 style={{
// //                   flexDirection: 'row',
// //                   justifyContent: 'space-around',
// //                 }}>
// //                 <Text style={styles.text3}>
// //                   {formatDateToBrazilian(selectedDate)}
// //                 </Text>
// //                 <Text style={styles.text3}>
// //                   {' '}
// //                   {formatDateToBrazilian(addDays(selectedDate, 7))}
// //                 </Text>
// //               </View>





import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import { useFocusEffect } from '@react-navigation/native';


export default function TelaRelatorioSemanal() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [servico, setServico] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(true);
  const [data, setData] = useState({ expenses: 0, profits: 0 });

  useFocusEffect(
    React.useCallback(() => {
      // Defina atualizaLista como true para buscar os dados mais recentes
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrlServicos, configAxios);
          setServico(response.data.data);
          setAtualizaLista(false);

          // Se uma data estiver selecionada, recalcule os dados
          
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [selectedDate]) // Execute sempre que a data selecionada for alterada
  );

  
  

  const formatDateToBrazilian = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const generateDataForWeek = (startDate, services) => {
    let expenses = 0;
    let profits = 0;
  
    for (let i = 1; i < 8; i++) {
      const currentDate = addDays(startDate, i);
      const dailyData = generateDailyData(currentDate, services);
      expenses += dailyData.expenses;
      profits += dailyData.profits;
    }
  
    return { expenses, profits };
  };
  

  console.log("-------------------------")
  const generateDailyData = (date) => {
    console.log("Searching for Date:", date);
  
    const selectedData = servico.filter(item => {
      // Verifica se item não é nulo e se a dataFinalizado começa com a data desejada
      return item && item.attributes && item.attributes.dataFinalizado && item.attributes.dataFinalizado.startsWith(date);
    });
  
    if (selectedData.length > 0) {
      let totalDespesas = 0;
      let totalProfits = 0;
  
      selectedData.forEach(item => {
        console.log("Item Found:", item);
  
        // Certifique-se de substituir 'totalDespesas' e 'valorTotal' pelos nomes reais das propriedades
        if (item.attributes && typeof item.attributes.total_despesas === 'number' && !isNaN(item.attributes.total_despesas)) {
          totalDespesas += item.attributes.total_despesas;
        }
  
        if (item.attributes && typeof item.attributes.valor_total === 'number' && !isNaN(item.attributes.valor_total)) {
          totalProfits += item.attributes.valor_total;
        }
      });
  
      console.log("Total Expenses:", totalDespesas);
      console.log("Total Profits:", totalProfits);
  
      return {
        expenses: totalDespesas,
        profits: totalProfits,
      };
    } else {
      console.log("No Data Found");
      return { expenses: 0, profits: 0 };
    }
  };
  
  
  

  const addDays = (dateString, days) => {
    if (!dateString) return null;
    const currentDate = new Date(dateString);
    currentDate.setDate(currentDate.getDate() + days);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const newData = generateDataForWeek(day.dateString, servico);
    setData(newData);
  };
  

  const getMarkedDates = () => {
    if (selectedDate) {
      const markedDates = {};
      markedDates[selectedDate] = {
        startingDay: true,
        endingDay: true,
        color: '#F7AD19',
        textColor: 'white',
      };
  
      for (let i = 1; i < 8; i++) {
        const nextDate = addDays(selectedDate, i);
        if (i === 7) {
          markedDates[nextDate] = { endingDay: true, color: '#F7AD19', textColor: '#053F5C' };
        } else if (i === 1){
          markedDates[nextDate] = { startingDay: true, color: '#F7AD19', textColor: '#053F5C' };
        } else {
          markedDates[nextDate] = { color: '#F7AD19', textColor: '#053F5C' };
        }
      }
  
      return markedDates;
    }
  
    return {};
  };

  return (
    <ScrollView style={styles.container}>
      <View >
        <View style={{ marginBottom: 100 }}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markingType={'period'}
              markedDates={getMarkedDates()}
              theme={{
                calendarBackground: '#053F5C',
                dayTextColor: '#FFF',
                dayBackgroundColor: 'black',
                todayTextColor: '#F7AD19',
                textSectionTitleColor: '#F7AD19',
                monthTextColor: '#FFF',
                arrowColor: '#FFF',
                
              }}
              
              style={styles.roundedCalendar}
            />
          </View>
          {data && (
            <View style={styles.dataContainer}>
              <Text style={styles.text7}>Dados da Semana Selecionada</Text>
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
                  <Text style={styles.text4}>R$ {data.expenses}</Text>
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
                  <Text style={styles.text4}>R$ {data.profits}</Text>
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
                    R$ {data.profits - data.expenses}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    padding: 20,
    flex: 1,
  },
  dataContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
    text7: {
    fontSize: 20,
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    marginBottom: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  roundedCalendar: {
    borderRadius: 10,
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
  roundedCalendar: {
    borderRadius: 10,
  },
});
