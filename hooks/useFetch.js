import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = process.env.API_KEY
const ApiKey = API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, SetError] = useState(false);
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'x-rapidapi-key': 'ff21dcb5eemsh3efedb2c81309f5p1586e7jsn272cab180c88',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data)
        } catch (error) {
            SetError(error);
            alert("Server Error");
        } finally {
            setIsLoading(false);
        }




    }
    useEffect(() => {
        fetchData();
    }, [])
    const refetch = () => {
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;