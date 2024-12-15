import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "./ProgressMeter.css"; // Importing custom CSS

const ProgressMeter = ({ goal, current, label }) => {
  const [percentage, setPercentage] = useState(0);

  // Calculate the percentage dynamically
  useEffect(() => {
    if (goal > 0) {
      setPercentage(Math.min((current / goal) * 100, 100)); // Ensure max percentage is 100
    }
  }, [goal, current]);

  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#22C55E", "#D6D6D6"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="progress-meter-container">
      <div className="chart-container">
        <Chart type="doughnut" data={data} options={options} />
        <div className="percentage-overlay">{Math.round(percentage)}%</div>
      </div>
      <p className="progress-label">{label}</p>
    </div>
  );
};

export default ProgressMeter;
