import React from 'react';
import * as THREE from 'three';

class CircunferencePoints extends React.Component {

    constructor(props, radius, z) {
        super(props);
    
        const numPoints = 100;

        this.positions = this.getPoints(radius, z, numPoints);
        this.colors = this.getColors(numPoints);
    }

    render() {
        return (
            <points>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attach="attributes-position"
                        count={this.positions.length / 3}
                        array={this.positions}
                        itemSize={3}
                        usage={THREE.DynamicDrawUsage}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={this.colors.length / 3}
                        array={this.colors}
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

    getPoints(radius, z, numPoints = 100) {

        new Float32Array(
            [-5,0,0, 
              2,2,2, 
              5,0,0]);
    
        const points = this.getCircunferencePointsArray(radius, z, numPoints);
    
        return Float32Array.from(points);
    }
    
    getCircunferencePointsArray(radius, z, numPoints) {
        const array = []
    
        const a = radius;
        const b = z;
    
        // ( a*cos(u), a*sin(u), b )
        for(let u=0; u < numPoints; u++) {
            const x = a * Math.cos(u);
            const y = a * Math.sin(u);
            const z = b;
    
            array[u] = x;
            array[u+1] = y;
            array[u+2] = z;
        }
    
        return array;
    }
    
    getColors(numPoints = 100) {
        new Float32Array(
            [1,0.5,0.5,
             1,0.5,0.5,
             1,0.5,0.5]);
    
        const colors = [];
    
        for(let i=0; i < numPoints; i++) {
            const x = 1;
            const y = 0.5;
            const z = 0.5;
    
            colors[i] = x;
            colors[i+1] = y;
            colors[i+2] = z;
        }
    
        return Float32Array.from(colors);
    }
    
}

export default CircunferencePoints;