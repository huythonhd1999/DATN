import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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

export default function SellModal(props) {
    const handleClose = (_event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        props.onClose()
    }
    const [selectedVariant, setSelectedVariant] = React.useState({})
    const [selectedAddons, setSelectedAddons] = React.useState([])
    const [quantity, setQuantity] = React.useState(0)

    return (
        <div>
            <Modal
                open={!!props.product}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            Select options for {props.product.name}
                        </div>
                        <div className='modal-info'>
                            <div className='groups'>
                                <div className="c-text-field-name-1">Select variants</div>
                                <Autocomplete
                                    id="variants"
                                    options={productVariants}
                                    groupBy={(option) => option.variantGroup}
                                    getOptionLabel={(option) => option?.name || ""}
                                    onChange={(_event, value) => setSelectedVariant(value)}
                                    value={selectedVariant}
                                    renderInput={(params) => <TextField {...params} fullWidth size='small' placeholder="Select a variant of product" />}
                                />
                            </div>
                            <div className='groups'>
                                <div className="c-text-field-name-1">Select addons</div>
                                <Autocomplete
                                    id="variants"
                                    options={productAddons}
                                    groupBy={(option) => option.addonGroup}
                                    getOptionLabel={(option) => option?.name || ""}
                                    filterSelectedOptions
                                    multiple
                                    value={selectedAddons}
                                    onChange={(_event, value) => setSelectedAddons(value)}
                                    renderInput={(params) => <TextField {...params} fullWidth size='small' placeholder='Select addons of product' />}
                                />
                            </div>
                            <div className='groups'>
                                <div className="c-text-field-name-1">Quantity</div>
                                <TextField
                                    type="number"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    size="small"
                                    value={quantity}
                                    onChange={(e) => {
                                        let regExCheckNumber = /^[0-9]+[0-9]*$|^$/
                                        const newValue = e.target.value
                                        if (regExCheckNumber.test(newValue) || newValue === undefined) {
                                            setQuantity(newValue)
                                        }
                                    }}
                                    fullWidth
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
                                    onClick={() => handleClose()}
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

const productVariants = [
    {
        id: 1,
        name: "variant test",
        price: 100,
        variantGroup: "Variant Group 1"
    },
    {
        id: 2,
        name: "variant test 2",
        price: 100,
        variantGroup: "Variant Group 1"
    },
    {
        id: 1,
        name: "variant test 3",
        price: 100,
        variantGroup: "Variant Group 2"
    },
    {
        id: 1,
        name: "variant test 4",
        price: 100,
        variantGroup: "Variant Group 2"
    },
    {
        id: 1,
        name: "variant test 5",
        price: 100,
        variantGroup: "Variant Group 3"
    },
]

const productAddons = [
    {
        id: 1,
        name: "addon test",
        price: 100,
        addonGroup: "Addon Group 1"
    },
    {
        id: 2,
        name: "addon test 2",
        price: 100,
        addonGroup: "Addon Group 1"
    },
    {
        id: 1,
        name: "addon test 3",
        price: 100,
        addonGroup: "Addon Group 2"
    },
    {
        id: 1,
        name: "addon test 4",
        price: 100,
        addonGroup: "Addon Group 2"
    },
    {
        id: 1,
        name: "addon test 5",
        price: 100,
        addonGroup: "Addon Group 3"
    },
]