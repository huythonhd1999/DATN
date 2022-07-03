import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '0.5px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            Select Options
                        </div>
                        <div className='modal-info'>
                            {/* chon variant */}
                            <div className='groups'>
                                <div className='group'> 1
                                    {/* chon variant group, dung auto complete search chi chon 1 option*/}
                                </div>
                                <div className='group'> 2
                                    {/* chon variant, dung auto complete search chi chon 1 option*/}
                                </div>
                            </div>
                            {/* chon addon */}
                            <div className='groups'>3
                                <div className='group'>4
                                    {/* chon addon group, dung auto complete search chi chon 1 option*/}
                                </div>
                                <div className='group'>
                                    {/* chon addon, dung auto complete search nhieu option */}
                                </div>
                            </div>
                            <div className='groups'>
                                {/* chon so luong mon an */}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
