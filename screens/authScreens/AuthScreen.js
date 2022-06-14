import * as React from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { logIn, signUp } from '../../db/db';
import { showMessage } from 'react-native-flash-message';

const AuthScreen = ({ title, keyName }) => {
  const [msg, setMsg] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userPass, setUserPass] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const signUpAndLogin = () => {
    signUp(userEmail, userPass);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const user = logIn(userEmail, userPass);
      checkUser(user);
    }, 2000);
  };
  const checkUser = user => {
    user.then(user => {
      setMsg(user.message);
      console.log(user.message);
    });

    setTimeout(() => {
      showMessage({
        message: msg !== '' ? msg : 'Loggin in...',
        type: msg === '' ? 'success' : 'warning',
      });
    }, 1000);
  };

  const loginUser = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const user = logIn(userEmail, userPass);
      checkUser(user);
    }, 2000);
  };
  return (
    <KeyboardAvoidingView
      style={styles.centerView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View>
              <Text style={styles.title}>Email</Text>
              <TextInput
                returnKeyLabel="Done"
                style={styles.input}
                onChangeText={email => setUserEmail(email)}
                textContentType="emailAddress"
                placeholder="example@email.com"
              />
              <Text style={styles.title}>Password</Text>

              <TextInput
                returnKeyLabel="Done"
                style={styles.input}
                onChangeText={pass => setUserPass(pass)}
                secureTextEntry={true}
                placeholder="password"
                textContentType={
                  keyName === 'login' ? 'password' : 'newPassword'
                }
              />
              <Button
                title={title}
                style={{ width: 50 + '%' }}
                onPress={() => {
                  if (keyName === 'signup') {
                    signUpAndLogin();
                  } else {
                    loginUser();
                  }
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: '400',
  },
});
export default AuthScreen;
