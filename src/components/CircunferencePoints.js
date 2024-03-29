import React from 'react';
import * as THREE from 'three';

class CircunferencePoints extends React.Component {

    constructor(props) {
        super(props);
    
        const numPoints = 100;

        this.positions = this.getPoints(props.radius, props.z, numPoints);
        console.log(this.positions)
        this.colors = this.getColors(numPoints);
        console.log(this.colors)
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
                    size={5} 
                    sizeAttenuation={false} 
                    color={0xffffff}
                />
            </points>
        );
    }

    getPoints(radius, z, numPoints) {
    
        const points = this.getCircunferencePointsArray(radius, z, numPoints);
    
        return Float32Array.from(points);
    }
    
    getCircunferencePointsArray(radius, z, numPoints) {
        const array = []
    
        const a = radius;
        const b = z;
    
        // ( a*cos(u), a*sin(u), b )
        for(let i=0; i <= numPoints-1; i++) {
            const j = i*3;

            const u = (i/numPoints)*(2*Math.PI); // 0 <= u <= 2pi

            const x = a * Math.cos(u);
            const y = a * Math.sin(u);
            const z = b;
            
            array[j] = x.toFixed(5);
            array[j+1] = y.toFixed(5);
            array[j+2] = z.toFixed(5);
        }
    
        return array;
    }
    
    getColors(numPoints) {
    
        const colors = [];
    
        for(let i=0; i <= numPoints-1; i++) {
            const j = i*3;

            const x = 1;
            const y = 1;
            const z = 1;
    
            colors[j] = x;
            colors[j+1] = y;
            colors[j+2] = z;
        }
    
        return Float32Array.from(colors);
    }
    
}

export default CircunferencePoints;