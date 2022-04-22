import { useMemo } from 'react';

import useResponsiveFontSize from '@hook/useResponsiveFontSize';

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    return useMemo(
        () => ({
            style: {},
        }),
        [fontSize]
    );
};

export default useOptions;
