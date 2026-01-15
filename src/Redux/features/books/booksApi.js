import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../Utils/baseURL'

const baseQuery = fetchBaseQuery({ 
    baseUrl:`${getBaseUrl()}/api/books`, 
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization',`Bearer ${token}`);
        }
        return Headers;
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes:['Books'],
    endpoints:(builder) =>({
        fetchAllBooks: builder.query({
            query:() => "/",
            providesTags:["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags:(results,error,id) => [{type:"Books", id}],
        }),
        addBook: builder.mutation({
            query:(newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags:["Books"]
        }),
        updateBook: builder.mutation({
            query:({id, ...rest}) => ({
                url: `/edit/${id}`,
                method:"PUT",
                body: rest,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBook: builder.mutation({
            query:({id}) => ({
                url: `/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })
})

export const {useFetchAllBooksQuery, useFetchBookByIdQuery,useAddBookMutation,useUpdateBookMutation,useDeleteBookMutation} = booksApi
export default booksApi;




/*import axios from 'axios';
import getBaseUrl from '../../../Utils/baseURL';

// 1. Setup the instance
const bookApi = axios.create({
    baseURL: `${getBaseUrl()}/api/books`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 2. Add an Interceptor to automatically attach the token to every request
bookApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default bookApi;

// 3. Define the CRUD operations
export const fetchAllBooks = async () => {
    const response = await bookApi.get('/');
    return response.data;
};

export const fetchBookById = async (id) => {
    const response = await bookApi.get(`/${id}`);
    return response.data;
};

export const addBook = async (newBook) => {
    const response = await bookApi.post('/create-book', newBook);
    return response.data;
};

export const updateBook = async (id, updatedData) => {
    const response = await bookApi.put(`/edit/${id}`, updatedData);
    return response.data;
};

export const deleteBook = async (id) => {
    const response = await bookApi.delete(`/${id}`);
    return response.data;
};





import { useEffect, useState } from 'react';
import { fetchAllBooks } from './services/bookService';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchAllBooks();
                setBooks(data);
            } catch (error) {
                console.error("Failed to load books", error);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    if (loading) return <p>Loading...</p>;
    return <div>{/*render book here //}</div>;
};

*/