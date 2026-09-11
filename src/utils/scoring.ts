import type { Domain, ScoreResult } from '../types';
import { questions, domainInfo } from '../config/questions';

export const calculateSF36Scores = (answers: Record<string, number>): ScoreResult[] => {
  const domains = Object.keys(domainInfo) as Domain[];
  const results: ScoreResult[] = [];

  domains.forEach((domain) => {
    const domainQuestions = questions.filter((q) => q.domain === domain);
    const totalQuestions = domainQuestions.length;
    
    let rawScore = 0;
    let answeredCount = 0;

    domainQuestions.forEach((q) => {
      if (answers[q.id] !== undefined) {
        rawScore += answers[q.id];
        answeredCount++;
      }
    });

    const minPossible = domainQuestions.reduce(
      (sum, q) => sum + Math.min(...q.options.map((opt) => opt.value)),
      0
    );
    const maxPossible = domainQuestions.reduce(
      (sum, q) => sum + Math.max(...q.options.map((opt) => opt.value)),
      0
    );

    let transformedScore = 0;
    if (maxPossible > minPossible) {
      transformedScore = ((rawScore - minPossible) / (maxPossible - minPossible)) * 100;
    }

    results.push({
      domain,
      name: domainInfo[domain].name,
      description: domainInfo[domain].description,
      rawScore: Math.round(rawScore * 100) / 100,
      transformedScore: Math.round(transformedScore),
      answeredCount,
      totalQuestions,
    });
  });

  return results;
};

export const getInterpretation = (score: number): string => {
  if (score >= 75) return 'Высокое качество жизни';
  if (score >= 50) return 'Среднее качество жизни';
  if (score >= 25) return 'Низкое качество жизни';
  return 'Очень низкое качество жизни';
};