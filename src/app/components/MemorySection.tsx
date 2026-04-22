import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { useState } from "react";

interface MemorySectionProps {
  onComplete: (memories: Record<string, string>) => Promise<void> | void;
}

const questions = [
  { id: "best_memory", question: "Best memory with me?", placeholder: "Share a special moment..." },
  { id: "first_impression", question: "First impression of me?", placeholder: "What did you think..." },
  { id: "funniest", question: "Funniest moment with me?", placeholder: "Tell me the fun story..." },
  { id: "improve", question: "What should I improve?", placeholder: "Be honest..." },
  { id: "one_word", question: "One word for me?", placeholder: "Just one word..." },
];

export function MemorySection({ onComplete }: MemorySectionProps) {
  const [memories, setMemories] = useState<Record<string, string>>({});
  const isFormComplete = questions.every((q) => (memories[q.id] || "").trim().length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      return;
    }

    onComplete(memories);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Camera className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Memory Questions 📸
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Share your memories with me!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-6 border border-white/20 shadow-xl"
            >
              <label className="block mb-3 text-gray-800 dark:text-gray-200">
                {q.question}
              </label>
              <textarea
                value={memories[q.id] || ""}
                onChange={(e) => setMemories({ ...memories, [q.id]: e.target.value })}
                placeholder={q.placeholder}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-700/80 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isFormComplete}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xl shadow-lg hover:shadow-2xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Section ✨
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
