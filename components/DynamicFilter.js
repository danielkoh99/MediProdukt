import { useUser } from '@realm/react';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAppContextValue } from '../context/appContext';
import { queryData } from '../db/db';
import { storeData } from '../storage/asyncStorage';
const DynamicFilter = ({
  dataItems,
  searchable,
  multi,
  mode,
  min,
  max,
  styles,
  maxHeight,
  containerStyles,
  disableLocalSearch,
  searchPlaceholder,
  keyName,
}) => {
  const [open, setOpen] = useState(false);
  const [multiValues, setMultiValues] = useState([]);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(dataItems);
  const user = useUser();
  const client = user.mongoClient('mongodb-atlas');
  const [{ data, query, searchQuery }, dispatch] = useAppContextValue();

  const onSelectItem = item => {
    storeData(item.value, keyName);
    const searchFilter = [
      // {
      //   $search: {
      //     autocomplete: { query: 'metam', path: 'active_substance' },
      //   },
      // },
      // { $match:
      { country: item },
      // },
    ];
    const queryResult = queryData(client, { country: item.value });
    queryResult.then(s => {
      dispatch({
        type: 'set_query_res',
        data: s,
        filteredData: s,
        searchQuery: {
          value: item.value,
          key: keyName,
        },
      });
    });
  };
  return (
    <DropDownPicker
      modalProps={{ animationType: 'slide' }}
      containerStyle={containerStyles}
      style={styles}
      mode={mode}
      searchPlaceholder={searchPlaceholder ? searchPlaceholder : ''}
      maxHeight={maxHeight}
      closeAfterSelecting={true}
      itemSeparator={true}
      onSelectItem={onSelectItem}
      open={open}
      searchTextInputProps={{
        maxLength: 20,
      }}
      disableLocalSearch={disableLocalSearch}
      searchable={searchable}
      value={multi ? multiValues : value}
      items={items}
      setOpen={setOpen}
      setValue={multi ? setMultiValues : setValue}
      setItems={setItems}
      multiple={multi}
      {...(multi && { min: min, max: max })}
    />
  );
};
export default DynamicFilter;
