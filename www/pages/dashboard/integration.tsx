import * as React from 'react';
import { useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Grid,
    Typography,
} from '@mui/material';
import { getSession, useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { deleteToken, getToken, saveToken } from '@api/token';
import Paper from '@element/Paper';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';

interface IntegrationProps {
    hiddenToken: string | null;
}

const Integration: NextPage<IntegrationProps> = ({ hiddenToken }) => {
    const [token, setToken] = useState(hiddenToken ?? '');
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
                enqueueSnackbar('Successfully copied to clipboard', {
                    variant: 'success',
                });
            })
            .catch((err) => {
                if (err.statusCode === 403) {
                    enqueueSnackbar('You have to pay to access this resource', {
                        variant: 'warning',
                    });
                    return;
                }
                enqueueSnackbar('Oops...Something went wrong', {
                    variant: 'error',
                });
            });
    };

    const onDelete = () => {
        deleteToken(session!.accessToken!)
            .then(() => {
                enqueueSnackbar(
                    'You have successfully deleted your API Token',
                    {
                        variant: 'success',
                    }
                );
                setToken('');
            })
            .catch(() => {
                enqueueSnackbar('Oops...Something went wrong', {
                    variant: 'error',
                });
            });
    };

    return (
        <DashboardLayout selectedItem="Integrations">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    API Token Generation Guide
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    You can generate your token here, when you
                                    generate your token it will be visible only
                                    once. Later on if you loose your token you
                                    will have to generate a new one which will
                                    make all previous ones obsolete.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={2}>
                            {token && (
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
                            )}

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
                                    disabled={!token}
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
    const hiddenToken = await getToken(session!.accessToken!);

    return {
        props: {
            session,
            hiddenToken: hiddenToken.token,
        },
    };
};

export default Integration;
