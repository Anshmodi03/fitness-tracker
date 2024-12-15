import React, { useState } from "react";
import { Button } from "primereact/button"; // Import Button for navigation
import WelcomeScreen from "./WelcomeScreen"; // Importing WelcomeScreen component
import ProgressMeter from "./ProgressMeter"; // Importing ProgressMeter component
import { useGoals } from "./GoalContext"; // Corrected import
import metsData from "./../data/mets.json"; // Importing METs data
import "./ActivityLog.css"; // Importing custom CSS

const ActivityLog = () => {
  const { goals } = useGoals(); // Access the global goals for steps, calories, and weight
  const [currentDay, setCurrentDay] = useState(0);
  const activitiesPerDay = 4; // Number of activities shown per day

  // Sliced data for the current day
  const currentActivities = metsData.slice(
    currentDay * activitiesPerDay,
    (currentDay + 1) * activitiesPerDay
  );

  // Calculations for current day's totals
  const totalSteps = currentActivities.reduce(
    (acc, activity) => acc + Math.round(activity.met * 100), // Example step calculation
    0
  );
  const totalCalories = currentActivities.reduce(
    (acc, activity) => acc + activity.met * 50, // Example calorie calculation
    0
  );

  const percentageSteps = (totalSteps / goals.stepsGoal) * 100;
  const percentageCalories = (totalCalories / goals.caloriesGoal) * 100;
  const weightProgress = (60 / goals.weightGoal) * 100; // Example weight calculation

  // Calculate the date for the current day
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - currentDay);

  return (
    <div className="activity-log-container">
      {/* Display WelcomeScreen with dynamic data */}
      <WelcomeScreen
        totalSteps={totalSteps}
        totalCalories={totalCalories}
        stepsGoal={goals.stepsGoal}
        caloriesGoal={goals.caloriesGoal} // Pass dynamic calorie goal
        percentageSteps={percentageSteps}
        percentageCalories={percentageCalories} // Pass dynamic calorie percentage
      />

      {/* Display the current date */}
      <div className="date-section">
        <span>{currentDate.toDateString()}</span>
      </div>

      {/* Navigation Buttons with Date */}
      <div className="navigation-buttons">
        <Button
          label="Next Day"
          className="p-button-sm p-button-secondary"
          onClick={() => setCurrentDay((prev) => Math.max(prev - 1, 0))}
          disabled={currentDay === 0}
        />

        <Button
          label="Previous Day"
          className="p-button-sm p-button-secondary"
          onClick={() =>
            setCurrentDay((prev) =>
              prev < Math.ceil(metsData.length / activitiesPerDay) - 1
                ? prev + 1
                : prev
            )
          }
          disabled={
            currentDay >= Math.ceil(metsData.length / activitiesPerDay) - 1
          }
        />
      </div>

      {/* Activity Log Table */}
      <div className="activity-log-table">
        <table className="activity-table">
          <thead>
            <tr>
              <th>ACTIVITY</th>
              <th>MOTION</th>
              <th>MET</th>
            </tr>
          </thead>
          <tbody>
            {currentActivities.map((act, index) => (
              <tr key={index}>
                <td>{act.activity}</td>
                <td>{act.motion}</td>
                <td>{act.met}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Progress Meters */}
      <div className="progress-container">
        <ProgressMeter
          goal={goals.stepsGoal}
          current={totalSteps}
          label=" Steps"
        />
        <ProgressMeter
          goal={goals.caloriesGoal}
          current={totalCalories}
          label="Calories Burnt"
        />
        <ProgressMeter
          goal={goals.weightGoal}
          current={weightProgress}
          label="Goal Weight"
        />
      </div>
    </div>
  );
};

export default ActivityLog;
