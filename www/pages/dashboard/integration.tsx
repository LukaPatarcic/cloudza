import * as React from 'react';

import { GetServerSideProps } from 'next';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getSession, useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';

const Integration = () => {
    const API_TOKEN = '1243u7893eyuhf8i9whs4f983289tg2390g2n380gh';
    const { enqueueSnackbar } = useSnackbar();
    const { data: session, status } = useSession();
    console.log(session, status);
    const onCopy = () => {
        enqueueSnackbar('Successfully copied to clipboard', {
            variant: 'success',
        });
    };

    return (
        <DashboardLayout selectedItem="Integrations">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={API_TOKEN}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CopyToClipboard
                                                    text={API_TOKEN}
                                                    onCopy={onCopy}
                                                >
                                                    <IconButton>
                                                        <ContentCopyIcon />
                                                    </IconButton>
                                                </CopyToClipboard>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant="contained">
                                    Generate API token
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    return {
        props: {
            session,
        },
    };
};

export default Integration;
