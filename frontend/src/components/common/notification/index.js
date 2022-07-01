import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//Dung redux o component to nhat o ngoai ma add vao, can customize lai component nay

export default function CustomizedSnackbars(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
                <Alert severity="error">This is an error message!</Alert>
                <Alert severity="warning">This is a warning message!</Alert>
                <Alert severity="info">This is an information message!</Alert>
                <Alert severity="success">This is a success message!</Alert>
            </Snackbar>
        </Stack>
    );
}
