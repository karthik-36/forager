import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const emails = ['username@gmail.com', 'user02@gmail.com'];



function SimpleDialog(props) {

    const notify = () => {
        console.log("here");
     
        toast.success('Hotel booking complete!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            handleClose();
    }
    const { onClose, selectedValue, open, HotelName, Price, cost } = props;

    console.log(props);
    console.log("hotelValue " + HotelName);
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <div>
              <ToastContainer position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover />  
        <Dialog onClose={handleClose} open={open}>
            <div>
                <DialogTitle>Book 1 Room at {HotelName}?</DialogTitle>
                <DialogTitle> {cost} </DialogTitle>
                <div style={{ textAlign: "right" }}>
                    <Button variant="contained" onClick={notify} color="success" style={{ background: "rgb(130,255,187)", padding: "5px", borderRadius: "5px", margin: "20px" }}><b>YES, PAY</b></Button>

                </div>
            </div>
            {/* <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List> */}
        </Dialog>
        </div>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    HotelName: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
    let { HotelName, cost } = props;
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography> */}
            <Button variant="contained" onClick={handleClickOpen} color="success" style={{ background: "rgb(30,255,147)", padding: "5px", borderRadius: "5px" }}><b>Order Now</b></Button>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button> */}
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                HotelName={HotelName}
                cost={cost}
            />
        </div>
    );
}
