import * as React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import * as Spinner from "react-spinkit"

import fire from "../fire";

import { firestore } from "firebase";

import "../css/expensecreate.css";
import ExpenseTable from "./ExpenseTable";
import PaperCenter from "./PaperCenter";

const db = fire.firestore();
db.settings({ timestampsInSnapshots: true });

interface IExpenseState {
  expenseDescription: string;
  expenseAmount: number;
  expenseList: firestore.QueryDocumentSnapshot[];
  loading: boolean;
  descriptionError: boolean;
  amountError: boolean;

}

class ExpenseCreate extends React.Component<{}, IExpenseState> {
  constructor(props: any) {
    super(props);
    this.state = {
      amountError: false,
      descriptionError: false,
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
      .get()
      .then(snap => {
        this.setState({ loading: true });
        const arr: firestore.QueryDocumentSnapshot[] = [];
        snap.forEach(doc => {
          arr.push(doc);
        });
        this.setState({ expenseList: arr, loading: false });

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

    if (this.state.expenseDescription.length === 0) {
      console.log('hit1')
      this.setState({ descriptionError: true })
    }
    if (this.state.expenseAmount === 0) {
      console.log('hit2')
      this.setState({ amountError: true })
    }
    // console.log(this.state);
    // console.log(this.state.expenseAmount);

    // console.log(this.state.descriptionError);
    // console.log(this.state.amountError);

    if (!this.state.amountError && !this.state.descriptionError) {
      db.collection("Expenses").add({
        DateAdded: Date.now(),
        expenseAmount: this.state.expenseAmount,
        expenseDescription: this.state.expenseDescription
      });
      this.setState({ expenseAmount: 0, expenseDescription: "" });
      this.expenseList();
    }

  }

  public render() {
    return (
      <section className="outer-container">
        <div className="inner-container">
          <Card style={{ padding: "15px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                error={this.state.descriptionError}
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
                error={this.state.amountError}
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
            <ExpenseTable expenses={this.state.expenseList} loading={this.state.loading} /> :
            <PaperCenter>
              <Spinner fadeIn="none" color="black" />
              <h3 style={{ marginLeft: '9.5px' }}>Loading...</h3>
            </PaperCenter>
          }
        </div>
      </section>
    );
  }
}


export default ExpenseCreate;
