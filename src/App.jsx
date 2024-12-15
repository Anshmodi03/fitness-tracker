import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoalProvider } from "./components/GoalContext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Header from "./components/Header";
import ActivityLog from "./components/ActivityLog";
import FitnessStats from "./components/FitnessStats";
import ActivityLogTable from "./components/ActivityLogTable";
import { Card } from "primereact/card";
import "./App.css";

function App() {
  return (
    <GoalProvider>
      <Router>
        <div className="app-container">
          <Card className="app-card">
            <Header className="header" />
            <Routes>
              <Route path="/" element={<ActivityLog />} />
              <Route path="/activity-log" element={<ActivityLogTable />} />
              <Route path="/fitness-stats" element={<FitnessStats />} />
            </Routes>
          </Card>
        </div>
      </Router>
    </GoalProvider>
  );
}

export default App;
