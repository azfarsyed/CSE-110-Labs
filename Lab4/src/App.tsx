import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./context/AppContext";
import { MyBudgetTracker } from "./views/MyBudgetTracker";

const App = () => {
  // HINT: Wrap the MyBudgetTracker component with AppContextProvider

  return (
    <AppProvider>
      <MyBudgetTracker /> 
    </AppProvider>

  )
};

export default App;
