import { Dispatch, FC, SetStateAction, useState } from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';

import { deletePaymentMethod } from '@api/payment';

interface Props {
    paymentMethod: boolean;
    setPaymentMethod: Dispatch<SetStateAction<boolean>>;
}

const RemoveCard: FC<Props> = ({ paymentMethod, setPaymentMethod }) => {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        deletePaymentMethod(session!.accessToken!)
            .then(() => {
                enqueueSnackbar('Successfully removed card from account', {
                    variant: 'success',
                });
                setPaymentMethod(false);
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong...', {
                    variant: 'error',
                });
            })
            .finally(() => {
                handleClose();
            });
    };

    if (!paymentMethod) {
        return null;
    }

    return (
        <Grid item xs={12} md={12} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleClickOpen}>
                Remove Card
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Remove card</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove your card from this
                        account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Decline</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default RemoveCard;
