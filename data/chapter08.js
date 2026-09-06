export const chapter08 = {
  id: 8,
  titleDe: "City & Transportation",
  titleBn: "শহরে চলাফেরা / Unterwegs in der Stadt",
  description: "শহরের স্থানসমূহ, দিকনির্দেশনা এবং যানবাহন (Bus, Train, Tram)",
  overview: {
    goals: [
      "শহরের গুরুত্বপূর্ণ স্থানগুলোর নাম জানা (Bahnhof, Flughafen, Bank)",
      "রাস্তা বা দিকনির্দেশনা জিজ্ঞাসা করা ও বলা (geradeaus, links, rechts)",
      "গণপরিবহন ব্যবহার করা (Bus, S-Bahn, U-Bahn, Taxi)"
    ],
    summary: "জার্মানির নতুন শহরে চলাফেরা করা, পথ চিনে নেওয়া এবং বাস বা ট্রেনে যাতায়াতের জন্য এই অধ্যায়টি অত্যন্ত প্রয়োজনীয়।"
  },
  vocabulary: [
    { de: "der Bahnhof", bn: "রেলস্টেশন", example: "Wo ist der Bahnhof?" },
    { de: "der Flughafen", bn: "বিমানবন্দর", example: "Der Flughafen ist weit." },
    { de: "die Haltestelle", bn: "বাস / ট্রাম স্টপ", example: "An der Haltestelle warten." },
    { de: "der Bus", bn: "বাস", example: "Ich nehme den Bus." },
    { de: "die Bahn / der Zug", bn: "ট্রেন", example: "Der Zug kommt um 10 Uhr." },
    { de: "das Fahrkarte", bn: "টিকিট", example: "Eine Fahrkarte bitte." },
    { de: "geradeaus", bn: "সোজা সামনে", example: "Gehen Sie geradeaus." },
    { de: "links", bn: "বামে", example: "Biegen Sie links ab." },
    { de: "rechts", bn: "ডানে", example: "Das Restaurant ist rechts." },
    { de: "neben", bn: "পাশে", example: "Neben der Apotheke." },
    { de: "gegenüber", bn: "বিপরীতে / মুখোমুখি", example: "Gegenüber dem Bahnhof." }
  ],
  grammar: [
    {
      title: "Asking Directions (দিকনির্দেশনা চাওয়া)",
      explanation: "কাউকে পথ বা স্থান সম্পর্কে জিজ্ঞেস করতে 'Wo ist...?' অথবা 'Wie komme ich zum/zur...?' ব্যবহার করা হয়।",
      examples: [
        { de: "Wo ist der Bahnhof?", bn: "রেলস্টেশনটি কোথায়?" },
        { de: "Wie komme ich zum Supermarkt?", bn: "আমি কীভাবে সুপারমার্কেটে যাব?" },
        { de: "Gehen Sie geradeaus und dann links.", bn: "সোজা যান এবং তারপর বামে মোড় নিন।" }
      ]
    }
  ],
  dialogues: [
    {
      speaker: "A",
      de: "Entschuldigung, wo ist die Goethe-Straße?",
      bn: "মাফ করবেন, গোয়েথে স্ট্রিটটি কোথায়?"
    },
    {
      speaker: "B",
      de: "Gehen Sie geradeaus und an der Ampel rechts.",
      bn: "সোজা যান এবং ট্রাফিক লাইট থেকে ডানে মোড় নিন।"
    },
    {
      speaker: "A",
      de: "Vielen Dank!",
      bn: "অনেক ধন্যবাদ!"
    }
  ],
  exercises: [
    {
      id: "ex8_1",
      type: "multiple_choice",
      question: "'geradeaus' শব্দটির সঠিক বাংলা অর্থ কোনটি?",
      options: ["বামে", "ডানে", "সোজা সামনে", "পেছনে"],
      correctAnswer: 2
    },
    {
      id: "ex8_2",
      type: "fill_blank",
      question: "Wo ist ______ Bahnhof? (রেলস্টেশনটি কোথায়?)",
      options: ["der", "die", "das", "den"],
      correctAnswer: 0
    }
  ]
};
