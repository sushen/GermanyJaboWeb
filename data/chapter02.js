export const chapter02 = {
  id: 2,
  titleDe: "Numbers",
  titleBn: "সংখ্যা",
  description: "জার্মান সংখ্যা (০ থেকে ২০ ও ১০০ পর্যন্ত) এবং গণনা",
  overview: {
    goals: [
      "০ থেকে ২০ পর্যন্ত জার্মান সংখ্যা বলা ও লেখা",
      "ফোন নম্বর ও বয়স সংক্রান্ত সংখ্যা বুঝতে পারা",
      "জার্মান গণনার মৌলিক নিয়ম জানা"
    ],
    summary: "সংখ্যা জানা যেকোনো ভাষা শেখার গুরুত্বপূর্ণ ধাপ। এই পাঠে আমরা জার্মান সংখ্যা এবং ফোন নম্বর বলার নিয়ম শিখব।"
  },
  vocabulary: [
    { de: "null", bn: "০ (শূন্য)", example: "Null Grad" },
    { de: "eins", bn: "১ (এক)", example: "Eins, zwei, drei" },
    { de: "zwei", bn: "২ (দুই)", example: "Zwei Katzen" },
    { de: "drei", bn: "৩ (তিন)", example: "Drei Tage" },
    { de: "vier", bn: "৪ (চার)", example: "Vier Autos" },
    { de: "fünf", bn: "৫ (পাঁচ)", example: "Fünf Minuten" },
    { de: "sechs", bn: "৬ (ছয়)", example: "Sechs Monate" },
    { de: "sieben", bn: "৭ (সাত)", example: "Sieben Tage" },
    { de: "acht", bn: "৮ (আট)", example: "Acht Uhr" },
    { de: "neun", bn: "৯ (নয়)", example: "Neun Euro" },
    { de: "zehn", bn: "১০ (দশ)", example: "Zehn Kinder" },
    { de: "elf", bn: "১১ (এগারো)", example: "Elf Spieler" },
    { de: "zwölf", bn: "১২ (বারো)", example: "Zwölf Monate" },
    { de: "hundert", bn: "১০০ (একশত)", example: "Hundert Prozent" }
  ],
  grammar: [
    {
      title: "১৩ থেকে ১৯ পর্যন্ত সংখ্যার নিয়ম",
      explanation: "১৩ থেকে ১৯ পর্যন্ত সংখ্যা গঠনের নিয়ম হলো: এককের সংখ্যা + zehn (১০)। যেমন: drei + zehn = dreizehn (১৩)। তবে 16 (sechzehn) এবং 17 (siebzehn) এর ক্ষেত্রে কিছুটা পরিবর্তন হয়।",
      examples: [
        { de: "dreizehn (3 + 10)", bn: "১৩" },
        { de: "vierzehn (4 + 10)", bn: "১৪" },
        { de: "sechzehn (sechs থেকে s বাদ)", bn: "১৬" },
        { de: "siebzehn (sieben থেকে en বাদ)", bn: "১৭" }
      ]
    }
  ],
  dialogues: [
    {
      speaker: "A",
      de: "Wie ist deine Telefonnummer?",
      bn: "তোমার ফোন নম্বর কত?"
    },
    {
      speaker: "B",
      de: "Meine Nummer ist null-eins-sieben-zwei, drei-vier-fünf.",
      bn: "আমার নম্বর হলো ০১৭২, ৩৪৫।"
    }
  ],
  exercises: [
    {
      id: "ex2_1",
      type: "multiple_choice",
      question: "'fünf' শব্দটির সঠিক বাংলা সংখ্যা কোনটি?",
      options: ["৩", "৪", "৫", "৬"],
      correctAnswer: 2
    },
    {
      id: "ex2_2",
      type: "multiple_choice",
      question: "জার্মান ভাষায় ১২ কে কী বলা হয়?",
      options: ["elf", "zwölf", "zehn", "dreizehn"],
      correctAnswer: 1
    }
  ]
};
