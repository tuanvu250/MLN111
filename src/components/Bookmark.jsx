import React, { useMemo, useLayoutEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { getBookmarkData } from '../utils/bookmarkData';

export function Bookmark({ id, ...props }) {
  const { front, back } = useMemo(() => getBookmarkData(id), [id]);

  // Load textures
  const [frontTexture, backTexture] = useTexture([front, back]);
  
  useLayoutEffect(() => {
    frontTexture.anisotropy = 16;
    backTexture.anisotropy = 16;
    frontTexture.needsUpdate = true;
    backTexture.needsUpdate = true;
  }, [frontTexture, backTexture]);
  
  // Create rounded rectangle shape
  const width = 2.5;
  const height = 7; 
  
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    const radius = 0.1;
    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);

    // Add hole
    const holePath = new THREE.Path();
    // Center x=0. Top is y=3.5 (since height is 7 and centered). 
    // Position hole at y=3.2 so it's closer to the top.
    holePath.absarc(0, 3.2, 0.1, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    return shape;
  }, []);

  // Extrude settings for thickness
  const extrudeSettings = useMemo(() => ({
    depth: 0.01, // Reduced thickness
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 4
  }), []);

  const frontMeshRef = useRef();
  const backMeshRef = useRef();

  // Fix UVs to map the texture across the entire shape (0..1)
  useLayoutEffect(() => {
    [frontMeshRef.current, backMeshRef.current].forEach(mesh => {
      if (mesh && mesh.geometry) {
        const geo = mesh.geometry;
        geo.computeBoundingBox();
        const bbox = geo.boundingBox;
        const size = new THREE.Vector3();
        bbox.getSize(size);
        const uvAttribute = geo.attributes.uv;
        
        for (let i = 0; i < uvAttribute.count; i++) {
          const u = (geo.attributes.position.getX(i) - bbox.min.x) / size.x;
          const v = (geo.attributes.position.getY(i) - bbox.min.y) / size.y;
          uvAttribute.setXY(i, u, v);
        }
        uvAttribute.needsUpdate = true;
      }
    });
  }, [shape]);

  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial 
            color="#eaeaea" // Slightly darker white/grey for the edge to blend nicely
            roughness={0.4}
            metalness={0.1}
            side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Front Face Texture */}
      {/* Used ShapeGeometry to match rounded corners exactly */}
      <mesh ref={frontMeshRef} position={[0, 0, 0.031]} receiveShadow>
         <shapeGeometry args={[shape]} />
         <meshBasicMaterial 
            map={frontTexture} 
            transparent 
            toneMapped={false}
        />
      </mesh>

      {/* Back Face Texture */}
      <mesh ref={backMeshRef} position={[0, 0, -0.011]} rotation={[0, Math.PI, 0]} receiveShadow>
         <shapeGeometry args={[shape]} />
         <meshBasicMaterial 
            map={backTexture} 
            transparent 
            toneMapped={false}
        />
      </mesh>
    </group>
  );
}
