import { RefObject, useEffect, useState } from 'react';

export default function useOnScreen(ref: RefObject<HTMLElement>) {
    const [isIntersecting, setIntersecting] = useState(false);

    const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
    );

    useEffect(() => {
        observer.observe(ref.current as HTMLElement);
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, []);

    return isIntersecting;
}
