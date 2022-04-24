import * as React from 'react';
import { FC } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Section from '@element/Section/Section';
import ForgotPasswordForm from '@module/Form/ForgotPasswordForm/ForgotPasswordForm';
import { ForgotPasswordProps } from '@type/components/ForgotPasswordProps';

const ForgotPasswordPage: FC<ForgotPasswordProps> = ({
    isLoading,
    isSuccess,
    errors,
    register,
    handleSubmit,
    onSubmit,
}) => {
    return (
        <Section>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <ForgotPasswordForm
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        errors={errors}
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                    />
                </Box>
            </Container>
        </Section>
    );
};

export default ForgotPasswordPage;
