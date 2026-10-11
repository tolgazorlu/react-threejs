# Floating Laptop

A React Three Fiber demo animating a GLTF laptop model with react-spring.

## About

A small CodeSandbox-style experiment rendering and animating a laptop GLTF model in 3D, using spring physics for smooth motion. Built January 2023.

## Features

- GLTF model loading and rendering with `@react-three/fiber` and `drei`
- Spring-based animation via `@react-spring/three`
- Orbit controls and contact shadows for a simple 3D scene

## Tech stack

- React 18
- three.js
- @react-three/fiber, @react-three/drei
- @react-spring/three, @react-spring/web
- Create React App (react-scripts)

## Project structure

```
src/App.js        # 3D scene and laptop model/animation
src/index.js       # React entry point
public/*.glb        # laptop GLTF models
```

## Getting started

```bash
npm install
npm start      # runs on http://localhost:3000
```

## Status

Learning/experiment project, not actively maintained.
