import * as React from "react";

// Third Party Components
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import ExpenseCreate from "./components/ExpenseCreate";
import HeaderBar from "./components/HeaderBar";

class App extends React.Component {
  public render() {
    return (
      <CssBaseline>
        <div>
          <HeaderBar />
          <ExpenseCreate />
        </div>
      </CssBaseline>
    );
  }
}

export default App;
