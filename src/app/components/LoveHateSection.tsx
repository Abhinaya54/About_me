import { motion } from "motion/react";
import { HeartCrack } from "lucide-react";
import { useState } from "react";

interface LoveHateSectionProps {
  onComplete: (selections: { loves: string[]; hates: string[] }) => Promise<void> | void;
}

export function LoveHateSection({ onComplete }: LoveHateSectionProps) {
  const [loves, setLoves] = useState<string[]>(["", "", "", "", "", ""]);
  const [hates, setHates] = useState<string[]>(["", "", "", "", "", ""]);

  const canSubmit = loves.some((item) => item.trim().length > 0) && hates.some((item) => item.trim().length > 0);

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    const finalLoves = loves.filter((item) => item.trim().length > 0);
    const finalHates = hates.filter((item) => item.trim().length > 0);

    onComplete({ loves: finalLoves, hates: finalHates });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HeartCrack className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Love / Hate Quiz ❤️💔
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Tell me what you love and hate!</p>
        </div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-8 border border-white/20 shadow-xl"
          >
            <h3 className="text-2xl mb-6 text-center text-red-600 dark:text-red-400">
              What I LOVE ❤️ (up to 6 items)
            </h3>
            <div className="space-y-4">
              {loves.map((love, index) => (
                <input
                  key={index}
                  type="text"
                  value={love}
                  onChange={(e) => {
                    const newLoves = [...loves];
                    newLoves[index] = e.target.value;
                    setLoves(newLoves);
                  }}
                  placeholder={`Love #${index + 1} (e.g., Honesty, Loyalty...)`}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-700/80 border border-red-200 dark:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-8 border border-white/20 shadow-xl"
          >
            <h3 className="text-2xl mb-6 text-center text-purple-600 dark:text-purple-400">
              What I HATE 💔 (up to 6 items)
            </h3>
            <div className="space-y-4">
              {hates.map((hate, index) => (
                <input
                  key={index}
                  type="text"
                  value={hate}
                  onChange={(e) => {
                    const newHates = [...hates];
                    newHates[index] = e.target.value;
                    setHates(newHates);
                  }}
                  placeholder={`Hate #${index + 1} (e.g., Lies, Drama...)`}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-700/80 border border-purple-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full mt-8 py-4 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white rounded-full text-xl shadow-lg hover:shadow-2xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          End 🎉
        </motion.button>
      </div>
    </motion.div>
  );
}
