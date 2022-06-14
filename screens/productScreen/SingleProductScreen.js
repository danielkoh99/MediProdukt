import React from 'react';
import { View, Text } from 'react-native';
function SingleProductScreeen({ navigation, route }) {
  const { productInfo } = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: productInfo.product_name });
  }, [navigation]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{productInfo.product_name}</Text>
      <Text>{productInfo.country}</Text>
      <Text>{productInfo.active_substance}</Text>
    </View>
  );
}
export default SingleProductScreeen;
