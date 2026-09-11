import type { SF36Question } from '../types';

interface QuestionCardProps {
  question: SF36Question;
  selectedValue: number | undefined;
  onSelect: (value: number) => void;
  index: number;
}

export const QuestionCard = ({ question, selectedValue, onSelect, index }: QuestionCardProps) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">Вопрос {index + 1}</span>
        <span className="question-domain">{question.domain}</span>
      </div>
      <p className="question-text">{question.text}</p>
      <div className="options-group">
        {question.options.map((opt, optIndex) => (
          <label 
            key={`${question.id}-${optIndex}`} 
            className={`option-label ${selectedValue === opt.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={question.id}
              value={opt.value}
              checked={selectedValue === opt.value}
              onChange={() => onSelect(opt.value)}
              className="option-input"
            />
            <span className="option-text">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};