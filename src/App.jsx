import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import { Bookmark } from './components/Bookmark';

function App() {
  return (
    <div className="w-full h-full bg-[#e0e0e0] flex flex-col items-center justify-center relative">
      <div className="absolute top-10 text-center z-10 pointer-events-none">
        <p className="text-slate-600 text-lg">Drag to rotate • Scroll to zoom</p>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
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
            <Bookmark />
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
            maxDistance={12}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
