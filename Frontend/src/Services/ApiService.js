import axios from "axios"


export const useFetch = (url) => {

    const getFetch = async (searchTerm,pageNo,perPage) => {

        try {
            let  response = await axios.get(url,{
                params: { search : searchTerm, page : pageNo, limit : perPage },  
               withCredentials: true,

              });
            return response.data;
    
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    const postFetch = async (data) => {
        try {
            let response = await axios.post(url, data,{
                withCredentials: true,
            });

            console.log("Success : ", response);
            return response.data;

        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const postFetchFile = async (data) => {
        try {
            let response = await axios.post(url, data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("Success : ", response);

        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const updateFetch = async (data) => {
        try {
            let response = await axios.put(url, data);
            console.log("Success : ", response);

        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return { getFetch, postFetch, updateFetch, postFetchFile };

};
