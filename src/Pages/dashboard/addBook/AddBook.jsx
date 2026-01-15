import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../Redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, { isLoading }] = useAddBookMutation();
    const [imageFileName, setimageFileName] = useState('');

    const onSubmit = async (data) => {
        // 1. Merge the form data with the image filename
        const newBookData = {
            ...data,
            coverImage: imageFileName, // Attaching the filename captured from handleFileChange
            oldPrice: Number(data.oldPrice), // Ensuring prices are numbers, not strings
            newPrice: Number(data.newPrice),
        };

        try {
            // 2. Send to backend
            await addBook(newBookData).unwrap();
            
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                confirmButtonText: "Great!"
            });
            console.log(newBookData);
            // 3. Reset everything
            reset();
            setimageFileName('');
            setimageFile(null);
        } catch (error) {
            console.error(error);
            // Check if error is the 403 Forbidden we saw earlier
            if(error.status === 403) {
                alert("Session expired or Unauthorized. Please log in again.");
            } else {
                alert("Failed to add book. Please try again.");
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name); // This sets the name we use in onSubmit
        }
    };

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* 1. TITLE */}
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                {/* 2. AUTHOR (Added this - it was missing!) */}
                <InputField
                    label="Author"
                    name="author"
                    placeholder="Enter author name"
                    register={register}
                />

                {/* 3. DESCRIPTION */}
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                />

                {/* 4. CATEGORY */}
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                />

                {/* 5. TRENDING */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                {/* 6. PRICES */}
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Old Price"
                        name="oldPrice"
                        type="number"
                        placeholder="0.00"
                        register={register}
                    />
                    <InputField
                        label="New Price"
                        name="newPrice"
                        type="number"
                        placeholder="0.00"
                        register={register}
                    />
                </div>

                {/* 7. COVER IMAGE */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                    />
                    {imageFileName && <p className="mt-2 text-sm text-blue-600">Selected: {imageFileName}</p>}
                </div>

                {/* 8. SUBMIT */}
                <button type="submit" disabled={isLoading} className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition-colors">
                    {isLoading ? "Adding..." : "Add Book"}
                </button>
            </form>
        </div>
    );
};

export default AddBook;