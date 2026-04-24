import { motion } from "motion/react";

interface ResultSectionProps {
  participantName: string;
  score: number;
  totalQuestions: number;
  pictureUrl: string;
  onSubmitMessage: (message: string) => Promise<void>;
  loveHate?: { loves: string[]; hates: string[] };
}

export function ResultSection({ participantName, loveHate }: ResultSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20" />

      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -200],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {["⭐", "✨", "💫", "🌟"][i % 4]}
        </motion.div>
      ))}

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-8xl md:text-9xl mb-8"
          >
            ✨
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl"
          >
            <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              Thank You! 💖
            </p>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
              Thank you for your response, {participantName}.
            </p>

            {loveHate && (
              <div className="space-y-6 mt-8">
                {loveHate.loves && loveHate.loves.length > 0 && (
                  <div className="text-left">
                    <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                      What You Love ❤️:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {loveHate.loves.map((item, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {loveHate.hates && loveHate.hates.length > 0 && (
                  <div className="text-left">
                    <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3">
                      What You Hate 💔:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {loveHate.hates.map((item, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
