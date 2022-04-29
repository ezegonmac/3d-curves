

const OriginCube = () => {
    return(
        <mesh position={[0,0,0]}>
            <boxGeometry attach="geometry" args={[0.5,0.5,0.5]}/>
            <meshStandardMaterial attach="material" color="#ff0000"/>
        </mesh>
    );
}

export default OriginCube;