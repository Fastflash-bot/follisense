import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Flame, Trophy, ChevronRight, Star, Home } from 'lucide-react';
import { quizQuestions, QuizQuestion, dummyLeaderboard } from '@/data/quizQuestions';
import ScalpIllustration from '@/components/ScalpIllustration';

interface QuizState {
  totalPoints: number;
  currentStreak: number;
  bestStreak: number;
  wrongQuestionIds: number[];
}

const loadQuizState = (): QuizState => {
  try {
    const saved = localStorage.getItem('scalpsense-quiz');
    if (saved) return JSON.parse(saved);
  } catch {}
  return { totalPoints: 0, currentStreak: 0, bestStreak: 0, wrongQuestionIds: [] };
};

const saveQuizState = (state: QuizState) => {
  localStorage.setItem('scalpsense-quiz', JSON.stringify(state));
};

const shuffleArray = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const ScalpQuiz = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>(loadQuizState);
  const [phase, setPhase] = useState<'playing' | 'roundSummary'>('playing');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [roundQuestions, setRoundQuestions] = useState<QuizQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [roundPoints, setRoundPoints] = useState(0);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());

  const pickQuestions = useCallback((currentUsedIds: Set<number>) => {
    // Prioritise previously wrong questions (spaced repetition)
    const wrong = quizQuestions.filter(q => quizState.wrongQuestionIds.includes(q.id) && !currentUsedIds.has(q.id));
    const rest = quizQuestions.filter(q => !quizState.wrongQuestionIds.includes(q.id) && !currentUsedIds.has(q.id));

    const pool = [...shuffleArray(wrong), ...shuffleArray(rest)];
    
    // If we've used all questions, reset
    if (pool.length < 5) {
      const fresh = shuffleArray([...quizQuestions]);
      return fresh.slice(0, 5);
    }
    return pool.slice(0, 5);
  }, [quizState.wrongQuestionIds]);

  useEffect(() => {
    setRoundQuestions(pickQuestions(new Set()));
    setQuestionIndex(0);
    setRoundCorrect(0);
    setRoundPoints(0);
  }, []);

  const currentQuestion = roundQuestions[questionIndex];

  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return shuffleArray(currentQuestion.options);
  }, [currentQuestion?.id]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setShowExplanation(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    const newState = { ...quizState };

    if (isCorrect) {
      newState.totalPoints += 10;
      newState.currentStreak += 1;
      if (newState.currentStreak > newState.bestStreak) newState.bestStreak = newState.currentStreak;
      // Streak bonus every 5
      if (newState.currentStreak % 5 === 0) newState.totalPoints += 15;
      // Remove from wrong list if previously wrong
      newState.wrongQuestionIds = newState.wrongQuestionIds.filter(id => id !== currentQuestion.id);
      setRoundCorrect(prev => prev + 1);
      setRoundPoints(prev => prev + 10 + (newState.currentStreak % 5 === 0 ? 15 : 0));
    } else {
      newState.totalPoints += 3;
      newState.currentStreak = 0;
      if (!newState.wrongQuestionIds.includes(currentQuestion.id)) {
        newState.wrongQuestionIds.push(currentQuestion.id);
      }
      setRoundPoints(prev => prev + 3);
    }

    setQuizState(newState);
    saveQuizState(newState);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);

    const nextIdx = questionIndex + 1;
    if (nextIdx >= 5) {
      // Round complete bonus
      const newState = { ...quizState, totalPoints: quizState.totalPoints + 5 };
      setQuizState(newState);
      saveQuizState(newState);
      setRoundPoints(prev => prev + 5);
      setPhase('roundSummary');
    } else {
      setQuestionIndex(nextIdx);
    }
  };

  const startNewRound = () => {
    const newUsed = new Set(usedIds);
    roundQuestions.forEach(q => newUsed.add(q.id));
    setUsedIds(newUsed);
    const next = pickQuestions(newUsed);
    setRoundQuestions(next);
    setQuestionIndex(0);
    setRoundCorrect(0);
    setRoundPoints(0);
    setPhase('playing');
  };

  if (!currentQuestion && phase === 'playing') return null;

  // Round summary
  if (phase === 'roundSummary') {
    return (
      <div className="page-container pt-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center pt-8">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
            <Trophy size={28} className="text-primary" />
          </div>
          <h1 className="text-2xl font-semibold mb-1">Round complete!</h1>
          <p className="text-muted-foreground text-sm mb-6">Great work building your clinical eye</p>

          <div className="card-elevated p-5 mb-4 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Score</span>
              <span className="text-sm font-semibold">{roundCorrect} out of 5 correct</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Points this round</span>
              <span className="text-sm font-semibold text-primary">+{roundPoints}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total points</span>
              <span className="text-sm font-semibold">{quizState.totalPoints}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Current streak</span>
              <span className="text-sm font-semibold flex items-center gap-1"><Flame size={14} className="text-primary" />{quizState.currentStreak}</span>
            </div>
          </div>

          <button onClick={startNewRound} className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-semibold text-sm btn-press mb-3">
            Keep going
          </button>
          <button onClick={() => navigate('/stylist')} className="w-full h-12 bg-card border border-border text-foreground rounded-xl font-semibold text-sm btn-press flex items-center justify-center gap-2">
            <Home size={16} /> Back to home
          </button>
        </motion.div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="page-container pt-6 pb-24">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => navigate('/stylist')} className="flex items-center gap-1 text-sm text-muted-foreground btn-press">
            <ArrowLeft size={16} /> Exit
          </button>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-muted-foreground"><Flame size={13} className="text-primary" />{quizState.currentStreak}</span>
            <span className="flex items-center gap-1 text-muted-foreground"><Star size={13} className="text-primary" />{quizState.totalPoints}</span>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < questionIndex ? 'bg-primary' : i === questionIndex ? 'bg-primary/50' : 'bg-border'
            }`} />
          ))}
        </div>

        <h1 className="text-lg font-semibold mb-4">What are you looking at?</h1>

        {/* Illustration */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="w-full aspect-square max-w-[240px] mx-auto rounded-2xl overflow-hidden mb-4">
              <ScalpIllustration conditionId={currentQuestion.conditionId} stageIndex={currentQuestion.stageIndex} />
            </div>

            <p className="text-sm text-muted-foreground text-center mb-5 italic">"{currentQuestion.scenario}"</p>

            {/* Options */}
            <div className="space-y-2.5 mb-4">
              {shuffledOptions.map((option) => {
                let bg = 'bg-card border border-border';
                if (selectedAnswer) {
                  if (option === currentQuestion.correctAnswer) bg = 'bg-[hsl(140,25%,88%)] border border-[hsl(140,25%,70%)] text-foreground';
                  else if (option === selectedAnswer && !isCorrect) bg = 'bg-[hsl(0,30%,90%)] border border-[hsl(0,30%,75%)] text-foreground';
                }
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedAnswer}
                    className={`w-full p-3.5 rounded-xl text-sm font-medium text-left transition-colors btn-press ${bg}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card-elevated p-4 mb-4">
                <p className="text-sm font-semibold mb-1">{isCorrect ? "That's right!" : 'Not quite'}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {isCorrect ? currentQuestion.correctExplanation : currentQuestion.incorrectExplanationTemplate}
                </p>
                <p className="text-xs text-primary font-medium mb-1">{isCorrect ? '+10 points' : '+3 points'}{isCorrect && quizState.currentStreak % 5 === 0 && quizState.currentStreak > 0 ? ' + 15 streak bonus!' : ''}</p>

                <button
                  onClick={() => navigate(`/stylist/learn?condition=${currentQuestion.learnMoreId}`)}
                  className="text-xs text-primary font-medium flex items-center gap-1 mt-2 btn-press"
                >
                  Learn more about this condition <ChevronRight size={12} />
                </button>
              </motion.div>
            )}

            {showExplanation && (
              <button onClick={handleNext} className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-semibold text-sm btn-press">
                {questionIndex >= 4 ? 'See results' : 'Next question'}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ScalpQuiz;
