import React, { createContext, useContext, useState } from "react";

// Create a context for managing goals
const GoalContext = createContext();

// Custom hook to use the GoalContext
export const useGoals = () => useContext(GoalContext);

// GoalProvider component to wrap around the app
export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState({
    stepsGoal: 5000, // Default steps goal
    caloriesGoal: 2000, // Default calories goal
    weightGoal: 70, // Default weight goal
  });

  // Function to update a specific goal
  const updateGoal = (goalType, value) => {
    setGoals((prevGoals) => ({
      ...prevGoals,
      [goalType]: value,
    }));
  };

  return (
    <GoalContext.Provider value={{ goals, updateGoal }}>
      {children}
    </GoalContext.Provider>
  );
};
