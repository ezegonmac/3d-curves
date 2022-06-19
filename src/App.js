import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import * as dat from 'dat.gui';
import { useEffect, useRef } from 'react';
import './App.css';
import Lights from './components/Lights';
import OriginCube from './components/OriginCube';
import Points from './components/Points';

function App() {
  const cube = useRef();

  useEffect(() => {

    const gui = new dat.GUI({ width: 400 });

    const debugObject = {
      position: {
        x: 0,
        y: 0,
        z: 0,
      }
    }

    console.log(debugObject.position.x)

    gui.add(debugObject.position, "x")
      .min(-10)
      .max(10)
      .step(0.1)
      .onChange(() => {
        console.log(cube.current)
        cube.current.props.position[0] = debugObject.position.x;
        console.log(debugObject.position.x)
        console.log(cube.current)
      });

    return () => {
      gui.destroy()
    }

  });

  return (
    <div className="App">
      <Canvas
        camera={{
          fov: 75,
          aspect: 2,
          near: 0.1,
          far: 1000,
          position: [0,0,20],
          rotation: [0,0,0]
        }}
      > 
          <color attach="background" args={["#161c24"]}/>
          <Lights/>
          {/* <CircunferencePoints radius={5} z={3}/> */}
          <Points/>
          <OriginCube ref={cube} position={[0,0,0]}/>
          <OrbitControls/>
      </Canvas>

    </div>
  );
}

export default App;
