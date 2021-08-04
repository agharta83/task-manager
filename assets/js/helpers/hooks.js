import {useCallback, useEffect, useRef, useState} from "react";

export const useWillMount = (fn) => {
    const willMount = useRef(true)

    if (willMount.current && fn && typeof fn === 'function') {
        fn()
    }

    willMount.current = false
}


/* Render component first time */
export const useInitialMount = () => {
    const isFirst = useRef(true);
    console.log(isFirst);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    }

    return false;
}

/* Value of previous props or state to compare actual value */
export const usePrevious = (value) => {
    const prevRef = useRef();
    const curRef = useRef(value);
    const isInitialMount = useInitialMount();

    if (!isInitialMount && curRef.current !== value) {
        prevRef.current = curRef.current;
        curRef.current = value;
    }

    return prevRef.current;
}

/* component is always mounted */
export const useIsMounted = () => {
    const mountedRef = useRef(false);
    const isMounted = useCallback( () => mountedRef.current, []);

    useEffect( () => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        }
    }, []);

    return isMounted;
}

export const useLoading = (action) => {
    const [loading, setLoading] = useState(false);

    const doAction = (...args) => {
        setLoading(true);

        return action(...args).finally(() => setLoading(false));
    };

    return [doAction, loading];
};

