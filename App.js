import React, { useEffect, useRef } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import CustomSheet from './components/BottomSheet';
import DynamicFilter from './components/DynamicFilter';
import countryData from './data/eea-member-countries.json';
import CustomBottomTabs from './navigation/CustomBottomTabs';
import { useAppContextValue } from './context/appContext';
import { useUser } from '@realm/react';
import { queryData } from './db/db';
import SearchScreenStack from './navigation/StackNavigator';

const App = () => {
  const user = useUser();
  const client = user.mongoClient('mongodb-atlas');
  const bottomSheetRef = useRef(null);
  const [{ data, query, searchQuery }, dispatch] = useAppContextValue();
  const openSheet = index => {
    bottomSheetRef.current.snapToIndex(index);
  };

  useEffect(() => {
    const queryResult = queryData(client, { country: 'Hungary' });
    queryResult.then(s => {
      dispatch({
        type: 'set_query_res',
        data: s,
        filteredData: s,
        searchQuery: s,
      });
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <SearchScreenStack openSheet={openSheet} />
      <CustomSheet ref={bottomSheetRef}>
        <BottomSheetView style={styles.bottomSheetView}>
          <DynamicFilter
            keyName={'country'}
            dataItems={countryData}
            multi={false}
            searchable={true}
            maxHeight={400}
            disableLocalSearch={false}
            styles={{
              marginBottom: 10,
            }}
            containerStyles={{
              marginBottom: 10,
              zIndex: 999,
            }}
          />
          {/* <DynamicFilter
            keyName={'active_substance'}
            searchPlaceholder={'Search for substance'}
            dataItems={[]}
            multi={true}
            mode={'BADGE'}
            disableLocalSearch={true}
            maxHeight={400}
            min={1}
            max={4}
            searchable={true}
            styles={{ marginBottom: 10 }}
            containerStyles={{ marginBottom: 10, zIndex: 1 }}
          /> */}
        </BottomSheetView>
      </CustomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default App;
