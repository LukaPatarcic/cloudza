import * as React from 'react';
import { FC, ReactNode } from 'react';

import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';

interface Props {
    isLoading: boolean;
    children: ReactNode;
}

const SubmitButton: FC<Props> = ({ isLoading, children }) => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
        >
            {isLoading ? (
                <CircularProgress style={{ color: 'white' }} />
            ) : (
                children
            )}
        </Button>
    );
};

export default SubmitButton;
