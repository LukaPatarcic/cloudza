import * as React from 'react';

import { EmailRounded } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Section from '@element/Section/Section';

const RegisterEmailPage = () => {
    return (
        <Section>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <EmailRounded />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h5"
                        align="center"
                        sx={{ marginBottom: 2 }}
                    >
                        Please confirm your email address
                    </Typography>
                    <Typography component="p" align="center">
                        We have sent you a confirmation email. In order to log
                        in you will have to confirm your email first.
                    </Typography>
                </Box>
            </Container>
        </Section>
    );
};

export default RegisterEmailPage;
