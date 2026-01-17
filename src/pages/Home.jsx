import React from 'react';
import { Link } from 'react-router-dom';
import bookmarkImg from '../assets/1.png';

const Home = () => {
  const bookmarks = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="h-screen bg-[#e0e0e0] flex items-center justify-center p-4">
      <div className="grid grid-cols-5 gap-4 max-w-5xl w-full">
        {bookmarks.map((id) => (
          <Link key={id} to={`/bookmark/${id}`} className="block group">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-md hover:ring-2 hover:ring-blue-400">
              <div className="aspect-[3/4] p-2 bg-gray-50 flex items-center justify-center">
                <img 
                  src={bookmarkImg} 
                  alt={`Bookmark ${id}`} 
                  className="max-h-full max-w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="p-2 bg-white text-center">
                <h3 className="text-sm font-medium text-gray-700">Bookmark {id}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
