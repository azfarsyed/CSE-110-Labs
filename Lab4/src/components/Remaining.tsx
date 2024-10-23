import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Budget from "./Budget/Budget";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const remaining = budget - totalExpenses
  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";
  
  let alertMessage;
   useEffect(() => {
    if (remaining < 0) {
      alert("You have exceeded your budget!"); 
    }
  }, [remaining]);

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
