import { motion } from "motion/react";
import { UserRound } from "lucide-react";
import { useState } from "react";

interface NameSectionProps {
  onSubmit: (name: string) => Promise<void> | void;
}

export function NameSection({ onSubmit }: NameSectionProps) {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    onSubmit(name.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <UserRound className="w-14 h-14 mx-auto mb-4 text-blue-600" />
          <h2 className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            What is your name?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We will save your answers in MongoDB under your name.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            className="w-full px-5 py-4 rounded-2xl bg-white/90 dark:bg-gray-700/90 border border-cyan-200 dark:border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-lg"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-xl shadow-lg hover:shadow-2xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue ✨
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
