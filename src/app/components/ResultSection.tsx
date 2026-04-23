import { motion } from "motion/react";
import { Trophy, Star, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

interface ResultSectionProps {
  participantName: string;
  score: number;
  totalQuestions: number;
  pictureUrl: string;
  onSubmitMessage: (message: string) => Promise<void>;
}

const getBadge = (percentage: number) => {
  if (percentage >= 80) return { title: "Soul Friend 💖", emoji: "💖", color: "from-pink-600 to-red-600" };
  if (percentage >= 60) return { title: "Lovely Friend 😍", emoji: "😍", color: "from-purple-600 to-pink-600" };
  if (percentage >= 40) return { title: "Sweet Friend 🌸", emoji: "🌸", color: "from-blue-600 to-purple-600" };
  return { title: "Cutie Friend ✨", emoji: "✨", color: "from-rose-500 to-pink-500" };
};

export function ResultSection({ participantName, score, totalQuestions, pictureUrl, onSubmitMessage }: ResultSectionProps) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const percentage = Math.round((score / totalQuestions) * 100);
  const badge = getBadge(percentage);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");
      await onSubmitMessage(message.trim());
      setSubmitted(true);
    } catch (_error) {
      setSubmitError("Could not save your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
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

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center mb-12"
        >
          <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-500" />
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Results! ✨
          </h2>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-8xl mb-4"
            >
              {badge.emoji}
            </motion.div>
            <h3 className={`text-4xl md:text-5xl mb-4 bg-gradient-to-r ${badge.color} bg-clip-text text-transparent`}>
              {badge.title}
            </h3>
            {pictureUrl.trim() ? (
              <div className="max-w-sm mx-auto mt-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">Picture you shared 💖</p>
                <img
                  src={pictureUrl}
                  alt="Shared by participant"
                  className="w-full h-64 object-cover rounded-2xl border border-pink-200 dark:border-pink-700 shadow-lg"
                />
              </div>
            ) : (
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
                No picture was shared.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {percentage >= 80 && (
              <>
                <div className="text-center p-4 bg-pink-100 dark:bg-pink-900/30 rounded-2xl">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-pink-600 fill-pink-600" />
                  <p className="text-sm">You truly know me!</p>
                </div>
                <div className="text-center p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                  <Star className="w-8 h-8 mx-auto mb-2 text-purple-600 fill-purple-600" />
                  <p className="text-sm">Amazing score!</p>
                </div>
              </>
            )}
            {percentage >= 60 && percentage < 80 && (
              <>
                <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm">Great job!</p>
                </div>
                <div className="text-center p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                  <Star className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm">Keep learning!</p>
                </div>
              </>
            )}
            {percentage < 60 && (
              <div className="col-span-2 text-center p-4 bg-gray-100 dark:bg-gray-700/30 rounded-2xl">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm">You are adorable, and your vibe is already special to me! 💕</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-8 border border-white/20 shadow-xl mb-8"
        >
          <h3 className="text-2xl mb-4 text-center">
            💌 Leave a Message
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Write one thing you like about me, {participantName}
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your sweet message here..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-700/80 border border-pink-200 dark:border-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-shadow"
              >
                {isSubmitting ? "Saving..." : "Send Message 💌"}
              </motion.button>
              {submitError && (
                <p className="text-center text-red-600 dark:text-red-400 text-sm">{submitError}</p>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center p-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl border-2 border-green-300 dark:border-green-700"
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">Thank you! ✨</p>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">Thank you for your response. Your data has been recorded successfully.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
