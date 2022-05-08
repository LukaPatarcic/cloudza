import { useEffect, useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { getToken } from 'next-auth/jwt';
import { getSession, useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from 'react-query';

import { getRequestHistory } from '@api/requestHistory';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';
import StatisticsPage from '@template/StatisticsPage/StatisticsPage';
import { Paginated } from '@type/api';
import { RequestHistory } from '@type/api/requestHistory';
import { Order } from '@type/index';

const PAGE = 0;
const ROWS_PER_PAGE = 10;
const ORDER_BY = 'id';
const ORDER = 'asc';
const QUERY_KEY = 'statistics';

interface Props {
    requestHistories: Paginated<RequestHistory>;
}

const Statistics: NextPage<Props> = ({ requestHistories }) => {
    const queryClient = useQueryClient();
    const session = useSession();
    const [order, setOrder] = useState<Order>(ORDER);
    const [orderBy, setOrderBy] = useState<keyof RequestHistory>(ORDER_BY);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
    const [page, setPage] = useState(PAGE);
    const KEYS = [QUERY_KEY, page, rowsPerPage, orderBy, order];
    const { status, data } = useQuery(
        KEYS,
        () =>
            getRequestHistory(
                page + 1,
                rowsPerPage,
                orderBy,
                order,
                session.data!.accessToken!
            ),
        {
            keepPreviousData: true,
            staleTime: 5000,
            initialData: requestHistories,
        }
    );

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof RequestHistory
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        if (data?.links.next) {
            queryClient.prefetchQuery(KEYS, () =>
                getRequestHistory(
                    page + 1,
                    rowsPerPage,
                    orderBy,
                    order,
                    session.data!.accessToken!
                )
            );
        }
    }, [data, page, queryClient, order, orderBy, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <DashboardLayout selectedItem="Statistics">
            <StatisticsPage
                status={status}
                data={data}
                order={order}
                orderBy={orderBy}
                rowsPerPage={rowsPerPage}
                page={page}
                handleRequestSort={handleRequestSort}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);
    const token = await getToken(ctx);
    const requestHistories = await getRequestHistory(
        PAGE + 1,
        ROWS_PER_PAGE,
        ORDER_BY,
        ORDER,
        token!.accessToken!
    );

    return {
        props: {
            session,
            requestHistories,
        },
    };
};

export default Statistics;
