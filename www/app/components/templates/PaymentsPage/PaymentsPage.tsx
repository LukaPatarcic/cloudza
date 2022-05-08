import * as React from 'react';
import { FC } from 'react';

import { TablePagination, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Paper from '@element/Paper';
import timeAgo from '@helper/timeAgo';
import EnhancedTableHead from '@module/Table/EhancedTableHead';
import { paymentsTableCells } from '@module/Table/paymentsTableCells';
import { PaymentsProps } from '@type/components/PaymentsProps';

const PaymentsPage: FC<PaymentsProps> = ({
    status,
    data,
    order,
    orderBy,
    rowsPerPage,
    page,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    return (
        <Paper>
            {status === 'loading' ? (
                <Typography>Loading Statistics...</Typography>
            ) : (
                <>
                    <Table size="small">
                        <EnhancedTableHead
                            headCells={paymentsTableCells}
                            onRequestSort={handleRequestSort}
                            order={order}
                            orderBy={orderBy}
                        />
                        <TableBody>
                            {data?.data.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.amountDue}</TableCell>
                                    <TableCell>{row.amountPaid}</TableCell>
                                    <TableCell>{row.currency}</TableCell>
                                    <TableCell>
                                        <a
                                            href={row.invoiceDownloadUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Invoice
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip
                                            placement="top"
                                            title={new Date(
                                                row.created_at
                                            ).toDateString()}
                                        >
                                            <span>
                                                {timeAgo(
                                                    new Date(row.created_at)
                                                )}
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={data?.meta ? data?.meta?.totalItems : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </Paper>
    );
};

export default PaymentsPage;
