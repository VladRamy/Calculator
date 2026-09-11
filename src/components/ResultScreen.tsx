import type { ScoreResult } from '../types';
import { getInterpretation } from '../utils/scoring';

interface ResultScreenProps {
  scores: ScoreResult[];
  onReset: () => void;
}

export const ResultScreen = ({ scores, onReset }: ResultScreenProps) => {
  const getScoreClass = (score: number): string => {
    if (score >= 75) return 'score-high';
    if (score >= 50) return 'score-medium';
    if (score >= 25) return 'score-low';
    return 'score-very-low';
  };

  const averageScore = Math.round(
    scores.reduce((sum, s) => sum + s.transformedScore, 0) / scores.length
  );

  return (
    <div className="result-screen">
      <h2>Результаты оценки качества жизни</h2>
      
      <div className="average-score">
        <h3>Средний балл</h3>
        <div className={`average-score-value ${getScoreClass(averageScore)}`}>
          {averageScore} / 100
        </div>
        <p className="average-interpretation">{getInterpretation(averageScore)}</p>
      </div>

      <div className="scores-grid">
        {scores.map((score) => (
          <div key={score.domain} className="score-card">
            <div className="score-card-header">
              <h3>{score.name}</h3>
              <span className="score-domain-badge">{score.domain}</span>
            </div>
            <p className="score-description">{score.description}</p>
            <div className={`score-value ${getScoreClass(score.transformedScore)}`}>
              {score.transformedScore} / 100
            </div>
            <p className="score-interpretation">{getInterpretation(score.transformedScore)}</p>
            <p className="score-raw">Сырой балл: {score.rawScore}</p>
            {score.answeredCount < score.totalQuestions && (
              <p className="warning">
                ⚠️ Отвечено {score.answeredCount} из {score.totalQuestions} вопросов
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="result-actions">
        <button className="button button--primary button--large" onClick={onReset}>
          Пройти опрос заново
        </button>
      </div>

      <div className="result-info">
        <h3>Интерпретация результатов</h3>
        <ul>
          <li><strong>75-100 баллов:</strong> Высокое качество жизни</li>
          <li><strong>50-74 балла:</strong> Среднее качество жизни</li>
          <li><strong>25-49 баллов:</strong> Низкое качество жизни</li>
          <li><strong>0-24 балла:</strong> Очень низкое качество жизни</li>
        </ul>
        <p className="disclaimer">
          Данный калькулятор предназначен для образовательных целей. 
          Для профессиональной медицинской оценки обратитесь к специалисту.
        </p>
      </div>
    </div>
  );
};