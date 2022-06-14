import { Alert } from 'react-native';
const createAlert = (title = '', message = '', items = []) => {
  Alert.alert(title, message, items);
};

export default createAlert;
