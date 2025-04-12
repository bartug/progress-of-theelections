export interface Choice {
    choiceText: {
      en: string;
      tr: string;
    };
    nextChapterId: number;
  }
  
  export interface Chapter {
    chapterId: number;
    title: {
      en: string;
      tr: string;
    };
    storyText: {
      en: string;
      tr: string;
    };
    choices: Choice[];
  }
  