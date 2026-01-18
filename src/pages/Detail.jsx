import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import { Bookmark } from '../components/Bookmark';
import { useParams, Link } from 'react-router-dom';

function Detail() {
  const { id } = useParams();

  return (
    <div className="w-full h-screen bg-[#e0e0e0] flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-start pointer-events-none">
        <Link to="/" className="pointer-events-auto bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md text-slate-700 font-medium hover:bg-white transition-colors">
          ← Back to Collection
        </Link>
        <div className="text-right">
             <h1 className="text-xl font-bold text-slate-700">Bookmark #{id}</h1>
             <p className="text-slate-500 text-sm">Drag to rotate • Scroll to zoom</p>
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 12], fov: 45 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />

          <Float
            speed={2} // Animation speed
            rotationIntensity={0.5} // XYZ rotation intensity
            floatIntensity={0.5} // Up/down float intensity
          >
            <Bookmark id={id} />
          </Float>

          <ContactShadows 
            position={[0, -4, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4.5} 
          />
          
          <OrbitControls 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={4}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Detail;
