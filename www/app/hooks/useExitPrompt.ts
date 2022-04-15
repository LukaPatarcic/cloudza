import { useState, useEffect } from 'react';

import Router from 'next/router';

const initBeforeUnLoad = (showExitPrompt: boolean) => {
    window.onbeforeunload = (event) => {
        if (showExitPrompt) {
            const e = event || window.event;
            e.preventDefault();
            if (e) {
                e.returnValue = '';
            }
            return '';
        }
    };
};

// Hook
export default function useExitPrompt(bool: boolean) {
    const [showExitPrompt, setShowExitPrompt] = useState(bool ?? false);
    if (typeof window === 'undefined')
        return [showExitPrompt, setShowExitPrompt];

    window.onload = function () {
        initBeforeUnLoad(showExitPrompt);
    };

    useEffect(() => {
        initBeforeUnLoad(showExitPrompt);
    }, [showExitPrompt]);

    useEffect(() => {
        const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
            (e || window.event).returnValue =
                'Are you sure you want to leave the page?';
            return 'Are you sure you want to leave the page? Your changes will not be saved!'; // Gecko + Webkit, Safari, Chrome etc.
        };
        const beforeRouteHandler = (url: string) => {
            if (
                Router.pathname !== url &&
                !confirm(
                    'Are you sure you want to leave the page? Your changes will not be saved!'
                )
            ) {
                // to inform NProgress or something ...
                // Router.events.emit('routeChangeError');
                throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
            } else {
                setShowExitPrompt(false);
            }
        };
        if (showExitPrompt) {
            window.addEventListener('beforeunload', beforeUnloadHandler);
            Router.events.on('routeChangeStart', beforeRouteHandler);
        } else {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            Router.events.off('routeChangeStart', beforeRouteHandler);
        }
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            Router.events.off('routeChangeStart', beforeRouteHandler);
        };
    }, [showExitPrompt]);

    return [showExitPrompt, setShowExitPrompt];
}
