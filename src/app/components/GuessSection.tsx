import { motion } from "motion/react";
import { Target } from "lucide-react";
import { useState } from "react";

interface GuessSectionProps {
  onComplete: (answers: Record<string, string>) => Promise<void> | void;
}

const questions = [
  { id: "food", question: "My favorite food?", placeholder: "e.g., Pizza, Biryani..." },
  { id: "color", question: "My favorite color?", placeholder: "e.g., Purple, Black..." },
  { id: "destination", question: "My dream destination?", placeholder: "e.g., Paris, Tokyo..." },
  { id: "time", question: "Morning person or night owl?", placeholder: "Morning / Night" },
  { id: "personality", question: "Introvert or extrovert?", placeholder: "Introvert / Extrovert" },
  { id: "drink", question: "Tea or coffee?", placeholder: "Tea / Coffee" },
  { id: "talent", question: "My hidden talent?", placeholder: "e.g., Singing, Dancing..." },
  { id: "anger", question: "What makes me angry fast?", placeholder: "e.g., Lies, Being late..." },
  { id: "fear", question: "My biggest fear?", placeholder: "e.g., Heights, Darkness..." },
  { id: "hobby", question: "My favorite hobby?", placeholder: "e.g., Reading, Gaming..." },
];

export function GuessSection({ onComplete }: GuessSectionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const isFormComplete = questions.every((q) => (answers[q.id] || "").trim().length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      return;
    }

    onComplete(answers);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Target className="w-16 h-16 mx-auto mb-4 text-pink-500" />
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Guess About Me 🎯
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Fill in what you think about me!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-6 border border-white/20 shadow-xl"
            >
              <label className="block mb-3 text-gray-800 dark:text-gray-200">
                {q.question}
              </label>
              <input
                type="text"
                value={answers[q.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                placeholder={q.placeholder}
                className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-700/80 border border-purple-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isFormComplete}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-xl shadow-lg hover:shadow-2xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Section ✨
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
