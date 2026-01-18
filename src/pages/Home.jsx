import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { getAllBookmarks } from '../utils/bookmarkData';
import { Bookmark } from '../components/Bookmark';

const Home = () => {
  const bookmarks = getAllBookmarks();
  const part1 = bookmarks.slice(0, 5);
  const part2 = bookmarks.slice(5, 10);

  const BookmarkThumbnail = ({ id }) => (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <Suspense fallback={null}>
        <Environment preset="city" />
        <ambientLight intensity={0.7} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
           <Bookmark id={id} />
        </Float>
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
      </Suspense>
    </Canvas>
  );

  const BookmarkGrid = ({ items }) => (
    <div className="grid grid-cols-5 gap-4">
      {items.map((bookmark) => (
        <Link key={bookmark.id} to={`/bookmark/${bookmark.id}`} className="block group">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-md hover:ring-2 hover:ring-blue-400">
            <div className="aspect-[3/4] bg-gray-50 relative">
               <BookmarkThumbnail id={bookmark.id} />
               {/* 
                 Overlay div to capture clicks so they propagate to the Link 
                 Canvas captures pointer events by default, which can block the Link 'click' 
                 if not handled carefully, though in this case wrapping in Link usually works.
                 To be safe and prevent scene interaction blocking navigation:
               */}
               <div className="absolute inset-0 z-10 cursor-pointer" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#e0e0e0] py-4 px-4 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-1 border-l-4 border-blue-500">
            Phần 1: Cấu trúc của hình thái kinh tế xã hội
          </h2>
          <BookmarkGrid items={part1} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-1 border-l-4 border-purple-500">
            Phần 2: Tiến trình lịch sử của các hình thái
          </h2>
          <BookmarkGrid items={part2} />
        </section>
      </div>
    </div>
  );
};

export default Home;
