import * as React from 'react';
import { View } from 'react-native';
import DyamicList from '../../components/DynamicList';

export default function SearchScreen({ navigation }) {
  return (
    <View>
      <DyamicList navigation={navigation} />
    </View>
  );
}
