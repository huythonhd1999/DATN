import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
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

export default function CancelOrderModal(props) {
    const handleClose = (_event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        props.onClose()
    }

    const [paymentType, setPaymentType] = React.useState(1)
    const [refundAmount, setRefundAmount] = React.useState(0)
    const [notes, setNotes] = React.useState("")
    const [refundAmountError, setRefundAmountError] = React.useState("")


    const handelRefundAmountChange = (e) => {
        let regEx = new RegExp("^[1-9]+[0-9]*$|^$")
        if (regEx.test(e.target.value)) {
            setRefundAmount(e.target.value)
            if (e.target.value > props.orderDetail.total) {
                setRefundAmountError("Can not set the refund amount greater than the total order value")
            } else if (e.target.value > props.orderDetail?.bookingInfo?.bookingAdvance) {
                setRefundAmountError("Can not set the refund amount greater than the booking advance")
            } else if (!!!e.target.value) {
                setRefundAmountError("Can not let this field empty")
            }
            else {
                setRefundAmountError("")
            }
        }
    }
    const handleClickSave =  () => {
        if (refundAmountError) {
            return
        }
        const canceledOrderInfo = {
            orderId: props.orderDetail?.Id,
            refundAmount: refundAmount,
            paymentType: paymentType,
            notes: notes
        }
        props.onClickSave(canceledOrderInfo)
        props.onClose()
    }

    return (
        <div className='canceled-order-model'>
            <Modal
                open={!!props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            Confirm Cancel Order
                        </div>
                        <div className='modal-info'>
                            <div className='groups'>
                                <div className="c-text-field-name-1">Refund Payment Type</div>
                                <FormControl variant="outlined" size="small" fullWidth>
                                    <Select
                                        value={paymentType}
                                        onChange={(e) => setPaymentType(e.target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value={1}>Cash</MenuItem>
                                        <MenuItem value={2}>Credit/Debit Card</MenuItem>
                                        <MenuItem value={3}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='groups'>
                                <div className="c-text-field-name-1">Enter Refund Amount</div>
                                <TextField
                                    margin="normal"
                                    required
                                    value={refundAmount}
                                    fullWidth
                                    sx={{marginBottom: 0, marginTop: 0}}
                                    size="small"
                                    error={refundAmountError === "" ? false : true}
                                    helperText={refundAmountError}
                                    onChange={(e) => handelRefundAmountChange(e)}
                                />
                            </div>
                            <div className='groups'>
                                <div className="c-text-field-name-1">Cancellation Notes</div>
                                <TextField
                                    margin="normal"
                                    required
                                    sx={{marginBottom: 0, marginTop: 0}}
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
