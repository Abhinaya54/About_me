import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ChooseSectionProps {
  onComplete: (choices: Record<string, string>) => Promise<void> | void;
}

const questions = [
  {
    id: "flower",
    question: "If I were a flower:",
    placeholder: "Type your answer (e.g., Rose)",
  },
  {
    id: "season",
    question: "If I were a season:",
    placeholder: "Type your answer (e.g., Winter)",
  },
  {
    id: "movie_for_me",
    question: "Suggest one movie for me:",
    placeholder: "Type your answer (e.g., Interstellar)",
  },
  {
    id: "song",
    question: "Suggest one song for me:",
    placeholder: "Type your answer (e.g., Night Changes)",
  },
  {
    id: "picture_for_me",
    question: "Share one picture link for me:",
    placeholder: "Paste image URL",
  },
  {
    id: "vibe",
    question: "If I were a vibe:",
    placeholder: "Type your answer (e.g., Peaceful)",
  },
  {
    id: "color",
    question: "If I were a color:",
    placeholder: "Type your answer (e.g., Black)",
  },
];

export function ChooseSection({ onComplete }: ChooseSectionProps) {
  const [choices, setChoices] = useState<Record<string, string>>({});

  const handleChoice = (questionId: string, value: string) => {
    setChoices({ ...choices, [questionId]: value });
  };

  const isFormComplete = questions.every((q) => (choices[q.id] || "").trim().length > 0);

  const handleSubmit = () => {
    if (isFormComplete) {
      onComplete(choices);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 mx-auto mb-4 text-pink-500 fill-pink-500" />
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Me Better 💖
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Pick what describes me best!</p>
        </div>

        <div className="space-y-8">
          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-6 border border-white/20 shadow-xl"
            >
              <h3 className="text-xl mb-4 text-gray-800 dark:text-gray-200">{q.question}</h3>
              <input
                type="text"
                value={choices[q.id] || ""}
                onChange={(event) => handleChoice(q.id, event.target.value)}
                placeholder={q.placeholder}
                className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-700/80 border border-purple-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xl shadow-lg hover:shadow-2xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Section ✨
        </motion.button>
      </div>
    </motion.div>
  );
}
