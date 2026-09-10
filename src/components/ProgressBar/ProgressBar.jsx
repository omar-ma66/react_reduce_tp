import "./ProgressBar.css";

function ProgressBar({ pv, pvMax, faType, barName, bgType }) {
  // Calcul du pourcentage de la barre
  const percentage = Math.max(0, Math.min(100, (pv * 100) / pvMax));

  // Association du bgType Bootstrap aux classes CSS pures
  let colorClass = "bar-danger";
  if (bgType === "bg-primary") {
    colorClass = "bar-primary";
  } else if (bgType === "bg-success") {
    colorClass = "bar-success";
  }

  return (
    <div className="progress-container">
      <div
        className={`progress-bar-fill ${colorClass}`}
        style={{ width: `${percentage}%` }}
        aria-valuenow={pv}
        aria-valuemin="0"
        aria-valuemax={pvMax}
        role="progressbar"
      >
        <span className="progress-bar-text">
          <i className={`fas ${faType}`}></i> {pv} {barName}
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;