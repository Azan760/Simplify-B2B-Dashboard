// import axios from "axios"


// export const useFetch = (url) => {

//     const getFetch = async (searchTerm,pageNo,perPage) => {

//         try {
//             let  response = await axios.get(url,{
//                 params: { search : searchTerm, page : pageNo, limit : perPage },  
//                withCredentials: true,

//               });
//             return response.data;
    
//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//     };


//     const postFetch = async (data) => {
//         try {
//             let response = await axios.post(url, data,{
//                 withCredentials: true,
//             });

//             console.log("Success : ", response);
//             return response.data;

//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//     }

//     const postFetchFile = async (data) => {
//         try {
//             let response = await axios.post(url, data,{
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 }
//             });
//             console.log("Success : ", response);

//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//     }

//     const updateFetch = async (data) => {
//         try {
//             let response = await axios.put(url, data);
//             console.log("Success : ", response);

//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//     }

//     return { getFetch, postFetch, updateFetch, postFetchFile };

// };


import axios from "axios"

export const useFetch = (url) => {

    const getFetch = async (searchTerm, pageNo, perPage) => {
        try {
            let response = await axios.get(url, {
                params: { search: searchTerm, page: pageNo, limit: perPage },  
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error:', error.message);
            throw error; // Added error throwing
        }
    };

    const postFetch = async (data) => {
        try {
            let response = await axios.post(url, data, {
                withCredentials: true,
            });
            console.log("Success : ", response);
            return response.data;
        } catch (error) {
            console.error('Error:', error.message);
            throw error; // Added error throwing
        }
    }

    const postFetchFile = async (data) => {
        try {
            let response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // Added credentials for consistency
            });
            console.log("Success : ", response);
            return response.data; // Added return statement
        } catch (error) {
            console.error('Error:', error.message);
            throw error; // Added error throwing
        }
    }

    const updateFetch = async (data) => {
        try {
            let response = await axios.put(url, data, {
                withCredentials: true, // Added credentials for consistency
            });
            console.log("Success : ", response);
            return response.data; // Added return statement
        } catch (error) {
            console.error('Error:', error.message);
            throw error; // Added error throwing
        }
    }

    // ADDED DELETE FETCH METHOD
    const deleteFetch = async () => {
        try {
            let response = await axios.delete(url, {
                withCredentials: true,
            });
            console.log("Delete Success : ", response);
            return response.data;
        } catch (error) {
            console.error('Delete Error:', error.message);
            throw error; // Added error throwing
        }
    }

    return { getFetch, postFetch, updateFetch, postFetchFile, deleteFetch }; // Added deleteFetch to return

};