import { createContext, useState } from "react";
import { Expense } from "../types/types";
import Budget from "../components/Budget/Budget";


// Exercise: Create add budget to the context


interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget:number; 
  setBudget: React.Dispatch<React.SetStateAction<number>>;
  remaining: number; 
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 1000, // Set an initial budget
  setBudget: () => {},
  remaining : 0,  
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget); // Budget state
  const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
  const remaining = budget - totalExpenses;

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget: budget, 
        setBudget: setBudget, 
        remaining, 
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
