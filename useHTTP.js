import { useCallback, useState } from "react";
import axios from "axios";

const useHTTP = ({ url, method, body, headers, initialValue }) => {
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const call = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                method: method,
                url: url,
                data: body,
                headers: headers,
            });

            setData(response.data);
        } catch (error) {
            setError(error?.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, [url, headers, body, method]);

    return { data, loading, error, call };
};

export default useHTTP;



//usage:
//To use this hook, you have to pass url, method, body, headers, and initial Value to useHTTP hook, and it will return you the data if success, loading state, error if any, and a 'call' function to call the API.

const { data, loading, error, call } = useHTTP({ url: 'http://example.com/data', method: 'GET', initialValue: [] })

//This initial state will be useful if you know the API response format, and this can help you get the auto suggestions while using 'data' in the code.