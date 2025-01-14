import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';

import results from '../components/Resultados';
import ComponenteP from '../components/ComponenteP';

export default function Proximos() {
  const renderItem = ({ item }) => <Text>{item.title}</Text>;
  const renderEmptyItem = () => <View style={styles.emptyItem} />;

  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(results);

  useEffect(() => {
    if (searchText === '') {
      setList(results);
    } else {
      setList(
        results.filter(
          (item) =>
            item.cliente.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            item.aparelho.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Busque aqui o cliente ou aparelho"
            placeholderTextColor={'#fff'}
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
          />
        </View>

        <View style={styles.wrapper}>
          <FlatList
            style={styles.flat}
            data={list}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ComponenteP
                data={item}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            )}
            ListFooterComponent={renderEmptyItem}
          />
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
  input: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#fff',
    marginHorizontal: 20,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff',
    marginBottom: '8%',
    marginTop: '12%',
    // marginTop: 20
  },
  emptyItem: {
    height: 300, // Ajuste a altura conforme necessário para empurrar os itens visíveis para cima
  },
  content: {
    backgroundColor: '#053F5C',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
