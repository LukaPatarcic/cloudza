import * as React from 'react';
import { FC, ReactNode } from 'react';

import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';

interface Props {
    isLoading: boolean;
    disabled?: boolean;
    children: ReactNode;
}

const SubmitButton: FC<Props> = ({
    isLoading,
    children,
    disabled,
    ...rest
}) => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading || disabled}
            sx={{ mt: 3, mb: 2 }}
            {...rest}
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
