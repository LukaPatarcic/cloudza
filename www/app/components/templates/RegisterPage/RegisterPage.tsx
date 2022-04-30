import * as React from 'react';
import { FC } from 'react';

import Section from '@element/Section/Section';
import SectionHeader from '@element/Section/SectionHeader';
import RegisterForm from '@module/Form/RegisterForm/RegisterForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { RegisterProps } from '@type/components/RegisterProps';

const RegisterPage: FC<RegisterProps> = ({
    handleSubmit,
    onSubmit,
    errors,
    register,
    error,
    isLoading,
}) => {
    return (
        <Section>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <SectionHeader
                        title="Sign up"
                        subtitle="Create an account to get access to all of our services"
                        titleProps={{
                            variant: 'h3',
                        }}
                    />
                    <RegisterForm
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        register={register}
                        error={error}
                        isLoading={isLoading}
                    />
                </Box>
            </Container>
        </Section>
    );
};

export default RegisterPage;
