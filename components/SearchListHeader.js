import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useAppContextValue } from '../context/appContext';
import styles from '../styles/List.style';

const SearchListHeader = () => {
  const [{ data, query, searchQuery }, dispatch] = useAppContextValue();
  const key = searchQuery.key ? searchQuery.key : '';
  const val = searchQuery.value ? searchQuery.value : '';
  useEffect(() => {
    console.log(searchQuery);
  }, []);

  if (searchQuery !== {} && searchQuery !== null && searchQuery !== undefined) {
    return <Text style={styles.title}>{key + ' : ' + val}</Text>;
  }
};

export default SearchListHeader;
