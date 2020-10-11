import * as THREE from 'three';
import React, {Suspense, useMemo, useRef} from 'react';
import {Canvas, useFrame} from 'react-three-fiber';
import Effects from './Effects';
import './Bubbles.css';

function Swarm({count, mouse, type = 'sphere'}) {
    const mesh = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -20 + Math.random() * 40
            const yFactor = -20 + Math.random() * 40
            const zFactor = -20 + Math.random() * 40
            temp.push({t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0})
        }
        return temp
    }, [count])

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let {t, factor, speed, xFactor, yFactor, zFactor} = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.max(1.5, Math.cos(t) * 5)
            particle.mx += (mouse.current[0] - particle.mx) * 0.02
            particle.my += (-mouse.current[1] - particle.my) * 0.02
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <>
            <instancedMesh ref={mesh} args={[null, null, count]}>
                {
                    type === 'sphere' ?
                        <sphereBufferGeometry attach="geometry" args={[1, 32, 32]}/> :
                        <boxGeometry attach="geometry" args={[2, 2, 2]}/>
                }
                <meshPhongMaterial attach="material" color="white" aoMapIntensity={5}/>
            </instancedMesh>
        </>
    )
}

function Bubbles() {
    const sphereMouse = useRef([500, 300])
    const boxMouse = useRef([550, 350])

    return (
        <div className="BubbleWrapper">
            <Canvas
                className="Canvas"
                gl={{alpha: false, antialias: false, logarithmicDepthBuffer: true}}
                camera={{fov: 75, position: [0, 20, 70]}}
                onCreated={({gl}) => {
                    gl.setClearColor('#e0feff')
                    gl.toneMapping = THREE.ACESFilmicToneMapping
                    gl.outputEncoding = THREE.sRGBEncoding
                }}>
                <ambientLight intensity={1}/>
                <pointLight position={[100, 100, 100]} intensity={2.2}/>
                <pointLight position={[-100, -100, -100]} intensity={10} color="red"/>
                <Swarm mouse={sphereMouse} count={30} type={'sphere'}/>
                <Swarm mouse={boxMouse} count={30} type={'box'}/>
                <Suspense fallback={null}>
                    <Effects/>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Bubbles;