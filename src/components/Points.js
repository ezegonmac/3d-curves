import * as THREE from 'three';

const Points = () => {

    const positions = new Float32Array(
        [-5,0,0, 
          2,2,2, 
          5,0,0]);
    const colors = new Float32Array(
        [1,0.5,0.5,
         1,0.5,0.5,
         1,0.5,0.5]);

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                    usage={THREE.DynamicDrawUsage}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                    usage={THREE.DynamicDrawUsage}
                />
            </bufferGeometry>
            <pointsMaterial 
                attach="material" 
                vertexColors 
                size={10} 
                sizeAttenuation={false} 
                color={0xffffff}
            />
        </points>
    );
}

export default Points;