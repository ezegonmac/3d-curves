import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import './App.css';
import Lights from './components/Lights';
import Points from './components/Points';
import SpherePoints from './components/SpherePoints';
import BulbPoints from './components/BulbPoints';

function App() {

  return (
    <div className="App">
      <h1 className="title">Mandelbulb</h1>
      <h2 className="loader">It may take a little to load...</h2>
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
          {/* <CircunferencePoints radius={5} z={0}/> */}
          {/* <SpherePoints radius={2} position={[0,0,0]}/> */}
          <BulbPoints />
          <Points/>
          <OrbitControls/>
      </Canvas>

    </div>
  );
}

export default App;
