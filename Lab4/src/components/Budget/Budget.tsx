import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {

  const  {budget, setBudget} = useContext(AppContext); 

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value)); 
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <input
        required
        type="text"
        className="form-control"
        id="budget"
        value={budget}
        onChange={handleBudgetChange}    
      ></input>

    </div>
  );
};

export default Budget;
