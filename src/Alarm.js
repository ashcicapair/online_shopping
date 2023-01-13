import React from 'react';
import { 
    ButtonBase, Dialog, DialogContent, DialogActions, 
} from '@mui/material';


const Alarm = ({open, onClose, children, needRefresh}) => {
    const handleClose = () => {
        onClose();
        if (needRefresh) {
            window.location.reload();
        }
    };

    return (
        <Dialog onClose={handleClose} open={open} sx={{ "& .MuiDialog-paper":{ borderRadius: 0 }}}>
            <DialogContent  sx={{fontWeight: "bold", padding:'50px'}} >
                {children}
            </DialogContent>
            <DialogActions>
            <ButtonBase 
                variant="outlined"  
                type="submit"
                autoFocus
                onClick={handleClose}
                sx={{
                    border:'1px solid #1a1a1a', 
                    height: 39, 
                    width: "100%",
                }}
            >
                    確定
                </ButtonBase>
            </DialogActions>
        </Dialog>
    )
}

export default Alarm;