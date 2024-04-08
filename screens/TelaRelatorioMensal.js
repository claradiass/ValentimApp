// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { PieChart } from 'react-native-gifted-charts';
// import { Picker } from '@react-native-picker/picker';
// import {
//   configAxios,
//   baseUrlServicos
// } from '../util/constantes';
//   import { Dropdown } from 'react-native-element-dropdown';
//   import { useFocusEffect } from '@react-navigation/native';
// import {
//   Ionicons,
//   AntDesign,
//   MaterialIcons,
//   FontAwesome5,
//   Entypo,
// } from '@expo/vector-icons';


// export default function TelaRelatorioMensal() {
//   const [servico, setServico] = useState([]);
//   const [atualizaLista, setAtualizaLista] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState([]); // Mês atual
//   const [selectedYear, setSelectedYear] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);


//   useFocusEffect(
//     React.useCallback(() => {
//       // Defina atualizaLista como true para buscar os dados mais recentes
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(baseUrlServicos, configAxios);
//           setServico(response.data.data);
//           setAtualizaLista(false);

//           // Se uma data estiver selecionada, recalcule os dados
          
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       fetchData();
//     }, [selectedMonth]) // Execute sempre que a data selecionada for alterada
//   );

//   const calcularTotais = (data) => {
//     let totalDespesas = 0;
//     let totalValorTotal = 0;

//     data.forEach(item => {
//       const attributes = item.attributes;
//       totalDespesas += attributes.total_despesas;
//       totalValorTotal += attributes.valor_total;
//     });

//     return { totalDespesas, totalValorTotal };
//   };

//   const filterDataByMonthAndYear = (selectedMonth, selectedYear) => {
//     const filtered = servico.filter(item => {
//       const date = new Date(item.attributes.dataFinalizado);
//       const month = date.getMonth() + 1;
//       const year = date.getFullYear();

//       return month === selectedMonth && year === selectedYear;
//     });
//     setFilteredData(filtered);
//   };

//   useEffect(() => {
//     filterDataByMonthAndYear(selectedMonth, selectedYear);
//   }, [selectedMonth, selectedYear]);

//   const { totalDespesas, totalValorTotal } = calcularTotais(filteredData);


//   const months = [
//     { label: 'Janeiro', value: 1 },
//     { label: 'Fevereiro', value: 2 },
//     { label: 'Março', value: 3 },
//     { label: 'Abril', value: 4 },
//     { label: 'Maio', value: 5 },
//     { label: 'Junho', value: 6 },
//     { label: 'Julho', value: 7 },
//     { label: 'Agosto', value: 8 },
//     { label: 'Setembro', value: 9 },
//     { label: 'Outubro', value: 10 },
//     { label: 'Novembro', value: 11 },
//     { label: 'Dezembro', value: 12 },
//     ];
  
    
  
    
//       // Crie o array de anos como você fez anteriormente
//       const years = [
//         { label: '2023', value: 2023 },
//         { label: '2024', value: 2024 },
//         { label: '2025', value: 2025 },
//         { label: '2026', value: 2026 },
//         { label: '2027', value: 2027 },
//         // Adicione mais anos conforme necessário
//       ];

//       const renderDot = color => {
//         return (
//           <View
//             style={{
//               height: 30,
//               width: 30,
//               borderRadius: 10,
//               backgroundColor: color,
//             }}
//           />
//         );
//       };
    
//       const renderLegendComponent = () => {
//         return (
//           <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
            
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//               {renderDot('#F7AD19')}
//               <Text style={styles.text4}>Total de {'\n'}Despesas: R$ {totalDespesas}</Text>
//             </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//               {renderDot('#053F5C')}
//               <Text style={styles.text4}>Lucro: R$ {totalValorTotal - totalDespesas}</Text>
//             </View>
//           </View>
//         );
//       };
    
    
    
//       const [value, setValue] = useState(null);
    
//         const renderItem = item => {
//           return (
//             <View style={styles.item}>
//               <Text style={styles.textItem}>{item.label}</Text>
//               {item.value === value && (
//                 <FontAwesome5 style={styles.icon} name="calendar-check" color="#053F5C" size={20} />
//               )}
//             </View>
//           );
//         };



