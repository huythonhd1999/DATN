import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '0.5px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SaveOrderToDraftModal(props) {
    const handleClose = (_event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        props.onClose()
    }


    const [notes, setNotes] = React.useState(props?.order?.draftNotes || "")


    const handleClickSave = () => {
        props.onSave(notes)
        props.onClose()
    }

    const handleRemove = () => {
        props.onRemove()
        props.onClose()
    }

    return (
        <div className='draft-order-modal'>
            <Modal
                open={!!props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            {!!!props.onRemove ? "Save and New" : "Edit Draft Order"}
                        </div>
                        <div className='modal-info'>
                            <div className='groups'>
                                <div className="c-text-field-name-1">Draft Name</div>
                                <TextField
                                    margin="normal"
                                    required
                                    sx={{ marginBottom: 0, marginTop: 0 }}
                                    value={notes}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                            <div className='controller'>
                                <Button
                                    type="cancel"
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2, mr: 1 }}
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </Button>
                                {
                                    props.onRemove &&
                                    <Button
                                        type="cancel"
                                        variant="outlined"
                                        sx={{ mt: 3, mb: 2, mr: 1 }}
                                        onClick={() => handleRemove()}
                                    >
                                        Remove
                                    </Button>
                                }
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => handleClickSave()}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
