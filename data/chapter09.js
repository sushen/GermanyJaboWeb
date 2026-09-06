export const chapter09 = {
  id: 9,
  titleDe: "Time, Dates & Appointments",
  titleBn: "সময়, তারিখ ও অ্যাপয়েন্টমেন্ট / Zeit, Datum & Termine",
  description: "ঘড়ির সময়, বারের নাম, তারিখ এবং অ্যাপয়েন্টমেন্ট ঠিক করা",
  overview: {
    goals: [
      "ঘড়ির সময় বলা ও জানা (Wie spät ist es?)",
      "সপ্তাহের বার এবং মাসের নাম জানা",
      "অ্যাপয়েন্টমেন্ট বা মিটিং ঠিক করা (um, am, von...bis)"
    ],
    summary: "জার্মানিতে সময়ানুবর্তিতা খুবই গুরুত্বপূর্ণ। সময় বলা, তারিখ বোঝা এবং অ্যাপয়েন্টমেন্ট নেওয়া এই অধ্যায়ে আলোচনা করা হয়েছে।"
  },
  vocabulary: [
    { de: "die Uhrzeit", bn: "ঘড়ির সময়", example: "Wie spät ist es?" },
    { de: "der Tag", bn: "দিন", example: "Guten Tag!" },
    { de: "Montag", bn: "সোমবার", example: "Am Montag arbeite ich." },
    { de: "Dienstag", bn: "মঙ্গলবার", example: "Am Dienstag habe ich Zeit." },
    { de: "Mittwoch", bn: "বুধবার", example: "Mittwoch ist Mitte der Woche." },
    { de: "Donnerstag", bn: "বৃহস্পতিবার", example: "Donnerstagabend." },
    { de: "Freitag", bn: "শুক্রবার", example: "Freitag kommt das Wochenende." },
    { de: "Samstag", bn: "শনিবার", example: "Am Samstag kaufe ich ein." },
    { de: "Sonntag", bn: "রবিবার", example: "Sonntag ist Ruhetag." },
    { de: "der Termin", bn: "অ্যাপয়েন্টমেন্ট / সাক্ষাতের সময়", example: "Ich habe einen Termin beim Arzt." }
  ],
  grammar: [
    {
      title: "Prepositions for Time: um vs am",
      explanation: "নির্দিষ্ট ঘড়ির সময়ের পূর্বে 'um' (যেমন: um 8 Uhr) এবং নির্দিষ্ট দিন বা বারের পূর্বে 'am' (যেমন: am Montag) বসে।",
      examples: [
        { de: "Der Kurs beginnt um 9 Uhr.", bn: "কোর্সটি সকাল ৯টায় শুরু হবে।" },
        { de: "Am Freitag habe ich frei.", bn: "শুক্রবারে আমার ছুটি রয়েছে।" }
      ]
    }
  ],
  dialogues: [
    {
      speaker: "A",
      de: "Wie spät ist es?",
      bn: "এখন কয়টা বাজে?"
    },
    {
      speaker: "B",
      de: "Es ist genau zehn Uhr.",
      bn: "এখন ঠিক ১০টা বাজে।"
    },
    {
      speaker: "A",
      de: "Haben Sie am Montag einen Termin frei?",
      bn: "আপনার কি সোমবারে কোনো অ্যাপয়েন্টমেন্ট খালি আছে?"
    }
  ],
  exercises: [
    {
      id: "ex9_1",
      type: "multiple_choice",
      question: "ঘড়ির সময় 'সকাল ৮টায়' বলতে কোনটি সঠিক?",
      options: ["am 8 Uhr", "um 8 Uhr", "in 8 Uhr", "von 8 Uhr"],
      correctAnswer: 1
    }
  ]
};