//   const pieData2 = [
//     {
//       value: totalValorTotal - totalDespesas,
//       color: '#053F5C',
//       text:("R$ " + (totalValorTotal - totalDespesas)).toString(),
//       focused: true,
//     },
//     {
//       value: totalDespesas,
//       color: '#F7AD19',
//       text:("R$ " + totalDespesas).toString(),
//     }
//   ];



//   return (
//     <ScrollView style={styles.container}>
//       <View>
//         {/* <Grafico /> */}
//         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={months}
//             search
//             maxHeight={300}
//             labelField="label"
//             valueField="value"
//             placeholder="Escolha um mês"
//             searchPlaceholder="Pesquise..."
//             value={selectedMonth}  
//             onChange={(item) => {
//               setSelectedMonth(item.value);  
//             }}
//             renderLeftIcon={() => (
//               <FontAwesome5 style={styles.icon} name="calendar-check" color="#053F5C" size={20} />
//             )}
//             renderItem={renderItem}
//           />
          
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={years}
//             search
//             maxHeight={300}
//             labelField="label"
//             valueField="value"
//             placeholder="Escolha um ano"
//             searchPlaceholder="Pesquise..."
//             value={selectedYear}
//             onChange={(item) => {
//               setSelectedYear(item.value);
//             }}
//             renderLeftIcon={() => (
//               <FontAwesome5 style={styles.icon} name="calendar-check" color="#053F5C" size={20} />
//             )}
//             renderItem={renderItem}
//           />

//         </View>

//         <PieChart
//               data={pieData2}
//               donut
//               showText
//               showValuesAsLabels
//               focusOnPress
//               radius={150} // Ajuste o valor conforme necessário
//               innerRadius={75}
//               textColor="white"
//               textSize={13}
//               fontWeight="bold"
//               textAlign="center"
//               innerCircleColor={'#FFF'}
//               labelPosition="center"
              
//               centerLabelComponent={() => {
//                 return (
//                   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    
//                     <Text style={styles.text3}>Valor total</Text>
//                     <Text
//                       style={styles.text3}>
//                       R$ {totalValorTotal}
//                     </Text>
//                   </View>
//                 );
//               }}
//             />


//         <View style={{ marginTop: 15 }}>
//           <View style={styles.inf}>
//             <View style={styles.quadrado1} />
//             <Text style={styles.text5}>Despesas</Text>
//           </View>

//           <View style={styles.inf}>
//             <View style={styles.quadrado2} />
//             <Text style={styles.text5}>Lucro</Text>
//           </View>
//         </View>
//         <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-around',
//                   marginTop: 20,
//                 }}>
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
//                   <Text style={styles.text3}>Despesas</Text>
//                   <Entypo name="emoji-sad" color="#053F5C" size={40} />
//                   <Text style={styles.text3}>R$ </Text>
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
//                   <Text style={styles.text3}>Rendimento</Text>
//                   <Entypo name="emoji-happy" color="#053F5C" size={40} />
//                   <Text style={styles.text3}>R$ </Text>
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
//                   <Text style={styles.text4}>Lucro</Text>
//                   <Entypo name="emoji-flirt" color="#F7AD19" size={40} />
//                   <Text style={styles.text4}>
//                     R$
//                   </Text>
//                 </View>
//               </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },

//   text5: {
//     textAlign: 'center',
//     fontFamily: 'Urbanist_900Black',
//     color: '#053F5C',
//     fontSize: 16,
//     marginLeft: 10,
//   },

//   quadrado1: {
//     height: 25,
//     width: 25,
//     backgroundColor: '#F7AD19',
//     borderRadius: 50,
//     alignSelf: 'center',
//   },

//   quadrado2: {
//     height: 25,
//     width: 25,
//     backgroundColor: '#053F5C',
//     borderRadius: 50,
//     alignSelf: 'center',
//   },
//   inf: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
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


// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { PieChart } from 'react-native-gifted-charts';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';
// import {
//   configAxios,
//   baseUrlServicos
// } from '../util/constantes';
//   import { Dropdown } from 'react-native-element-dropdown';
//   import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
//   import { useFocusEffect } from '@react-navigation/native';



  

