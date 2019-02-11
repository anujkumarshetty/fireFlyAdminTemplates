import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DialogComponent extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     open: false,
        //     scroll: 'body',
        // };
    }


    handleClickOpen = () => {
        // this.setState({ open: true });
    };

    handleClose = () => {
        this.props.handleDialogBoxClose();
    };

    render() {
        return (
            <div>
                {/* <Button onClick={this.handleClickOpen('paper')}>scroll=paper</Button>
                <Button onClick={this.handleClickOpen('body')}>scroll=body</Button> */}
                <Dialog
                    open={this.props.openDialog}
                    onClose={this.handleClose}
                    // scroll={"paper"}
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogTitle id="scroll-dialog-title">Letter Template</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.viewImageData ? <iframe width="800px" height="800px" src={this.props.viewImageData}>
                                <p>Your browser does not support iframes.</p>
                            </iframe> : "No Content.!!"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DialogComponent;
