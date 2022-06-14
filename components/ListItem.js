import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginHorizontal: 10,
  },
  product: {
    flex: 2,
    marginHorizontal: 10,
  },
  country: {
    marginHorizontal: 10,
    justifyContent: 'flex-end',
  },
});

const ProductItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {product.product_name}
        </Text>
        <Text numberOfLines={1} style={styles.product}>
          {product.active_substance}
        </Text>
        <Text style={styles.country}>{product.country}</Text>
      </View>
    </View>
  );
};

export default memo(ProductItem);
