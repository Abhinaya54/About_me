import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { NameSection } from "./components/NameSection";
import { GuessSection } from "./components/GuessSection";
import { ChooseSection } from "./components/ChooseSection";
import { MemorySection } from "./components/MemorySection";
import { LoveHateSection } from "./components/LoveHateSection";
import { ResultSection } from "./components/ResultSection";
import { ProgressBar } from "./components/ProgressBar";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { upsertSubmission } from "./lib/api";

type Section = "hero" | "name" | "guess" | "choose" | "memory" | "lovehate" | "result";

interface QuizData {
  guesses: Record<string, string>;
  choices: Record<string, string>;
  memories: Record<string, string>;
  loveHate: { loves: string[]; hates: string[] };
}

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>("hero");
  const [participantName, setParticipantName] = useState(() => localStorage.getItem("participantName") || "");

  const getParticipantName = () => participantName || localStorage.getItem("participantName") || "";
  const [quizData, setQuizData] = useState<QuizData>({
    guesses: {},
    choices: {},
    memories: {},
    loveHate: { loves: [], hates: [] },
  });

  const sections: Section[] = ["hero", "name", "guess", "choose", "memory", "lovehate", "result"];
  const currentIndex = sections.indexOf(currentSection);

  const handleStart = () => {
    setCurrentSection("name");
  };

  const handleNameSubmit = async (name: string) => {
    setParticipantName(name);
    localStorage.setItem("participantName", name);

    try {
      await upsertSubmission(name, {});
    } catch (error) {
      console.error("Failed to create submission", error);
    }

    setCurrentSection("guess");
  };

  const handleGuessComplete = async (answers: Record<string, string>) => {
    setQuizData({ ...quizData, guesses: answers });

    try {
      await upsertSubmission(getParticipantName(), { guesses: answers });
    } catch (error) {
      console.error("Failed to save guess answers", error);
    }

    setCurrentSection("choose");
  };

  const handleChooseComplete = async (choices: Record<string, string>) => {
    setQuizData({ ...quizData, choices });

    const picture = choices.picture_for_me?.trim() || "";

    try {
      await upsertSubmission(getParticipantName(), { choices, picture });
    } catch (error) {
      console.error("Failed to save choices", error);
    }

    setCurrentSection("memory");
  };

  const handleMemoryComplete = async (memories: Record<string, string>) => {
    setQuizData({ ...quizData, memories });

    try {
      await upsertSubmission(getParticipantName(), { memories });
    } catch (error) {
      console.error("Failed to save memories", error);
    }

    setCurrentSection("lovehate");
  };

  const handleLoveHateComplete = async (selections: { loves: string[]; hates: string[] }) => {
    setQuizData({ ...quizData, loveHate: selections });

    try {
      await upsertSubmission(getParticipantName(), { loveHate: selections });
    } catch (error) {
      console.error("Failed to save love/hate", error);
    }

    setCurrentSection("result");
  };

  const handleMessageSubmit = async (message: string) => {
    try {
      await upsertSubmission(getParticipantName(), { message });
    } catch (error) {
      console.error("Failed to save final message", error);
      throw error;
    }
  };

  const calculateScore = () => {
    const correctAnswers = {
      food: ["pizza", "biryani"],
      color: ["purple", "black"],
      destination: ["paris", "tokyo"],
      time: ["night"],
      personality: ["introvert"],
      drink: ["coffee"],
      talent: ["singing"],
      anger: ["lies", "fake"],
      fear: ["heights"],
      hobby: ["reading"],
    };

    let score = 0;
    const totalQuestions = 10;

    Object.entries(quizData.guesses).forEach(([key, value]) => {
      const correct = correctAnswers[key as keyof typeof correctAnswers] || [];
      if (correct.some(ans => value.toLowerCase().includes(ans))) {
        score++;
      }
    });

    return { score, totalQuestions };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <DarkModeToggle />
      {currentSection !== "hero" && currentSection !== "result" && (
        <ProgressBar current={currentIndex - 1} total={sections.length - 2} />
      )}

      {currentSection === "hero" && <HeroSection onStart={handleStart} />}
      {currentSection === "name" && <NameSection onSubmit={handleNameSubmit} />}
      {currentSection === "guess" && <GuessSection onComplete={handleGuessComplete} />}
      {currentSection === "choose" && <ChooseSection onComplete={handleChooseComplete} />}
      {currentSection === "memory" && <MemorySection onComplete={handleMemoryComplete} />}
      {currentSection === "lovehate" && <LoveHateSection onComplete={handleLoveHateComplete} />}
      {currentSection === "result" && (
        <ResultSection
          participantName={participantName}
          score={calculateScore().score}
          totalQuestions={calculateScore().totalQuestions}
          pictureUrl={quizData.choices.picture_for_me || ""}
          onSubmitMessage={handleMessageSubmit}
          loveHate={quizData.loveHate}
        />
      )}
    </div>
  );
}