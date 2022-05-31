import React, { useState } from "react";
import "./App.css";

import GoalList from "./components/GoalList/GoalList.js";
import NewGoal from "./components/NewGoal/NewGoal.js";

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    { id: "cg1", text: "Finish the Course" },
    { id: "cg1", text: "Learn All About the Main Concepts" },
    { id: "cg1", text: "Have Fun!" },
  ]);

  const addNewGoalHandler = (newGoal) => {
    //setCourseGoals(courseGoals.concat(newGoal))
    setCourseGoals(prevCourseGoals => prevCourseGoals.concat(newGoal));
  }

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
};

export default App;
