export const chapter01 = {
  id: 1,
  titleDe: "German Basics",
  titleBn: "জার্মান ভাষার ভিত্তি",
  description: "বর্ণমালা, উচ্চারণ ও মৌলিক সম্ভাষণ (Formal vs Informal)",
  overview: {
    goals: [
      "জার্মান বর্ণমালা এবং বিশেষ অক্ষরগুলো (Ä, Ö, Ü, ß) শেখা",
      "আনুষ্ঠানিক (Formal) এবং অনানুষ্ঠানিক (Informal) সম্ভাষণ বুঝতে পারা",
      "নিজের প্রথম সম্ভাষণ ও বিদায় জানানোর বাক্য তৈরি করা"
    ],
    summary: "এই অধ্যায়ে আপনি জার্মান ভাষার মূল ভিত্তি শিখবেন। কীভাবে কাউকে অভিবাদন জানাতে হয় এবং নিজের নাম বলতে হয় তা সহজ বাংলায় আলোচনা করা হয়েছে।"
  },
  vocabulary: [
    { de: "Hallo", bn: "হ্যালো / ওহে", example: "Hallo! Wie geht's?" },
    { de: "Guten Morgen", bn: "শুভ সকাল", example: "Guten Morgen, Herr Müller!" },
    { de: "Guten Tag", bn: "শুভ দিন / নমস্কার / সালাম", example: "Guten Tag! Wie heißen Sie?" },
    { de: "Guten Abend", bn: "শুভ সন্ধ্যা", example: "Guten Abend zusammen!" },
    { de: "Gute Nacht", bn: "শুভ রাত্রি", example: "Gute Nacht, schlaf gut!" },
    { de: "Auf Wiedersehen", bn: "আবার দেখা হবে (Formal)", example: "Auf Wiedersehen, bis morgen!" },
    { de: "Tschüss", bn: "বাই / বিদায় (Informal)", example: "Tschüss, bis später!" },
    { de: "Bitte", bn: "দয়া করে / আপনাকে স্বাগতম", example: "Ein Kaffee, bitte." },
    { de: "Danke", bn: "ধন্যবাদ", example: "Danke schön!" },
    { de: "Ja", bn: "হ্যাঁ", example: "Ja, ich verstehe." },
    { de: "Nein", bn: "না", example: "Nein, danke." }
  ],
  grammar: [
    {
      title: "জার্মান বিশেষ বর্ণ (Special Characters)",
      explanation: "জার্মান ভাষায় সাধারণ ল্যাটিন বর্ণমালার পাশাপাশি ৪টি বিশেষ বর্ণ রয়েছে: Ä (ä), Ö (ö), Ü (ü) এবং ß (Eszett / scharfes S)।",
      examples: [
        { de: "Mädchen (ä - উচ্চারণ 'এ' এর মতো)", bn: "মেয়ে" },
        { de: "Schön (ö - ঠোঁট গোল করে 'এ')", bn: "সুন্দর" },
        { de: "Über (ü - ঠোঁট গোল করে 'ই')", bn: "উপরে / সম্পর্কে" },
        { de: "Straße (ß - ডাবল 'ss' এর উচ্চারণ)", bn: "রাস্তা" }
      ]
    },
    {
      title: "Formal vs Informal Greetings",
      explanation: "জার্মান সংস্কৃতিতে অপরিচিত ব্যক্তি বা সম্মানিত ব্যক্তিদের সাথে 'Sie' (আপনি) এবং বন্ধু বা পরিবারের সাথে 'du' (তুমি) ব্যবহার করা হয়।",
      examples: [
        { de: "Wie heißen Sie? (Formal)", bn: "আপনার নাম কী?" },
        { de: "Wie heißt du? (Informal)", bn: "তোমার নাম কী?" }
      ]
    }
  ],
  dialogues: [
    {
      speaker: "A",
      de: "Guten Tag! Wie heißen Sie?",
      bn: "শুভ দিন! আপনার নাম কী?"
    },
    {
      speaker: "B",
      de: "Guten Tag! Ich heiße Rahat. Und Sie?",
      bn: "শুভ দিন! আমার নাম রাহাত। আর আপনার?"
    },
    {
      speaker: "A",
      de: "Ich heiße Anna. Freut mich!",
      bn: "আমার নাম আনা। আপনার সাথে পরিচয় হয়ে ভালো লাগলো!"
    },
    {
      speaker: "B",
      de: "Freut mich auch. Auf Wiedersehen!",
      bn: "আমারও ভালো লাগলো। আবার দেখা হবে!"
    }
  ],
  exercises: [
    {
      id: "ex1_1",
      type: "multiple_choice",
      question: "'Guten Morgen' এর সঠিক বাংলা অর্থ কোনটি?",
      options: ["শুভ দুপুর", "শুভ সকাল", "শুভ সন্ধ্যা", "শুভ রাত্রি"],
      correctAnswer: 1
    },
    {
      id: "ex1_2",
      type: "multiple_choice",
      question: "বন্ধু বা পরিচিতদের বিদায় জানাতে কোনটি ব্যবহার করা হয়?",
      options: ["Auf Wiedersehen", "Guten Tag", "Tschüss", "Bitte"],
      correctAnswer: 2
    },
    {
      id: "ex1_3",
      type: "fill_blank",
      question: "Guten ______ ! (শুভ দিন)",
      options: ["Morgen", "Tag", "Nacht", "Abend"],
      correctAnswer: 1
    }
  ]
};
