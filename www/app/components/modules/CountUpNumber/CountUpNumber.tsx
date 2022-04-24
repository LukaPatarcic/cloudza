import React, { FC } from 'react';

import { Typography } from '@mui/material';
import clsx from 'clsx';
import CountUp from 'react-countup';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VisibilitySensor from 'react-visibility-sensor-v2';

interface Props {
    start?: number;
    end: number;
    suffix?: string;
    prefix?: string;
    label?: string;
    textColor?: string;
    labelColor?: string;
    className?: string;
    visibilitySensorProps?: object;
    wrapperProps?: object;
    countWrapperProps?: object;
    countNumberProps?: object;
    labelProps?: object;
}

const CountUpNumber: FC<Props> = ({
    start = 0,
    end,
    suffix,
    prefix,
    label,
    textColor,
    labelColor,
    className,
    visibilitySensorProps,
    wrapperProps,
    countWrapperProps,
    countNumberProps,
    labelProps,
    ...rest
}) => {
    const [viewPortEntered, setViewPortEntered] = React.useState(false);
    const setViewPortVisibility = (isVisible: boolean) => {
        if (viewPortEntered) {
            return;
        }

        setViewPortEntered(isVisible);
    };

    return (
        <div className={clsx('countup-number', className)} {...rest}>
            <VisibilitySensor
                onChange={(isVisible: boolean) =>
                    setViewPortVisibility(isVisible)
                }
                delayedCall
                className="countup-number__visibility-sensor"
                {...visibilitySensorProps}
            >
                <div className="countup-number__wrapper" {...wrapperProps}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        color={textColor || 'textPrimary'}
                        className="countup-number__count-wrapper"
                        {...countWrapperProps}
                    >
                        <CountUp
                            delay={1}
                            redraw={false}
                            end={viewPortEntered ? end : start}
                            start={start}
                            suffix={suffix || ''}
                            prefix={prefix || ''}
                            className="countup-number__count"
                            {...countNumberProps}
                        />
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color={labelColor || 'textSecondary'}
                        align="center"
                        className="countup-number__label"
                        {...labelProps}
                    >
                        {label}
                    </Typography>
                </div>
            </VisibilitySensor>
        </div>
    );
};

export default CountUpNumber;
