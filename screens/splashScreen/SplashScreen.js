import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

function SplashScreen() {
  return (
    <LottieView
      style={{ flex: 1, justifyContent: 'center' }}
      source={require('../animation.json')}
      autoPlay
      loop={false}
    />
  );
}
export default SplashScreen;
