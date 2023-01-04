import React from 'react';
import { 
    ButtonBase, Dialog, DialogTitle, DialogContent, DialogActions, 
} from '@mui/material';


const Alarm = ({open, onClose, children}) => {
    const handleClose = () => {
        onClose();
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
                    // "&:hover": {
                    //     color: '#faf7f7',
                    //     border: 'none',
                    //     bgcolor: '#1a1a1a'
                    // }
                }}
            >
                    確定
                </ButtonBase>
            </DialogActions>
        </Dialog>
    )
}

export default Alarm;