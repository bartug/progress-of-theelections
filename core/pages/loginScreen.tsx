import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '162926689229-k7c9ufavj6rrc4am9kfm1tn44p4098k9.apps.googleusercontent.com', 
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const userData = userInfo.data;
console.log(userData)
      if (!userData) {
        throw new Error("Google idToken alınamadı.");
      }

      const googleCredential = auth.GoogleAuthProvider.credential(userData.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      const userId = userCredential.user.uid;
      console.log('Google ile oturum açıldı! Kullanıcı ID:', userId);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Kullanıcı oturum açmayı iptal etti
        console.log('Oturum açma iptal edildi');
      } else {
        console.error('Google oturum açma hatası:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Google ile Giriş Yap" onPress={onGoogleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default LoginScreen;
