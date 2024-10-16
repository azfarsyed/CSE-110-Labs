import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      name: "John's List" 
    }),
  }));

describe("ToDoList component", () => {
  test("display all items", () => {
    render(<ToDoList />);
    dummyGroceryList.forEach((item) => {
        const checkbox = screen.getByLabelText(item.name);
        expect(checkbox).toBeInTheDocument();  
        console.log(item.name); 
    });
  });

  test("updates number of checked items", () => {
    render(<ToDoList />);
    expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
    const firstCheckbox = screen.getByRole("checkbox", {
      name: dummyGroceryList[0].name,
    });
    fireEvent.click(firstCheckbox);
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

    const secondCheckbox = screen.getByRole("checkbox", {
      name: dummyGroceryList[1].name,
    });
    fireEvent.click(secondCheckbox);

    expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

    fireEvent.click(firstCheckbox);

    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  });
});