// export default function TelaRelatorioMensal() {
//   const [servico, setServico] = useState([]);
//   const [atualizaLista, setAtualizaLista] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState([]); // Mês atual
//   const [selectedYear, setSelectedYear] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
  

//   useFocusEffect(
//     React.useCallback(() => {
//       // Defina atualizaLista como true para buscar os dados mais recentes
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(baseUrlServicos, configAxios);
//           setServico(response.data.data);
//           setAtualizaLista(false);

//           // Se uma data estiver selecionada, recalcule os dados
          
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       fetchData();
//     }, [selectedMonth]) // Execute sempre que a data selecionada for alterada
//   );

//   // useEffect(() => {
//   //   if (servico.length === 0) {
//   //     axios
//   //       .get(baseUrlServicos, configAxios)
//   //       .then(function (response) {
//   //         setServico(response.data.data);
//   //         setAtualizaLista(false);
//   //       })
//   //       .catch(error => {
//   //         console.log(error);
//   //       });
//   //   }
//   // }, [servico, atualizaLista]);

//   const calcularTotais = (data) => {
//     let totalDespesas = 0;
//     let totalValorTotal = 0;
  
//     data.forEach(item => {
//       const attributes = item.attributes;
//       totalDespesas += attributes.total_despesas; // Alteração aqui
//       totalValorTotal += attributes.valor_total; // Alteração aqui
//     });
  
//     return { totalDespesas, totalValorTotal };
//   };
  

//   const filterDataByMonthAndYear = (selectedMonth, selectedYear) => {
//     const filtered = servico.filter(item => {
//       const date = new Date(item.attributes.dataFinalizado);
//       const month = date.getMonth() + 1;
//       const year = date.getFullYear();
  
//       return month === selectedMonth && year === selectedYear;
//     });
//     setFilteredData(filtered);
//   };

  
  

//   useEffect(() => {
//     filterDataByMonthAndYear(selectedMonth, selectedYear);
//   }, [selectedMonth, selectedYear]);

//   const { totalDespesas, totalValorTotal } = calcularTotais(filteredData);

//   const filterDataByMonth = (selectedMonth) => {
//     const filtered = servico.filter(item => {
//       const month = new Date(item.attributes.dataFinalizado).getMonth() + 1;
//       return month === selectedMonth;
//     });
//     setFilteredData(filtered);
//     console.log(filtered);
//   };
  

//   // useEffect(() => {
//   //   filterDataByMonth(selectedMonth);
//   // }, [selectedMonth]);

//   // const { totalDespesas, totalValorTotal } = calcularTotais(filteredData);

//   const pieData2 = [
//     {
//       value: totalValorTotal - totalDespesas,
//       color: '#053F5C',
//       text: `R$ ${totalValorTotal - totalDespesas}`,
//       focused: true,
//     },
//     {
//       value: totalDespesas,
//       color: '#F7AD19',
//       text: `R$ ${totalDespesas}`,
//     }
//   ];
  

//   const months = [
//   { label: 'Janeiro', value: 1 },
//   { label: 'Fevereiro', value: 2 },
//   { label: 'Março', value: 3 },
//   { label: 'Abril', value: 4 },
//   { label: 'Maio', value: 5 },
//   { label: 'Junho', value: 6 },
//   { label: 'Julho', value: 7 },
//   { label: 'Agosto', value: 8 },
//   { label: 'Setembro', value: 9 },
//   { label: 'Outubro', value: 10 },
//   { label: 'Novembro', value: 11 },
//   { label: 'Dezembro', value: 12 },
//   ];

  

  
//     // Crie o array de anos como você fez anteriormente
//     const years = [
//       { label: '2023', value: 2023 },
//       { label: '2024', value: 2024 },
//       { label: '2025', value: 2025 },
//       { label: '2026', value: 2026 },
//       { label: '2027', value: 2027 },
//       // Adicione mais anos conforme necessário
//     ];




//   const renderDot = color => {
//     return (
//       <View
//         style={{
//           height: 30,
//           width: 30,
//           borderRadius: 10,
//           backgroundColor: color,
//         }}
//       />
//     );
//   };

