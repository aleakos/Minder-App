import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './app/routes/homeStack';

const getFonts = () =>
  Font.loadAsync({
    'nunito-regular': require('./app/assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./app/assets/fonts/Nunito-Bold.ttf'),
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (fontLoaded) {
    return Navigator();
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontLoaded(true)} />
    );
  }
}
