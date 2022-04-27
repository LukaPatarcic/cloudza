import * as React from 'react';
import { useState } from 'react';

import { GetServerSideProps } from 'next';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getSession, useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { deleteToken, saveToken } from '@api/token';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';

const Integration = () => {
    const [token, setToken] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const { data: session } = useSession();
    const onCopy = () => {
        enqueueSnackbar('Successfully copied to clipboard', {
            variant: 'success',
        });
    };

    const onSave = () => {
        saveToken(session!.accessToken!)
            .then((data) => {
                setToken(data.token);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDelete = () => {
        deleteToken(session!.accessToken!)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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
                                    value={token}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CopyToClipboard
                                                    text={token}
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
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={onSave}
                                >
                                    Generate API token
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={onDelete}
                                >
                                    Delete API token
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