//   const renderLegendComponent = () => {
//     return (
//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//           {renderDot('#F7AD19')}
//           <Text style={styles.text4}>Total de {'\n'}Despesas: R$ {totalDespesas}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//           {renderDot('#053F5C')}
//           <Text style={styles.text4}>Lucro: R$ {totalValorTotal - totalDespesas}</Text>
//         </View>
//       </View>
//     );
//   };



//   const [value, setValue] = useState(null);

//     const renderItem = item => {
//       return (
//         <View style={styles.item}>
//           <Text style={styles.textItem}>{item.label}</Text>
//           {item.value === value && (
//             <FontAwesome5 style={styles.icon} name="calendar-check" color="#053F5C" size={20} />
//           )}
//         </View>
//       );
//     };



//   return (
//     <ScrollView style={styles.container}>
//         <View>
//           <Text style={styles.text7}>
//             Escolha um mês e um ano
//           </Text>

//           <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={months}
//             search
//             maxHeight={300}
//             labelField="label"
//             valueField="value"
//             placeholder="Escolha um mês"
//             searchPlaceholder="Pesquise..."
//             value={selectedMonth}  
//             onChange={(item) => {
//               setSelectedMonth(item.value);  
//             }}
//             renderLeftIcon={() => (
//               <FontAwesome5 style={styles.icon} name="calendar-check" color="#053F5C" size={20} />
//             )}
//             renderItem={renderItem}
//           />
          
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={years}
//             search
//             maxHeight={300}
//             labelField="label"
//             valueField="value"
//             placeholder="Escolha um ano"
//             searchPlaceholder="Pesquise..."
//             value={selectedYear}
//             onChange={(item) => {
//               setSelectedYear(item.value);
//             }}
//             renderLeftIcon={() => (
//               <FontAwesome5 style={styles.icon} name="calendar-check" color="#053F5C" size={20} />
//             )}
//             renderItem={renderItem}
//           />

//         </View>





//           <View style={{ alignItems: 'center' }}>
            
//             <PieChart
//               data={pieData2}
//               donut
//               showText
//               showValuesAsLabels
//               focusOnPress
//               radius={150} // Ajuste o valor conforme necessário
//               innerRadius={75}
//               textColor="white"
//               textSize={13}
//               fontWeight="bold"
//               textAlign="center"
//               innerCircleColor={'#FFF'}
//               labelPosition="center"
              
