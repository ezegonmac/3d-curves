import { Point } from '@react-three/drei';
import React from 'react';
import * as THREE from 'three';

class BulbPoints extends React.Component {

    constructor(props) {
        super(props);
    
        const numPoints = 100;

        this.positions = this.getPoints();
        console.log(this.positions)
        this.colors = this.getColors();
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
                    size={0.15} 
                    sizeAttenuation={false} 
                    color={0xffffff}
                />
            </points>
        );
    }

    getPoints() {
    
        const points = this.getBulbPointsArray();
    
        return Float32Array.from(points);
    }
    
    getBulbPointsArray() {
        const points = [];

        const scale = 6;

        const DIM = 256;
        const maxIterations = 10;
        const n = 8; //order
        const limitDistance = 2;
        for (let i = 0; i < DIM; i++) {
            for (let j = 0; j < DIM; j++) {
                
                let edge = false;
                for (let k = 0; k < DIM; k++) {
                    let x = (2*i/DIM)-1;
                    let y = (2*j/DIM)-1;
                    let z = (2*k/DIM)-1;

                    let zeta_x = 0;
                    let zeta_y = 0;
                    let zeta_z = 0;
                    for(let iteration = 0; iteration<=maxIterations; iteration++) {

                        // z in polar
                        const r = Math.sqrt(zeta_x*zeta_x + zeta_y*zeta_y + zeta_z*zeta_z)
                        const theta = Math.atan2(Math.sqrt(zeta_x*zeta_x + zeta_y*zeta_y) , zeta_z)
                        const phi = Math.atan2(zeta_y,zeta_x)

                        // z^n in cartesian
                        let zeta_n_x = r**n * Math.sin(theta*n) * Math.cos(phi*n);
                        let zeta_n_y = r**n * Math.sin(theta*n) * Math.sin(phi*n);
                        let zeta_n_z = r**n * Math.cos(theta*n);

                        // z <- z^n + c
                        zeta_x = zeta_n_x + x;
                        zeta_y = zeta_n_y + y;
                        zeta_z = zeta_n_z + z;

                        if(r>limitDistance) {
                            if(edge) {
                                edge = false;
                            }
                            break;
                        }
                        if(iteration===maxIterations) {
                            if(!edge) {
                                edge = true;
                                points.push(scale*x, scale*y, scale*z);
                            }
                        }

                    }



                }
            }
        }
        
        return points.flat();
    }
    
    getColors() {
    
        const DIM = 100;

        const colors = [];
        for(let i=0; i < DIM**3; i++) {
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

export default BulbPoints;