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

    const [selectedVariant, setSelectedVariant] = React.useState(props.product.selectedVariant || props.product.variantList[0] || props.product.baseVariantInfo)
    const [selectedAddons, setSelectedAddons] = React.useState(props.product.selectedAddons || [])
    const [quantity, setQuantity] = React.useState(props.product.quantity || 1)

    const handleSave = () => {
        const orderItem = {
            ...props.product,
            selectedVariant: selectedVariant,
            selectedAddons: selectedAddons,
            quantity: quantity
        }
        props.onSave(orderItem)
        props.onClose()
    }

    const handleRemove = () => {
        props.onRemove()
        props.onClose()
    }

    // React.useEffect(() => {
    //     setSelectedVariant(props.product.variantList[0])
    // }, []);

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
                                    options={props.product.variantList}
                                    groupBy={(option) => option.variantGroupName}
                                    getOptionLabel={(option) => option?.name || ""}
                                    isOptionEqualToValue={(option, value) =>
                                        option.Id === value.Id
                                    }
                                    onChange={(_event, value) => setSelectedVariant(value)}
                                    value={selectedVariant}
                                    disabled={props.product.variantList.length === 0}
                                    disableClearable
                                    renderInput={(params) => <TextField {...params} fullWidth size='small' placeholder="Select a variant of product" />}
                                />
                            </div>
                            <div className='groups'>
                                <div className="c-text-field-name-1">Select addons</div>
                                <Autocomplete
                                    id="variants"
                                    options={props.product.addonList}
                                    groupBy={(option) => option.addonGroupName}
                                    isOptionEqualToValue={(option, value) =>
                                        option.Id === value.Id
                                    }
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
                                        let regExCheckNumber = /^[1-9]+[0-9]*$|^$/
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
                                {props.onRemove && <Button
                                    type="cancel"
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2, mr: 1 }}
                                    onClick={() => handleRemove()}
                                >
                                    Remove Item
                                </Button>}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => handleSave()}
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
