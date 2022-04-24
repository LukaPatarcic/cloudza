import type { NextPage } from 'next';

import DefaultLayout from '@layout/DefaultLayout/DefaultLayout';
import HomePage from '@template/HomePage/HomePage';

const Home: NextPage = () => {
    return (
        <DefaultLayout>
            <HomePage />
        </DefaultLayout>
    );
};

export default Home;
