import { NextPage } from 'next';

import dynamic from 'next/dynamic';

import DashboardLayout from '@layout/DashboardLayout';
import { WeatherDocProps } from '@type/components/WeatherDocProps';
const WeatherDocPage = dynamic(import('@template/DocPage/WeatherDocPage'), {
    ssr: false,
});

const Weather: NextPage<WeatherDocProps> = ({ markdown }) => {
    return (
        <DashboardLayout selectedItem="Weather">
            <WeatherDocPage markdown={markdown} />
        </DashboardLayout>
    );
};

export const getStaticProps = async () => {
    const data = await fetch(
        'https://raw.githubusercontent.com/LukaPatarcic/cloudza/master/sdk/README.md'
    );
    if (data.ok) {
        const markdown = await data.text();
        return {
            props: { markdown, revalidate: 10 },
        };
    }

    return {
        props: { error: true, revalidate: 10 },
    };
};

export default Weather;
