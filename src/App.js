import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF, ContactShadows, OrbitControls, Html, OrthographicCamera } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a as three } from '@react-spring/three'
import { a as web } from '@react-spring/web'
import './styles.css'

/*
function Model({ click, hinge, ...props }) {
  const group = useRef()
  // Load model
  const { nodes, materials } = useGLTF('/mac-draco2.glb')
  // Take care of cursor state on hover
  const [hovered, setHovered] = useState(false)

  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])

  return (
    <group
      ref={group}
      {...props}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
      dispose={null}>
      <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
        </group>
      </three.group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

*/

export function Model({ click, hinge, posy, posz, ...props }){
  const { nodes, materials } = useGLTF("/mac_draco2.glb");
  return (
    <group {...props} dispose={null} position={[0,-1,0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
      <three.group rotation-x={hinge} position-y={posy} position-z={posz}>
        <group>
        /**
         
        Ekranın çerçeveleri
         */
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials["Aluminum_-_Anodized_Glossy_Grey"]}
        />
        /**
        Apple logo 
        */
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.Acrylic_Clear}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials["Plastic_-_Translucent_Matte_Gray"]}
        />
        </group>
        </three.group>
        <group>
        Magsafe
         */
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials["Bronze_-_Polished"]}
        />
        /**
        Type-c
         */
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials["Steel_-_Satin"]}
        />
        /**
        Alt kasa
         */
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials["Aluminum_-_Anodized_Glossy_Grey_keyboard.jpg"]}
        />
        /**
        Alt kasanın ayakları
         */
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials["Rubber_-_Soft"]}
        />
        
        </group>
      </group>
    </group>
  );
}

export default function App() {
  // This flag controls click state, alternates between true & false
  const [click, setclick] = useState(false)
  // We turn this into a spring animation that interpolates between 0 and 1
  const props = useSpring({ 
    click: Number(click)
  })

  return (
    <web.main style={{ background: props.click.to([0, 1], ['#e7e7e7', '#485696']) }}>
      
      <web.h1 style={{opacity: props.click.to([0, 1], [1, 0]), position: 'absolute', top: '200px'}}>
        Click for discover!
      </web.h1>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.5, -12], fov: 15}}>
        <OrbitControls />
        <three.pointLight position={[10, 10, 10]} intensity={1.5} color={props.click.to([0, 1], ['#e7e7e7', '#485696 '])} />
        <Suspense fallback={null}>
          <group rotation={[0, Math.PI, 0]} onClick={(e) => (e.stopPropagation(), setclick(!click))}>
            <Model click={click} hinge={props.click.to([0, 1], [1.575, -0.425])} posy={props.click.to([0, 1], [1,0.1])} posz={props.click.to([0, 1], [-1.12, 0.5])}/>
          </group>
          <Environment preset="city" />
          <Html
            transform
            wrapperClass='htmlScreen'
            distanceFactor={1.14}
            position-y={-0.01}
            position-z={1.5}
            rotation-y={Math.PI}
            rotation-x={0.425}
            style={{
              transition: 'all 0.05s',
              opacity: click ? 1 : 0,
              transform: `scale(${click ? 1 : 0})`
            }}
          >
            <iframe src="https://geek.kiraathane.dev/" />
          </Html>
        </Suspense>
        <ContactShadows position={[0, -0.15, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5} />
      </Canvas>
    </web.main>
  )
}
