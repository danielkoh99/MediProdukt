import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ActionSheetIOS,
  useColorScheme,
  View,
} from 'react-native';
import CustomSearch from './components/Search';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{}}>
          <CustomSearch
            // onChangeQuery={onChangeSearch}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
          <Text style={{color: 'white'}}>{searchQuery}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
