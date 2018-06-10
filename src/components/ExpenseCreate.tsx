import * as React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import * as Spinner from "react-spinkit"

import fire from "../fire";

import { firestore } from "firebase";

import "../css/expensecreate.css";

const db = fire.firestore();
db.settings({ timestampsInSnapshots: true });

interface IExpenseState {
  expenseDescription: string;
  expenseAmount: number;
  expenseList: firestore.QueryDocumentSnapshot[];
  loading: boolean
}

class ExpenseCreate extends React.Component<{}, IExpenseState> {
  constructor() {
    super({});
    this.state = {
      expenseAmount: 0,
      expenseDescription: "",
      expenseList: [],
      loading: true,
    };
    this.handleDescription = this.handleDescription.bind(this);
    this.handleExpense = this.handleExpense.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
    this.expenseList = this.expenseList.bind(this);

    this.expenseList();
  }

  public expenseList() {
    db.collection("Expenses")
      .orderBy("DateAdded", "desc")
      .onSnapshot(snap => {
        this.setState({ loading: true });
        const arr: firestore.QueryDocumentSnapshot[] = [];
        snap.forEach(doc => {
          arr.push(doc);
        });
        if (arr.length > 0) {
          this.setState({ expenseList: arr, loading: false });
        }
      });
  }

  public handleDescription(event: React.ChangeEvent<HTMLInputElement>): void {
    const expenseDescription: string = event.target.value;
    this.setState({ expenseDescription });
  }

  public handleExpense(event: React.ChangeEvent<HTMLInputElement>): void {
    const expenseAmountStr: string = event.target.value;
    const expenseAmount: number = parseInt(expenseAmountStr, 10);
    this.setState({ expenseAmount });
  }

  public submitExpense() {
    db.collection("Expenses").add({
      DateAdded: Date.now(),
      expenseAmount: this.state.expenseAmount,
      expenseDescription: this.state.expenseDescription
    });

    this.setState({ expenseAmount: 0, expenseDescription: "" });
    console.log(this.state);
  }

  public render() {
    return (
      <section className="outer-container">
        <div className="inner-container">
          <Card style={{ padding: "15px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                id="description"
                label="Expense Description"
                value={this.state.expenseDescription}
                onChange={this.handleDescription}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                style={{ marginRight: "10px", flex: 4 }}
              />
              <TextField
                id="expenseAmount"
                label="Amount(€)"
                value={this.state.expenseAmount}
                onChange={this.handleExpense}
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="0"
                margin="normal"
                style={{ flex: 1 }}
              />
            </div>
            <Button
              style={{ border: "1px solid black", marginTop: "5px" }}
              onClick={this.submitExpense}
            >
              Add Expense
            </Button>
          </Card>
          {!this.state.loading ?
            <Card style={{ marginTop: "15px" }}>
              <List>
                {this.state.expenseList
                  ? this.state.expenseList.map((doc, index) => {
                    return (
                      <ListItem key={index}>
                        <label>Amount: {doc.data().expenseAmount} - </label>
                        Description: {doc.data().expenseDescription}
                      </ListItem>
                    );
                  })
                  : null
                }
              </List>

            </Card>
            : <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                height: '120px',
                justifyContent: 'center',
                width: '100%',
              }}>
              <Spinner fadeIn="none" color="black" />
              <h3 style={{ marginLeft: '9.5px' }}>Loading...</h3></div>}
        </div>
      </section>
    );
  }
}

export default ExpenseCreate;
