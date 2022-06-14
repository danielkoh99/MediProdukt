import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native';
import ListItem from './ListItem';
import styles from '../styles/List.style';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useUser, useApp } from '@realm/react';
import SearchBar from 'react-native-dynamic-search-bar';
import { queryData } from '../db/db';
import { useAppContextValue } from '../context/appContext';
import SearchListHeader from './SearchListHeader';
const DyamicList = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [queryRes, setQueryRes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const mountedRef = useRef(true);

  const app = useApp();
  const user = useUser();
  const client = user.mongoClient('mongodb-atlas');
  const [{ data, query, searchQuery, filteredData }, dispatch] =
    useAppContextValue();

  // const products = client.db('mediproduct').collection('productsData');

  const requestAPI = useCallback(async () => {
    // get most frequent item in array of objects

    // const data = queryData(client, [
    //   {
    //     $search: {
    //       autocomplete: { query: 'metam', path: 'active_substance' },
    //     },
    //   },
    //   { $match: { country: 'Hungary' } },
    // ]);
    // const data = queryData(client, {
    //   country: 'Hungary',
    // });
    // console.log(data);
    if (!mountedRef.current) return null;
    // data.then(s => {
    setTimeout(() => {
      setLoading(false);
      setQueryRes(data);
      setFiltered(data);
    }, 1000);
    // });
  }, [mountedRef]);

  useEffect(() => {
    // requestAPI();
    // return () => {
    //   mountedRef.current = false;
    // };
    setTimeout(() => {
      setLoading(false);
      // setQueryRes(data);
    }, 1000);
  }, []);
  // }, [page, queryRes]);

  const fetchMoreData = () => {
    // if (!newsModel.isListEnd && !newsModel.moreLoading) {
    setPage(page + 1);
    // }
  };
  const searchHandler = query => {
    const formattedQuery = query.toLowerCase();
    // const filteredd = filtered.filter(data => {
    //   const itemData = `${data.country.toLowerCase()}
    //   ${data.product_name.toLowerCase()} ${data.active_substance.toLowerCase()}`;
    //   return itemData.indexOf(formattedQuery) > -1;

    // });
    dispatch({
      type: 'filter_query',
      query: query,
    });
    // setQueryRes(filteredData);
    setSearch(formattedQuery);
  };
  const clearFilter = () => {
    dispatch({
      type: 'clear_filter',
    });
    setSearch('');
    Keyboard.dismiss();
  };
  const requestAllData = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    setSearch('');
    mountedRef.current = true;
    requestAPI();
  };

  const renderFooter = () => (
    <View style={styles.footerText}>
      {/* {newsModel.moreLoading && <ActivityIndicator />}
      {newsModel.isListEnd && <Text>No more articles at the moment</Text>} */}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
      <Button onPress={requestAllData} title="Refresh" />
    </View>
  );

  return (
    <View style={{ height: windowHeight * 0.75, paddingBottom: 45 }}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <SearchBar
            style={styles.searchbar}
            textInputStyle={styles.textInputStyle}
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            shadowColor="#282828"
            cancelIconColor="#c6c6c6"
            placeholder="Search..."
            onChangeText={text => searchHandler(text)}
            value={search}
            onClearPress={clearFilter}
          />
          <FlatList
            // onRefresh={requestAllData}
            // refreshing={loading}
            removeClippedSubviews
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            contentContainerStyle={{ flexGrow: 1 }}
            data={filteredData !== null ? filteredData : data}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('Single', { productInfo: item })
                }>
                <ListItem product={item} />
              </Pressable>
            )}
            ListHeaderComponent={SearchListHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        </View>
      )}
    </View>
  );
};

export default DyamicList;
