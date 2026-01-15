import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../Redux/features/books/booksApi';


const categories = ["Choose a genre", "Business","Fiction", "Horror","Adventure"]

const TopSellers = () => {
    
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    const{data: books = []} = useFetchAllBooksQuery()
  
    const filterBooks = selectedCategory === "Choose a genre"?books : books.filter(book => book.category === selectedCategory.toLowerCase());


  return (
    <div className='py-10'>
      
      <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
      {/* categoring filtering */}

      <div className='mb-8 flex items-center'>
        <select
        onChange={(e)=>setSelectedCategory(e.target.value)}
         name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-3 focus:outline-none'>
            {
                categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))
            }
        </select>
      </div>


      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
           1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
         {
          
            filterBooks.length >0 && filterBooks.map((book,index) => (
            <SwiperSlide key={index}>
                <BookCard key={index} book = {book}/>
            </SwiperSlide>
            
        ))
         }
      </Swiper>

     

    </div>
  )
}

export default TopSellers
