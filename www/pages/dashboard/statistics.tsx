import * as React from 'react';
import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';

import { Paper, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getSession, useSession } from 'next-auth/react';

import { getRequestHistory } from '@api/requestHistory';
import timeAgo from '@helper/timeAgo';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';
import { RequestHistory } from '@type/api/requestHistory';

const Statistics = () => {
    const [rows, setRows] = useState<RequestHistory[]>([]);
    const session = useSession();
    useEffect(() => {
        getRequestHistory(session.data!.accessToken!)
            .then((data) => {
                setRows(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <DashboardLayout selectedItem="Statistics">
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>IP Address</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.ip}</TableCell>
                                <TableCell>
                                    <Tooltip
                                        placement="top"
                                        title={new Date(
                                            row.created_at
                                        ).toDateString()}
                                    >
                                        <span>
                                            {timeAgo(new Date(row.created_at))}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
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

export default Statistics;
