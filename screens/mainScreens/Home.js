import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DyamicList from '../../components/DynamicList';
import { Dimensions } from 'react-native';
import { getData, removeValue } from '../../storage/asyncStorage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function HomeScreen() {
  const [queries, setQueries] = useState([]);
  useFocusEffect(
    useCallback(() => {
      // removeValue('country');
      const fetchPrevQueries = async () => {
        const prevQueries = await getData('country');
        setQueries(prevQueries);
      };
      fetchPrevQueries();
    }, []),
  );

  const ItemRender = ({ keyName, value }) => (
    <View style={styleSheet.item}>
      <Text style={styleSheet.itemText}>{keyName.toUpperCase()}</Text>
      <Text style={styleSheet.itemText}>{value}</Text>
    </View>
  );

  return (
    <View style={styleSheet.MainContainer}>
      <ScrollView>
        <Text style={styleSheet.titleText}>Previous Searches</Text>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={queries}
          renderItem={({ item }) => (
            <ItemRender
              key={item.value + Math.floor(Math.random() * 1000)}
              keyName={item.keyName}
              value={item.value}
            />
          )}
          keyExtractor={item => item.value + Math.floor(Math.random() * 1000)}
          snapToAlignment={'center'}
          horizontal={true}
        />
      </ScrollView>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },

  item: {
    padding: 8,
    backgroundColor: 'grey',
    width: windowWidth / 2,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});
