import * as React from "react";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

import "../css/expensecreate.css";

class ExpenseCreate extends React.Component<{}, { expense: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      expense: ""
    };
  }

  public handleExpenseInput = (expense: string) => {
    this.setState({ expense });
  };

  public render() {
    return (
      <section className="outer-container">
        <div className="inner-container">
          <Card>
            <TextField
              id="name"
              label="Name"
              value={this.state.expense}
              // onChange={this.handleExpenseInput(expense))}
              margin="normal"
            />
          </Card>
        </div>
      </section>
    );
  }
}

export default ExpenseCreate;
