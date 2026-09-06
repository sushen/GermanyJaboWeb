export const chapter04 = {
  id: 4,
  titleDe: "Family",
  titleBn: "আমার পরিবার / Meine Familie",
  description: "পরিবারের সদস্য, আত্মীয়স্বজন এবং সম্বন্ধসূচক সর্বনাম (Possessive Pronouns)",
  overview: {
    goals: [
      "পরিবারের সদস্যদের নাম জার্মান ভাষায় জানা",
      "Mein / Meine (আমার) এবং Dein / Deine (তোমার) এর ব্যবহার শেখা",
      "পরিবার সম্পর্কে সংক্ষিপ্ত বর্ণনা দেওয়া"
    ],
    summary: "এই পাঠে আমরা পরিবার ও স্বজনদের পরিচয় এবং সম্বন্ধবাচক শব্দসমূহ শিখব।"
  },
  vocabulary: [
    { de: "die Familie", bn: "পরিবার", example: "Das ist meine Familie." },
    { de: "der Vater", bn: "বাবা", example: "Mein Vater ist Lehrer." },
    { de: "die Mutter", bn: "মা", example: "Meine Mutter kocht gut." },
    { de: "die Eltern", bn: "মা-বাবা (অভিভাবক)", example: "Meine Eltern wohnen in Dhaka." },
    { de: "der Sohn", bn: "ছেলে / পুত্র", example: "Er hat einen Sohn." },
    { de: "die Tochter", bn: "মেয়ে / কন্যা", example: "Sie haben eine Tochter." },
    { de: "der Bruder", bn: "ভাই", example: "Mein Bruder studiert." },
    { de: "die Schwester", bn: "বোন", example: "Meine Schwester ist nett." },
    { de: "der Großvater / Opa", bn: "দাদা / নানা", example: "Mein Opa erzählt Geschichten." },
    { de: "die Großmutter / Oma", bn: "দাদী / নানী", example: "Meine Oma ist lieb." }
  ],
  grammar: [
    {
      title: "Possessive Pronouns: mein vs meine",
      explanation: "পুংলিঙ্গ (der) ও ক্লীবলিঙ্গ (das) শব্দের ক্ষেত্রে 'mein', এবং স্ত্রীলিঙ্গ (die) ও বহুবচন (die Plural) শব্দের ক্ষেত্রে 'meine' ব্যবহৃত হয়।",
      examples: [
        { de: "der Vater -> mein Vater", bn: "আমার বাবা (Masculine)" },
        { de: "die Mutter -> meine Mutter", bn: "আমার মা (Feminine)" },
        { de: "das Kind -> mein Kind", bn: "আমার সন্তান (Neuter)" },
        { de: "die Eltern -> meine Eltern", bn: "আমার পিতা-মাতা (Plural)" }
      ]
    }
  ],
  dialogues: [
    {
      speaker: "A",
      de: "Hast du Geschwister?",
      bn: "তোমার কি ভাই-বোন আছে?"
    },
    {
      speaker: "B",
      de: "Ja, ich habe einen Bruder und eine Schwester.",
      bn: "হ্যাঁ, আমার এক ভাই এবং এক বোন আছে।"
    }
  ],
  exercises: [
    {
      id: "ex4_1",
      type: "multiple_choice",
      question: "'der Vater' শব্দের ক্ষেত্রে 'আমার বাবা' বলতে কোনটি সঠিক?",
      options: ["meine Vater", "mein Vater", "meinen Vater", "meiner Vater"],
      correctAnswer: 1
    },
    {
      id: "ex4_2",
      type: "multiple_choice",
      question: "জার্মান ভাষায় 'মা-বাবা' কে কী বলা হয়?",
      options: ["die Geschwister", "die Kinder", "die Eltern", "die Familien"],
      correctAnswer: 2
    }
  ]
};
