import React from "react";
import "./WelcomeScreen.css"; // Importing custom CSS
import "./text.css";

const WelcomeScreen = ({
  totalSteps,
  totalCalories,
  stepsGoal,
  caloriesGoal,
  percentageSteps,
  percentageCalories,
}) => {
  return (
    <div className="welcome-screen-container">
      <div className="wrapper">
        <svg>
          <text x="50%" y="50%" dy=".55em" textAnchor="middle">
            Fitness Tracker
          </text>
        </svg>
        {/* Slogan */}
        <div className="slogan">
          <p>Track your journey, achieve your goals.</p>
          <p>Your fitness, your way!</p>
        </div>
      </div>
      <h2>Fitness Rundown</h2>
      <p>
        You've logged <strong>{totalSteps}</strong> steps today. Keep going to
        hit your {stepsGoal} steps goal!
      </p>
      <p>
        Calories Burnt: <strong>{totalCalories}</strong> Cal. Your goal is{" "}
        {caloriesGoal} Cal.
      </p>
      <p>
        You are <strong>{Math.min(percentageSteps, 100).toFixed(2)}%</strong>{" "}
        towards your {stepsGoal} steps goal.
      </p>
      <p>
        You are <strong>{Math.min(percentageCalories, 100).toFixed(2)}%</strong>{" "}
        towards your {caloriesGoal} calorie goal.
      </p>
    </div>
  );
};

export default WelcomeScreen;
