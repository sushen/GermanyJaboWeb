export const chapter07 = {
  id: 7,
  titleDe: "Shopping",
  titleBn: "কেনাকাটা / Einkaufen",
  description: "সুপারমার্কেট, কেনাকাটা, দাম জিজ্ঞাসা করা এবং ইউরো (Euro)",
  overview: {
    goals: [
      "সুপারমার্কেটে কেনাকাটা করার কথা বলা",
      "পণ্যের দাম জিজ্ঞাসা করা (Wie viel kostet...?)",
      "পরিমাণ ও মাপের একক বলা (Kilo, Liter, Flasche)"
    ],
    summary: "কেনাকাটার ক্ষেত্রে প্রয়োজনীয় কথোপকথন ও দাম নির্ধারণ সংক্রান্ত বাক্য শেখানো হয়েছে।"
  },
  vocabulary: [
    { de: "der Supermarkt", bn: "সুপারমার্কেট", example: "Ich gehe zum Supermarkt." },
    { de: "kaufen", bn: "কেনা", example: "Ich kaufe Äpfel." },
    { de: "kosten", bn: "দাম হওয়া", example: "Was kostet das?" },
    { de: "der Preis", bn: "দাম / মূল্য", example: "Der Preis ist gut." },
    { de: "das Geld", bn: "টাকা / অর্থ", example: "Ich habe kein Geld." },
    { de: "der Euro", bn: "ইউরো (মুদ্রা)", example: "Das kostet zwei Euro." },
    { de: "das Kilo", bn: "কেজি / কিলোগ্রাম", example: "Ein Kilo Tomaten." }
  ],
  grammar: [
    {
      title: "Asking Price: Wie viel kostet...?",
      explanation: "কোনো পণ্যের দাম জানতে 'Wie viel kostet...?' (একবচন) বা 'Wie viel kosten...?' (বহুবচন) ব্যবহার করা হয়।",
      examples: [
        { de: "Wie viel kostet der Apfel?", bn: "আপেলটির দাম কত?" },
        { de: "Wie viel kosten die Äpfel?", bn: "আপেলগুলোর দাম কত?" }
      ]
    }
  ],
  dialogues: [
    {
      speaker: "A",
      de: "Entschuldigung, wie viel kostet ein Kilo Bananen?",
      bn: "মাফ করবেন, এক কেজি কলার দাম কত?"
    },
    {
      speaker: "B",
      de: "Das kostet zwei Euro fünfzig.",
      bn: "এটির দাম দুই ইউরো ৫০ সেন্ট।"
    }
  ],
  exercises: [
    {
      id: "ex7_1",
      type: "multiple_choice",
      question: "'দাম কত?' জিজ্ঞাসা করার সঠিক জার্মান বাক্য কোনটি?",
      options: [
        "Wie heißen Sie?",
        "Wie viel kostet das?",
        "Wo wohnen Sie?",
        "Wie geht es Ihnen?"
      ],
      correctAnswer: 1
    }
  ]
};
