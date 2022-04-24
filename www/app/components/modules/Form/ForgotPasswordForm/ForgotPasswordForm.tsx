import * as React from 'react';
import { FC } from 'react';

import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import SubmitButton from '@element/SubmitButton/SubmitButton';
import { ForgotPasswordProps } from '@type/components/ForgotPasswordProps';

const ForgotPasswordForm: FC<ForgotPasswordProps> = ({
    isLoading,
    isSuccess,
    errors,
    register,
    handleSubmit,
    onSubmit,
}) => {
    return (
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3, width: '100%' }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        helperText={errors.email?.message}
                        error={!!errors.email}
                        {...register('email')}
                    />
                </Grid>
                {isSuccess && (
                    <Grid item xs={12}>
                        <Alert severity="success">
                            We have sent you a confirmation email
                        </Alert>
                    </Grid>
                )}
            </Grid>
            <SubmitButton isLoading={isLoading}>Send Email</SubmitButton>
        </Box>
    );
};

export default ForgotPasswordForm;
