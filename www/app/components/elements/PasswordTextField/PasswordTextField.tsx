import { FC, useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import type { TextFieldProps } from '@mui/material/TextField/TextField';

type Props = TextFieldProps & {
    register: any;
};

const PasswordTextField: FC<Props> = ({ register, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleOnClick = () => {
        setShowPassword((oldShowPassword) => !oldShowPassword);
    };
    return (
        <TextField
            {...rest}
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleOnClick}>
                            {showPassword ? (
                                <VisibilityOffIcon />
                            ) : (
                                <VisibilityIcon />
                            )}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordTextField;