//               centerLabelComponent={() => {
//                 return (
//                   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    
//                     <Text style={styles.text3}>Valor total</Text>
//                     <Text
//                       style={styles.text3}>
//                       R$ {totalValorTotal}
//                     </Text>
//                   </View>
//                 );
//               }}
//             />
//           </View>
//           {renderLegendComponent()}
//         </View>
//     </ScrollView>
//   );
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   calendarContainer: {
//     padding: 20,
//   },
//   dataContainer: {
//     flex: 1,
//     marginTop: 20,
//   },
//   roundedCalendar: {
//     borderRadius: 10,
//   },

//   text7: {
//     fontSize: 20,
//     fontFamily: 'Urbanist_900Black',
//     color: '#053F5C',
//     marginLeft: 8,
//     alignSelf: 'center',
//     textAlign: 'center',
//     marginTop: 10
//   },
//   text3: {
//     fontFamily: 'Urbanist_900Black',
//     color: '#053F5C',
//     fontSize: 22,
//     textAlign: 'center'
//   },
//   text4: {
//     fontFamily: 'Urbanist_900Black',
//     color: '#053F5C',
//     fontSize: 16,
//     margin: 10,
//     textAlign: 'center'
//   },
//   botao2: {
//     width: "49%",
//     height: 44,
//     backgroundColor: '#053F5C',
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: "center",
//     alignSelf: 'center',
//     marginBottom: 20,
//     elevation: 4,
//   },

//   dropdown: {
//     margin: 16,
//     height: 50,
//     width: "45%",
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     borderColor: "#053F5C",
//     borderWidth: 2,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,

//     elevation: 2,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   item: {
//     padding: 17,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
    
//   },
//   textItem: {
//     flex: 1,
//     fontSize: 16,
//     fontFamily: 'Urbanist_900Black',
//     color: "#053F5C"

//   },
//   placeholderStyle: {
//     fontSize: 14,
//     fontFamily: 'Urbanist_900Black',
//     color: "#053F5C"

//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     fontFamily: 'Urbanist_900Black',
//     color: "#053F5C"
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import {
  configAxios,
  baseUrlServicos
} from '../util/constantes';
  import { Dropdown } from 'react-native-element-dropdown';
  import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
  import { useFocusEffect } from '@react-navigation/native';



  

export default function TelaRelatorioMensal() {
  const [servico, setServico] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState([]); // Mês atual
  const [selectedYear, setSelectedYear] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  

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
    }, [selectedMonth]) // Execute sempre que a data selecionada for alterada
  );

  // useEffect(() => {
  //   if (servico.length === 0) {
  //     axios
  //       .get(baseUrlServicos, configAxios)
  //       .then(function (response) {
  //         setServico(response.data.data);
  //         setAtualizaLista(false);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // }, [servico, atualizaLista]);

  const calcularTotais = (data) => {
    let totalDespesas = 0;
    let totalValorTotal = 0;
  
    data.forEach(item => {
      const attributes = item.attributes;
      totalDespesas += attributes.total_despesas;
      totalValorTotal += attributes.valor_total;
    });
  
    console.log('Total Despesas:', totalDespesas);
    console.log('Total Valor Total:', totalValorTotal);
  
    return { totalDespesas, totalValorTotal };
  };
  

  const filterDataByMonthAndYear = (selectedMonth, selectedYear) => {
    const filtered = servico.filter(item => {
      const date = new Date(item.attributes.dataFinalizado);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return month === selectedMonth && year === selectedYear;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterDataByMonthAndYear(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const { totalDespesas, totalValorTotal } = calcularTotais(filteredData);

  const filterDataByMonth = (selectedMonth) => {
    const filtered = servico.filter(item => {
      const month = new Date(item.attributes.dataFinalizado).getMonth() + 1;
      return month === selectedMonth;
    });
    setFilteredData(filtered);
    console.log(filtered)
  };

  // useEffect(() => {
  //   filterDataByMonth(selectedMonth);
  // }, [selectedMonth]);

  // const { totalDespesas, totalValorTotal } = calcularTotais(filteredData);

  // const pieData2 = [
  //   {
  //     value: totalValorTotal - totalDespesas,
  //     // value: 0.0,
  //     color: '#053F5C',
  //     text:("R$ " + (totalValorTotal - totalDespesas)).toString(),
  //     // text:("R$ "),
  //     focused: true,
  //   },
  //   {
  //     value: totalDespesas,
  //     // value: 0.0,
  //     color: '#F7AD19',
  //     text:("R$ " + totalDespesas).toString(),
  //     // text:("R$ "),
  //   }
  // ];

  const pieData2 = [
    {
      value: Math.max(totalValorTotal - totalDespesas, 0.1), // Ensure a minimum value of 0.1
      color: '#053F5C',
      text: `R$ ${totalValorTotal - totalDespesas}`,
    },
    {
      value: Math.max(totalDespesas, 0.1), // Ensure a minimum value of 0.1
      color: '#F7AD19',
      text: `R$ ${totalDespesas}`,
    }
  ];
  
  

  console.log(totalValorTotal - totalDespesas)
  console.log(totalDespesas)

  const months = [
  { label: 'Janeiro', value: 1 },
  { label: 'Fevereiro', value: 2 },
  { label: 'Março', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Maio', value: 5 },
  { label: 'Junho', value: 6 },
  { label: 'Julho', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Setembro', value: 9 },
  { label: 'Outubro', value: 10 },
  { label: 'Novembro', value: 11 },
  { label: 'Dezembro', value: 12 },
  ];

  

  
    // Crie o array de anos como você fez anteriormente
    const years = [
      { label: '2023', value: 2023 },
      { label: '2024', value: 2024 },
      { label: '2025', value: 2025 },
      { label: '2026', value: 2026 },
      { label: '2027', value: 2027 },
      // Adicione mais anos conforme necessário
    ];




  const renderDot = color => {
    return (
      <View
        style={{
          height: 30,
          width: 30,
          borderRadius: 10,
          backgroundColor: color,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          {renderDot('#F7AD19')}
          <Text style={styles.text4}>Total de {'\n'}Despesas: R$ {totalDespesas}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          {renderDot('#053F5C')}
          <Text style={styles.text4}>Lucro: R$ {totalValorTotal - totalDespesas}</Text>
        </View>
      </View>
    );
  };



  const [value, setValue] = useState(null);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <FontAwesome5 style={styles.icon} name="calendar-check" color="#053F5C" size={20} />
          )}
        </View>
      );
    };



  return (
    <ScrollView style={styles.container}>
        <View>
          <Text style={styles.text7}>
            Escolha um mês e um ano
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={months}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Escolha um mês"
            searchPlaceholder="Pesquise..."
            value={selectedMonth}  
            onChange={(item) => {
              setSelectedMonth(item.value);  
            }}
            renderLeftIcon={() => (
              <FontAwesome5 style={styles.icon} name="calendar-check" color="#053F5C" size={20} />
            )}
            renderItem={renderItem}
          />
          
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={years}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Escolha um ano"
            searchPlaceholder="Pesquise..."
            value={selectedYear}
            onChange={(item) => {
              setSelectedYear(item.value);
            }}
            renderLeftIcon={() => (
              <FontAwesome5 style={styles.icon} name="calendar-check" color="#053F5C" size={20} />
            )}
            renderItem={renderItem}
          />

        </View>





          <View style={{ alignItems: 'center' }}>
            
            <PieChart
              data={pieData2}
              donut
              showText
              showValuesAsLabels
              focusOnPress
              radius={150} // Ajuste o valor conforme necessário
              innerRadius={75}
              textColor="white"
              textSize={13}
              fontWeight="bold"
              textAlign="center"
              innerCircleColor={'#FFF'}
              labelPosition="center"
              
              centerLabelComponent={() => {
                return (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    
                    <Text style={styles.text3}>Valor total</Text>
                    <Text
                      style={styles.text3}>
                      R$ {totalValorTotal}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {renderLegendComponent()}
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
  },
  roundedCalendar: {
    borderRadius: 10,
  },

  text7: {
    fontSize: 20,
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    marginLeft: 8,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10
  },
  text3: {
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    fontSize: 22,
    textAlign: 'center'
  },
  text4: {
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    fontSize: 16,
    margin: 10,
    textAlign: 'center'
  },
  botao2: {
    width: "49%",
    height: 44,
    backgroundColor: '#053F5C',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
  },

  dropdown: {
    margin: 16,
    height: 50,
    width: "45%",
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderColor: "#F7AD19",
    borderWidth: 2,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Urbanist_900Black',
    color: "#053F5C"

  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Urbanist_900Black',
    color: "#053F5C"

  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Urbanist_900Black',
    color: "#053F5C"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});










// import React, { useState } from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import { PieChart } from 'react-native-gifted-charts';

// const TelaRelatorioMensal = () => {
//   const [data, setData] = useState([
//     { value: 0, color: '#053F5C', text: 'Blue' },
//     { value: 0, color: '#F7AD19', text: 'Red' },
//   ]);

//   return (
//     <ScrollView style={{ flex: 1 }}>
//       <View style={{ alignItems: 'center', marginTop: 20 }}>
//       <PieChart
//               data={data}
//               donut
//               showText
//               showValuesAsLabels
//               focusOnPress
//               radius={150} // Ajuste o valor conforme necessário
//               innerRadius={75}
//               textColor="white"
//               textSize={13}
//               fontWeight="bold"
//               textAlign="center"
//               innerCircleColor={'#FFF'}
//               labelPosition="center"
              
//               centerLabelComponent={() => {
//                 return (
//                   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    
//                     <Text >Valor total</Text>
//                     <Text
//                       >
//                       R$ 
//                     </Text>
//                   </View>
//                 );
//               }}
//             />
//       </View>
//     </ScrollView>
//   );
// };

// export default TelaRelatorioMensal;

