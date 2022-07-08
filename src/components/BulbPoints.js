import { Point } from '@react-three/drei';
import React from 'react';
import * as THREE from 'three';

class BulbPoints extends React.Component {

    constructor(props) {
        super(props);

        this.positions = this.getPoints();
        console.log(this.positions)
        this.colors = this.getColors(this.positions);
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
                    size={0.2} 
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

        const DIM = 190;
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
    
    getColors(points) {
        // const max = Math.SQRT2 * Math.max(...points);
        // const min = max/7;
        const max = 7;
        const min = 5;

        console.log(max)
        console.log(min)

        const colors = [];
        for(let i=0; i < points.length/3; i++) {
            const iIndex = i*3;

            const x = points[iIndex];
            const y = points[iIndex+1];
            const z = points[iIndex+2];

            const module = Math.sqrt(x**2, y**2, z**2);
            const k = (module-min)/(max-min); //normalize

            const r = k;
            const g = k;
            const b = k;
            colors[iIndex] = r;
            colors[iIndex+1] = g;
            colors[iIndex+2] = b;
        }
    
        return Float32Array.from(colors);
    }
    
}

export default BulbPoints;