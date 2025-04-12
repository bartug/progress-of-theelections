import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getUserData } from '../services/dataService';

const WaitingScreen = () => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchRemainingTime = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userData = await getUserData(currentUser.uid);
        if (userData) {
          const nextAvailableTime = new Date(userData.nextAvailableTime).getTime();
          const currentTime = new Date().getTime();
          const diff = nextAvailableTime - currentTime;
          setRemainingTime(Math.max(diff, 0));
        }
      }
    };

    fetchRemainingTime();

    const interval = setInterval(() => {
      fetchRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds:any) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} dakika ${seconds} saniye`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {remainingTime !== null ? `Bekleme süreniz devam ediyor: ${formatTime(remainingTime)}` : 'Yükleniyor...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
  },
});

export default WaitingScreen;
