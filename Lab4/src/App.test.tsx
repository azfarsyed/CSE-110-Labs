import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from './context/AppContext';
import { MyBudgetTracker } from './views/MyBudgetTracker';
import { Expense } from "./types/types";


describe('Expense Tracker Tests', () => {
  beforeEach(() => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );
  });

  const addExpense = (name:string, cost:number) => {
    const nameInput = screen.getByLabelText(/name/i);
    const costInput = screen.getByLabelText(/cost/i);
    const addButton = screen.getByRole('button', { name: /save/i });

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(costInput, { target: { value: cost } });
    fireEvent.click(addButton);
  };

  test("Create an Expense", () => {
    addExpense('Nintendo', 300);

    expect(screen.getByText(/nintendo/i)).toBeInTheDocument();
    expect(screen.getByText(/remaining: \$700/i)).toBeInTheDocument();
    expect(screen.getByText(/spent so far: \$300/i)).toBeInTheDocument();
  });

  test("Delete an Expense", () => {
    addExpense('Nintendo', 300);
    
    const deleteButton = screen.getByRole('button', { name: /x/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/Nintendo/i)).not.toBeInTheDocument();
    expect(screen.getByText(/remaining: \$1000/i)).toBeInTheDocument();
    expect(screen.getByText(/spent so far: \$0/i)).toBeInTheDocument();
  });

  test("Add Multiple Expenses and Validate Remaining and Spent", () => {
    addExpense('Nintendo', 300);
    addExpense('Laptop', 400);
    addExpense('Coffee', 50);

    expect(screen.getByText(/nintendo/i)).toBeInTheDocument();
    expect(screen.getByText(/laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/coffee/i)).toBeInTheDocument();

    expect(screen.getByText(/remaining: \$250/i)).toBeInTheDocument(); 
    expect(screen.getByText(/spent so far: \$750/i)).toBeInTheDocument(); 
  });

  test("Delete an Expense after Multiple Expenses", () => {
    addExpense('Nintendo', 300);
    addExpense('Laptop', 400);
    addExpense('Coffee', 50);

    const deleteButton = screen.getAllByRole('button', { name: /x/i })[1]; 
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/laptop/i)).not.toBeInTheDocument();
    expect(screen.getByText(/remaining: \$650/i)).toBeInTheDocument(); 
    expect(screen.getByText(/spent so far: \$350/i)).toBeInTheDocument(); 
  });

  test("Budget Verification", () => {
    addExpense('Nintendo', 300);

    expect(screen.getByText(/remaining: \$700/i)).toBeInTheDocument();
    expect(screen.getByText(/spent so far: \$300/i)).toBeInTheDocument();

    addExpense('Laptop', 400);
    addExpense('Coffee', 50);
    const remainingText = screen.getByText(/remaining: \$/i)?.textContent;
    const spentText = screen.getByText(/spent so far: \$/i)?.textContent;
    
    if (remainingText && spentText) {
        const remainingValue = parseInt(remainingText.split('$')[1]);
        const spentValue = parseInt(spentText.split('$')[1]);
    
        expect(remainingValue + spentValue).toBe(1000); 
    } else {
        throw new Error("Remaining or Spent text is null");
    }

    const deleteButtons = screen.getAllByRole('button', { name: /x/i });
    fireEvent.click(deleteButtons[0]); 
    fireEvent.click(deleteButtons[0]);

    const remainingText2 = screen.getByText(/remaining: \$/i)?.textContent;
    const spentText2 = screen.getByText(/spent so far: \$/i)?.textContent;
  

    expect(screen.getByText(/remaining: \$950/i)).toBeInTheDocument();
    expect(screen.getByText(/spent so far: \$50/i)).toBeInTheDocument();

    if (remainingText2 && spentText2) {
      const remainingValue2 = parseInt(remainingText2.split('$')[1]);
      const spentValue2 = parseInt(spentText2.split('$')[1]);
  
      expect(remainingValue2 + spentValue2).toBe(1000);
    } else {
      throw new Error("Remaining or Spent text is null");
    }
  });
});