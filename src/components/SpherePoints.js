import React from 'react';
import * as THREE from 'three';

class SpherePoints extends React.Component {

    constructor(props) {
        super(props);
    
        const numPoints = 65 * 15;

        this.positions = this.getPoints(props.radius, props.position, numPoints);
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

    getPoints(radius, position, numPoints) {
    
        const points = this.getSpherePointsArray(radius, position, numPoints);
    
        return Float32Array.from(points);
    }
    
    getSpherePointsArray(radius, position, numPoints) {
        const array = []
    
        const a = radius;
    
        // ( cos(v)*cos(u), sin(u)*cos(v), sin(v) )
        const limit = Math.floor( Math.sqrt(numPoints-1) );
        for(let i=0; i <= limit; i++) {
            
            const u = (i/limit)*(2*Math.PI); // 0 <= u <= 2pi
            
            const iIndex = i*3;

            for(let j=0; j <= limit; j++) {

                const v = (j/limit)*(Math.PI) - Math.PI/2; // -pi/2 <= v <= pi/2
                
                const jIndex = j*limit*3;
                
                const x = a* Math.cos(u) * Math.cos(v) + position[0];
                const y = a* Math.sin(u) * Math.cos(v) + position[1];
                const z = a* Math.sin(v)               + position[2];
                
                array[iIndex+jIndex] = x.toFixed(5);
                array[iIndex+jIndex+1] = y.toFixed(5);
                array[iIndex+jIndex+2] = z.toFixed(5);
            }
        }
        
        return array;
    }
    
    getColors(numPoints) {
    
        const colors = [];
    
        const limit = Math.floor( Math.sqrt(numPoints-1) );
        const iLimit = (limit+1)**2;

        for(let i=0; i <= iLimit; i++) {
            const iIndex = i*3;

            const x = 1;
            const y = 1;
            const z = 1;
    
            colors[iIndex] = x;
            colors[iIndex+1] = y;
            colors[iIndex+2] = z;
        }
    
        return Float32Array.from(colors);
    }
    
}

export default SpherePoints;