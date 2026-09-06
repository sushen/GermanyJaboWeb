export const chapter03 = {
  id: 3,
  titleDe: "Personal Introduction",
  titleBn: "নিজের পরিচয় / Sich vorstellen",
  description: "নিজের পরিচয় প্রদান, নাম, বয়স, দেশ ও ভাষা বলা",
  overview: {
    goals: [
      "নিজের নাম, দেশ এবং বসবাসের স্থান বলা",
      "অন্যকে তার পরিচয় জিজ্ঞাসা করা",
      "মৌলিক ক্রিয়াপদ sein (হওয়া) এবং kommen (আসা) এর ব্যবহার"
    ],
    summary: "কারো সাথে প্রথম সাক্ষাতে নিজের পরিচয় কীভাবে দিতে হয় তা এই অধ্যায়ে বিস্তারিত শেখানো হয়েছে।"
  },
  vocabulary: [
    { de: "Ich", bn: "আমি", example: "Ich bin Studenten." },
    { de: "Du", bn: "তুমি", example: "Du bist nett." },
    { de: "Sie", bn: "আপনি / আপনারা", example: "Sie kommen aus Deutschland." },
    { de: "Name", bn: "নাম", example: "Mein Name ist Hasan." },
    { de: "Land", bn: "দেশ", example: "Aus welchem Land kommen Sie?" },
    { de: "Wohnort", bn: "বসবাসের স্থান", example: "Mein Wohnort ist Berlin." },
    { de: "Sprache", bn: "ভাষা", example: "Ich spreche Deutsch." },
    { de: "Bangladesch", bn: "বাংলাদেশ", example: "Ich komme aus Bangladesch." },
    { de: "Deutschland", bn: "জার্মানি", example: "Er wohnt in Deutschland." }
  ],
  grammar: [
    {
      title: "Verb Conjugation: heißen, kommen, wohnen",
      explanation: "জার্মান ভাষায় ক্রিয়াপদের রূপ কর্তা (Subject) অনুযায়ী পরিবর্তিত হয়। সাধারণত মূল ক্রিয়ার শেষে -en বাদ দিয়ে প্রত্যয় যুক্ত হয় (Ich -> -e, Du -> -st, Sie -> -en)।",
      examples: [
        { de: "Ich komme aus Bangladesch.", bn: "আমি বাংলাদেশ থেকে এসেছি।" },
        { de: "Wo wohnst du?", bn: "তুমি কোথায় থাকো?" },
        { de: "Wie heißen Sie?", bn: "আপনার নাম কী?" }
      ]
    }
  ],
  dialogues: [
    {
      speaker: "A",
      de: "Hallo! Ich heiße Karim. Woher kommst du?",
      bn: "হ্যালো! আমার নাম করিম। তুমি কোথা থেকে এসেছ?"
    },
    {
      speaker: "B",
      de: "Hallo Karim! Ich komme aus Bangladesch. Und wo wohnst du?",
      bn: "হ্যালো করিম! আমি বাংলাদেশ থেকে এসেছি। আর তুমি কোথায় থাকো?"
    },
    {
      speaker: "A",
      de: "Ich wohne in Frankfurt. Welche Sprachen sprichst du?",
      bn: "আমি ফ্রাঙ্কফুর্টে থাকি। তুমি কোন কোন ভাষায় কথা বলো?"
    },
    {
      speaker: "B",
      de: "Ich spreche Bengali, Englisch und ein bisschen Deutsch.",
      bn: "আমি বাংলা, ইংরেজি এবং অল্প জার্মান বলি।"
    }
  ],
  exercises: [
    {
      id: "ex3_1",
      type: "multiple_choice",
      question: "'Ich ______ aus Bangladesch.' শূন্যস্থানে সঠিক ক্রিয়াপদ কোনটি?",
      options: ["komme", "kommst", "kommen", "kommt"],
      correctAnswer: 0
    },
    {
      id: "ex3_2",
      type: "fill_blank",
      question: "Wo ______ du? (তুমি কোথায় থাকো?)",
      options: ["wohne", "wohnst", "wohnen", "wohnt"],
      correctAnswer: 1
    }
  ]
};
