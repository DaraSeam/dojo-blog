import { useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        // abort controller
        const abortConstant = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortConstant.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error("could not fetch data from resource");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                setLoading(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if(err.name === "AbortError") {
                    console.log('fetch aborted');
                } else {
                    // auto catches network error
                    setLoading(false);
                    setError(err.message);
                }
            })
        }, 1000)

        // abort fetch
        return () => abortConstant.abort();
    },[url])
    return {data, loading, error};
}
export default useFetch;