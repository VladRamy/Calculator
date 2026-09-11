import { useState } from 'react';
import { questions } from './config/questions';
import { calculateSF36Scores } from './utils/scoring';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';
import './App.css';

function App() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  const handleSelect = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowResult = () => {
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResult) {
    const scores = calculateSF36Scores(answers);
    return (
      <div className="app">
        <Header />
        <main className="main">
          <div className="container">
            <ResultScreen scores={scores} onReset={handleReset} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          <div className="intro-section">
            <h2>Опросник SF-36</h2>
            <p>
              SF-36 (Short Form 36) — это универсальный опросник для оценки качества жизни, 
              связанного со здоровьем. Он охватывает 8 ключевых аспектов здоровья и используется 
              в клинической практике и научных исследованиях.
            </p>
            <p>
              Пожалуйста, ответьте на все вопросы, выбирая вариант, который наиболее точно 
              отражает ваше состояние за последние 4 недели.
            </p>
          </div>

          <ProgressBar answeredCount={answeredCount} total={totalQuestions} />

          <div className="questions-list">
            {questions.map((q, index) => (
              <QuestionCard
                key={q.id}
                question={q}
                selectedValue={answers[q.id]}
                onSelect={(value) => handleSelect(q.id, value)}
                index={index}
              />
            ))}
          </div>

          {answeredCount === totalQuestions && (
            <div className="actions">
              <button 
                className="button button--primary button--large" 
                onClick={handleShowResult}
              >
                Рассчитать результат
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;