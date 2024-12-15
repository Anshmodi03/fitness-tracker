import React, { useState } from "react";
import { useGoals } from "./GoalContext"; // Corrected import
import { InputNumber } from "primereact/inputnumber"; // PrimeReact InputNumber
import { Button } from "primereact/button"; // PrimeReact Button
import { Toast } from "primereact/toast"; // PrimeReact Toast
import "./FitnessStats.css"; // Importing custom CSS

const FitnessStats = () => {
  const { goals, updateGoal } = useGoals(); // Access global goals and updater function
  const [localGoals, setLocalGoals] = useState(goals); // Temporary local state for edits
  const toast = React.useRef(null); // Toast ref for notifications

  const handleSaveGoals = () => {
    // Update each goal using the provided updateGoal function
    updateGoal("stepsGoal", localGoals.stepsGoal);
    updateGoal("caloriesGoal", localGoals.caloriesGoal);
    updateGoal("weightGoal", localGoals.weightGoal);

    // Show success toast and hide after 3 seconds
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Goals updated successfully!",
      life: 3000, // Toast disappears after 3 seconds
    });
  };

  return (
    <div className="fitness-stats-container">
      <Toast ref={toast} /> {/* Toast Notification for Success */}
      <h3>Set Your Personal Goals</h3>
      <div className="input-group">
        <label>Steps Goal:</label>
        <InputNumber
          value={localGoals.stepsGoal}
          onValueChange={(e) =>
            setLocalGoals((prev) => ({ ...prev, stepsGoal: e.value }))
          }
          className="input-field"
          min={0}
          showButtons
        />
      </div>
      <div className="input-group">
        <label>Calories Goal:</label>
        <InputNumber
          value={localGoals.caloriesGoal}
          onValueChange={(e) =>
            setLocalGoals((prev) => ({ ...prev, caloriesGoal: e.value }))
          }
          className="input-field"
          min={0}
          showButtons
        />
      </div>
      <div className="input-group">
        <label>Weight Goal (kg):</label>
        <InputNumber
          value={localGoals.weightGoal}
          onValueChange={(e) =>
            setLocalGoals((prev) => ({ ...prev, weightGoal: e.value }))
          }
          className="input-field"
          min={0}
          showButtons
        />
      </div>
      <Button
        label="Save Goals"
        icon="pi pi-check"
        className="save-button"
        onClick={handleSaveGoals}
      />
    </div>
  );
};

export default FitnessStats;
