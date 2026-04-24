import { motion } from "motion/react";

interface ResultSectionProps {
  participantName: string;
  score: number;
  totalQuestions: number;
  pictureUrl: string;
  onSubmitMessage: (message: string) => Promise<void>;
}

export function ResultSection({ participantName }: ResultSectionProps) {
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
              {participantName}.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
