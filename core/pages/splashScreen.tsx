import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { checkUser } from '../services/dataService';

type NavigationProps = StackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const timer = setTimeout(() => {
      checkUser(navigation);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={require('../../public/images/splashScreen.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export default SplashScreen;
