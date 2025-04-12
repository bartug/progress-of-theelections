import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import episodesData from '../../public/data/episodesData.json';
import { Chapter } from '../types'; 

// Kullanıcı dilini kontrol etme fonksiyonu
export function checkLanguage(userData:any) {
  const lang = userData.userLanguage.toLowerCase();
  return lang === 'en' || lang === 'tr' ? lang : 'en';
}

// Mevcut bölümü kontrol etme
export function checkChapter(userData: any): Chapter | null {
  const currentChapter = episodesData.find(ch => ch.chapterId === userData.currentChapterId);
  return currentChapter || null;
}


// Kullanıcı verilerini güncelleme fonksiyonu
export async function updateUserData(userId:any, nextChapterId:any) {
  const waitTime = generateRandomWaitTime(nextChapterId);
  const nextAvailableTime = new Date(Date.now() + waitTime * 60000);

  try {
    await firestore()
      .collection('userlist')
      .doc(userId)
      .update({
        currentChapterId: nextChapterId,
        nextAvailableTime: nextAvailableTime.toISOString(),
      });
    console.log('Veriler güncellendi');
  } catch (error) {
    console.error('Veriler güncellenemedi:', error);
  }
}

// Rastgele bekleme süresi oluşturma
export function generateRandomWaitTime(chapterId:any) {
  if (chapterId < 5) {
    return 0;
  } else if (chapterId >= 5 && chapterId < 15) {
    return Math.floor(Math.random() * 10) + 1;
  } else if (chapterId >= 15 && chapterId < 30) {
    return Math.floor(Math.random() * 21) + 10;
  } else {
    return Math.floor(Math.random() * 31) + 30;
  }
}

// Kullanıcı verisini alma fonksiyonu
export async function getUserData(userId:any) {
  try {
    const userDoc = await firestore()
      .collection('userlist')
      .doc(userId)
      .get();
    return userDoc.exists ? userDoc.data() : null;
  } catch (err) {
    console.error('Veri okunamadı:', err);
    return null;
  }
}
export async function createUserData(userId:any, userData:any) {
  try {
    await firestore().collection('userlist').doc(userId).set(userData);
    console.log('Kullanıcı verileri oluşturuldu!');
  } catch (error) {
    console.error('Veri oluşturma hatası:', error);
  }
}
// Kullanıcıyı ve bölümü kontrol etme fonksiyonu
export const checkUser = async (navigation:any) => {
  const currentUser = auth().currentUser;

  if (currentUser) {
    const userData = await getUserData(currentUser.uid);

    if (userData) {
      const nextAvailableTime = userData.nextAvailableTime;
      const currentTime = new Date().getTime();

      if (currentTime < new Date(nextAvailableTime).getTime()) {
        navigation.replace('WaitingScreen');
      } else {
        navigation.replace('EpisodeScreen');
      }
    } else {
      console.error('Kullanıcı verisi bulunamadı.');
      const initialUserData = {
        userId: currentUser.uid,
        userNickName: 'Yeni Oyuncu', 
        usermail: currentUser.email || '',
        userLanguage: 'tr',
        currentChapterId: 1,
        progress: [],
        nextAvailableTime: new Date().toISOString(),
      };
      await createUserData(currentUser.uid, initialUserData);
            navigation.replace('EpisodeScreen');
    }
  } else {
    navigation.replace('LoginScreen');
  }

  
};
