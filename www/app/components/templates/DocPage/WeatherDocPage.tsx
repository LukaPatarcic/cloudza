import { FC } from 'react';

import MuiMarkdown from 'mui-markdown';

import Paper from '@element/Paper';
import { WeatherDocProps } from '@type/components/WeatherDocProps';

const WeatherDocPage: FC<WeatherDocProps> = ({ markdown }) => {
    return (
        <Paper>
            <MuiMarkdown
                overrides={{
                    h1: {
                        props: {
                            style: {
                                fontSize: 38,
                            },
                        },
                    },
                    h2: {
                        props: {},
                    },
                }}
            >
                {markdown}
            </MuiMarkdown>
        </Paper>
    );
};

export default WeatherDocPage;
