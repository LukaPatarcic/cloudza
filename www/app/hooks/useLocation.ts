import { useState, useEffect } from 'react';

import { ILocation } from '@type/hooks/useLocation';

export const useLocation = (): ILocation => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState('');

    const onChange: PositionCallback = ({ coords }) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    };
    const onError: PositionErrorCallback = (error) => {
        setError(error.message);
    };
    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }
        geo.getCurrentPosition(onChange, onError);
    }, []);
    return { ...position, error } as ILocation;
};
