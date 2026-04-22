import { motion } from "motion/react";
import { HeartCrack } from "lucide-react";
import { useState } from "react";

interface LoveHateSectionProps {
  onComplete: (selections: { loves: string[]; hates: string[] }) => Promise<void> | void;
}

const OTHER_OPTION = "✍️ Other";

const loveOptions = [
  "💯 Honesty",
  "🤝 Loyalty",
  "🍕 Food",
  "☮️ Peace",
  "😄 Funny people",
  OTHER_OPTION,
];

const hateOptions = [
  "🎭 Fake people",
  "🤥 Lies",
  "⛈️ Negativity",
  "🎪 Drama",
  "⏰ Waiting",
  OTHER_OPTION,
];

export function LoveHateSection({ onComplete }: LoveHateSectionProps) {
  const [loves, setLoves] = useState<string[]>([]);
  const [hates, setHates] = useState<string[]>([]);
  const [otherLove, setOtherLove] = useState("");
  const [otherHate, setOtherHate] = useState("");

  const toggleLove = (option: string) => {
    setLoves(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );

    if (option === OTHER_OPTION && loves.includes(OTHER_OPTION)) {
      setOtherLove("");
    }
  };

  const toggleHate = (option: string) => {
    setHates(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );

    if (option === OTHER_OPTION && hates.includes(OTHER_OPTION)) {
      setOtherHate("");
    }
  };

  const isOtherLoveSelected = loves.includes(OTHER_OPTION);
  const isOtherHateSelected = hates.includes(OTHER_OPTION);

  const canSubmit =
    loves.length > 0 &&
    hates.length > 0 &&
    (!isOtherLoveSelected || otherLove.trim().length > 0) &&
    (!isOtherHateSelected || otherHate.trim().length > 0);

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    const finalLoves = loves.filter((item) => item !== OTHER_OPTION);
    const finalHates = hates.filter((item) => item !== OTHER_OPTION);

    if (isOtherLoveSelected && otherLove.trim()) {
      finalLoves.push(`Other: ${otherLove.trim()}`);
    }

    if (isOtherHateSelected && otherHate.trim()) {
      finalHates.push(`Other: ${otherHate.trim()}`);
    }

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
          <p className="text-gray-600 dark:text-gray-300">Guess what I love and hate!</p>
        </div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-8 border border-white/20 shadow-xl"
          >
            <h3 className="text-2xl mb-6 text-center text-red-600 dark:text-red-400">
              What I LOVE ❤️
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {loveOptions.map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleLove(option)}
                  className={`p-4 rounded-2xl transition-all ${
                    loves.includes(option)
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                      : "bg-white/80 dark:bg-gray-700/80 hover:bg-red-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            {isOtherLoveSelected && (
              <textarea
                value={otherLove}
                onChange={(event) => setOtherLove(event.target.value)}
                placeholder="Write what else I love..."
                rows={3}
                className="w-full mt-4 px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-700/80 border border-red-200 dark:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-8 border border-white/20 shadow-xl"
          >
            <h3 className="text-2xl mb-6 text-center text-purple-600 dark:text-purple-400">
              What I HATE 💔
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hateOptions.map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleHate(option)}
                  className={`p-4 rounded-2xl transition-all ${
                    hates.includes(option)
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                      : "bg-white/80 dark:bg-gray-700/80 hover:bg-purple-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            {isOtherHateSelected && (
              <textarea
                value={otherHate}
                onChange={(event) => setOtherHate(event.target.value)}
                placeholder="Write what else I hate..."
                rows={3}
                className="w-full mt-4 px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-700/80 border border-purple-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              />
            )}
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full mt-8 py-4 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white rounded-full text-xl shadow-lg hover:shadow-2xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          See My Results! 🎉
        </motion.button>
      </div>
    </motion.div>
  );
}
