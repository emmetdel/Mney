import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { firestore } from "firebase";
import * as React from "react";
import PaperCenter from './PaperCenter';

interface ITableProps {
    expenses: firestore.QueryDocumentSnapshot[]
    loading: boolean
}

class ExpenseTable extends React.Component<ITableProps, {}> {
    constructor(props: ITableProps) {
        super(props);
    }
    public render() {
        const isTableEmpty: boolean = this.props.expenses.length < 1;

        return (
            <div style={{ marginTop: '15px' }}>
                {!isTableEmpty && !this.props.loading ?
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell numeric={true}>Cost</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.expenses.map(n => {
                                    let i = 0;
                                    return (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {n.data().expenseDescription}
                                            </TableCell>
                                            <TableCell numeric={true}>{n.data().expenseAmount}</TableCell>
                                        </TableRow>
                                    );
                                    i++;
                                })}
                            </TableBody>
                        </Table>
                    </Paper> : <PaperCenter><h3>There is no expenses.</h3></PaperCenter>
                }

            </div>
        );
    }
}

export default ExpenseTable;