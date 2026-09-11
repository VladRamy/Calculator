interface ProgressBarProps {
  answeredCount: number;
  total: number;
}

export const ProgressBar = ({ answeredCount, total }: ProgressBarProps) => {
  const percent = Math.round((answeredCount / total) * 100);
  
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-text">
          Отвечено: {answeredCount} из {total} вопросов
        </span>
        <span className="progress-percent">{percent}%</span>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};