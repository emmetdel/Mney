import Paper from '@material-ui/core/Paper';
import * as React from "react";

class PaperCenter extends React.Component {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <Paper
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '120px',
                    justifyContent: 'center',
                    marginTop: '15px',
                    width: '100%',
                }}
            >
                {this.props.children}
            </Paper>
        );
    }
};

export default PaperCenter;