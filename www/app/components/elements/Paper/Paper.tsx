import { FC, ReactNode } from 'react';

import { SxProps } from '@mui/material';
import MuiPaper from '@mui/material/Paper';

interface Props {
    children: ReactNode;
    sx?: SxProps;
}

const Paper: FC<Props> = ({ children, sx = {} }) => {
    return (
        <MuiPaper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                ...sx,
            }}
        >
            {children}
        </MuiPaper>
    );
};

export default Paper;
