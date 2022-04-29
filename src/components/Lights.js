

const Lights = () => {
    return(
        <>
            <ambientLight intensity={0.2}/>
            <pointLight position={[10, 10, 10]} intensity={1}/>
        </>
    );
}

export default Lights;