import episodesData from '../../public/data/episodesData.json';
import userData from '../../public/data/userData.json';

// Kullanıcı dilini kontrol etme fonksiyonu
export function checkLanguage(userData: any): 'en' | 'tr' {
  type LanguageKeys = 'en' | 'tr';
  const lang: LanguageKeys = userData.userLanguage.toLowerCase() as LanguageKeys;
  return lang;
}

// Mevcut bölümü kontrol etme
export function checkChapter(userData: any) {
  const currentChapter = episodesData.find(ch => ch.chapterId === userData.currentChapterId);
  return currentChapter;
}

// Kullanıcı verilerini güncelleme fonksiyonu
export async function updateUserData(userId: string, nextChapterId: number) {
  const waitTime = generateRandomWaitTime(nextChapterId);
  const nextAvailableTime = new Date(Date.now() + waitTime * 60000);

  // Veriyi al
  const updatedUserData = userData;
  console.log(updatedUserData, userId)
  // Kullanıcıyı bul ve güncelle  
  const userIndex = updatedUserData.findIndex((user: any) => user.userId === userId);

  if (userIndex !== -1) {
    updatedUserData[userIndex] = {
      ...updatedUserData[userIndex],
      currentChapterId: nextChapterId,
      nextAvailableTime: nextAvailableTime.toISOString()
    };

    // Burada güncellenmiş veriyi kaydedebilirsiniz (örneğin local storage veya başka bir API ile)
    console.log("Veriler güncellendi", updatedUserData);
  } else {
    console.log('Kullanıcı bulunamadı!');
  }
}

// Rastgele bekleme süresi oluşturma
export function generateRandomWaitTime(chapterId: number): number {
  if (chapterId < 5) {
    return 0;
  } else if (chapterId >= 5 && chapterId < 15) {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  } else if (chapterId >= 15 && chapterId < 30) {
    return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  } else {
    return Math.floor(Math.random() * (60 - 30 + 1)) + 30;
  }
}

// Kullanıcı verisini alma fonksiyonu
export async function getUserData() {
  try {
    // Eğer dosya veya API'den veri çekiyorsanız burada çağrı yapabilirsiniz.
    return userData; // Şu an için JSON dosyasından veri çekiyoruz.
  } catch (err) {
    console.error('Veri okunamadı:', err);
    return [];
  }
}

// Kullanıcıyı ve bölümü kontrol etme fonksiyonu
export const checkUser = async (navigation: any) => {
  const currentUser = await getUserData();
  
  if (currentUser && currentUser.length > 0) {
    const nextAvailableTime = currentUser[0].nextAvailableTime;
    const currentTime = new Date().getTime();

    if (currentTime < new Date(nextAvailableTime).getTime()) {
      navigation.replace('WaitingScreen');
    } else {
      navigation.replace('EpisodeScreen');
    }
  } else {
    console.error('Kullanıcı verisi boş döndü.');
  }
};
