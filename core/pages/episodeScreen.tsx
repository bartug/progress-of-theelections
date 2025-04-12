import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { checkUser, updateUserData, checkChapter, checkLanguage, getUserData } from '../services/dataService';
import auth from '@react-native-firebase/auth';
import { Chapter, Choice } from '../types';

type NavigationProps = StackNavigationProp<RootStackParamList>;

const EpisodeScreen = () => {
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [lang, setLang] = useState<'en' | 'tr'>('tr');
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userData = await getUserData(currentUser.uid);
        if (userData) {
          setLang(checkLanguage(userData));
          const chapter = checkChapter(userData);
          setCurrentChapter(chapter);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChoicePress = async (choice: Choice) => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      await updateUserData(currentUser.uid, choice.nextChapterId);
      checkUser(navigation);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require(`../../public/images/episode.png`)} style={styles.backgroundImage} />
      <Text style={styles.title}>
        {currentChapter ? currentChapter.title[lang] : 'Bölüm bulunamadı!'}
      </Text>
      <Text style={styles.storyText}>
        {currentChapter ? currentChapter.storyText[lang] : ''}
      </Text>

      {currentChapter && currentChapter.choices.map((choice, index) => (
        <Button key={index} title={choice.choiceText[lang]} onPress={() => handleChoicePress(choice)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.7,
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    zIndex: 1,
  },
  storyText: {
    fontSize: 18,
    marginBottom: 20,
    zIndex: 1,
  },
});

export default EpisodeScreen;
