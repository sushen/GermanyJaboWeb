export const chapter05 = {
  id: 5,
  titleDe: "Daily Life",
  titleBn: "আমার দৈনন্দিন জীবন / Mein Alltag",
  description: "দৈনন্দিন রুটিন, কাজ এবং পৃথকযোগ্য ক্রিয়া (Separable Verbs)",
  overview: {
    goals: [
      "দৈনন্দিন ক্রিয়াকলাপ বর্ণনা করা",
      "জার্মান বিভাজ্য ক্রিয়া (Trennbare Verben) ব্যবহার করা",
      "কাজের সময়সূচী সম্পর্কে কথা বলা"
    ],
    summary: "ঘুম থেকে ওঠা, কাজ করা, রান্না করা ইত্যাদি দৈনন্দিন জীবনযাত্রার বিবরণ দিতে এই অধ্যায়টি সহায়ক।"
  },
  vocabulary: [
    { de: "aufstehen", bn: "ঘুম থেকে ওঠা", example: "Ich stehe um 6 Uhr auf." },
    { de: "frühstücken", bn: "সকালের নাস্তা করা", example: "Wir frühstücken zusammen." },
    { de: "arbeiten", bn: "কাজ করা", example: "Er arbeitet von 9 bis 5 Uhr." },
    { de: "einkaufen", bn: "কেনাকাটা করা", example: "Ich kaufe am Supermarkt ein." },
    { de: "kochen", bn: "রান্না করা", example: "Meine Mutter kocht Reis." },
    { de: "schlafen", bn: "ঘুমানো", example: "Ich schlafe um 10 Uhr." },
    { de: "fernsehen", bn: "টিভি দেখা", example: "Am Abend sehe ich fern." }
  ],
  grammar: [
    {
      title: "Separable Verbs (Trennbare Verben)",
      explanation: "জার্মান ভাষায় কিছু ক্রিয়াপদের সাথে উপসর্গ (Prefix) যুক্ত থাকে যা বাক্যে ব্যবহারের সময় ক্রিয়ার মূল অংশ দ্বিতীয় স্থানে এবং উপসর্গটি বাক্যের একেবারে শেষে বসে।",
      examples: [
        { de: "aufstehen -> Ich stehe um 7 Uhr auf.", bn: "আমি সকাল ৭টায় উঠি।" },
        { de: "einkaufen -> Er kauft im Supermarkt ein.", bn: "সে সুপারমার্কেটে কেনাকাটা করে।" }
      ]
    }
  ],
  dialogues: [
    {
      speaker: "A",
      de: "Wann stehst du morgens auf?",
      bn: "তুমি সকালে কখন ওঠো?"
    },
    {
      speaker: "B",
      de: "Ich stehe um sechs Uhr auf. Und du?",
      bn: "আমি ৬টায় উঠি। আর তুমি?"
    }
  ],
  exercises: [
    {
      id: "ex5_1",
      type: "multiple_choice",
      question: "'aufstehen' ক্রিয়াপদ দিয়ে 'আমি ৭টায় উঠি' বাক্যের সঠিক গঠন কোনটি?",
      options: [
        "Ich aufstehe um 7 Uhr.",
        "Ich stehe um 7 Uhr auf.",
        "Ich stehe auf um 7 Uhr.",
        "Auf stehe ich um 7 Uhr."
      ],
      correctAnswer: 1
    }
  ]
};
