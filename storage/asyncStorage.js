import AsyncStorage from '@react-native-async-storage/async-storage';
async function storeSingleData(value, key) {
  await AsyncStorage.setItem(key, value);
}
async function getSingleData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : null;
  } catch (e) {
    // error reading value
  }
}
async function storeData(value, key) {
  try {
    const storedData = await getData(key);
    if (storedData !== null) {
      storedData.push({
        keyName: key,
        value: value,
      });
      const jsonValue = JSON.stringify(storedData);

      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(
        key,
        JSON.stringify([
          {
            keyName: key,
            value: value,
          },
        ]),
      );
    }
  } catch (e) {
    // saving error
    console.log(e);
  }
}

async function getData(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}
async function removeValue(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
}

export { storeData, getData, removeValue, storeSingleData, getSingleData };
