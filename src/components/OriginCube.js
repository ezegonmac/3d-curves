import React from "react";

class OriginCube extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            position: props.position,
        }
    }

    componentDidUpdate(prevProps){
        
        console.log("e");

        if(prevProps.position[0] !== this.state.position[0]){

            console.log("update");

            this.setState({          
                position: this.props.position,
            });
        }
    }

    render() {
        return(
            <mesh position={this.state.position} onUpdate={()=>{console.log("mesh")}} >
                <boxGeometry attach="geometry" args={[0.5,0.5,0.5]}/>
                <meshStandardMaterial attach="material" color="#ff0000"/>
            </mesh>
        )
    }
}

export default OriginCube;