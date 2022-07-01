import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onCancelClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {getAlertMessage(props.selectedItems)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onCancelClick}>Go back</Button>
                    {props.selectedItems.length > 0 &&
                        <Button onClick={props.onDeleteClick} >
                            Delete
                        </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
function getAlertMessage(selectedItems) {
    return selectedItems.length > 0 ?
        "Are you sure you want to delete selected items?"
        : "No items are selected for deletion. Please select one"
};