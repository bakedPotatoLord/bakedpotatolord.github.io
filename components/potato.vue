<template>
  <canvas ref="canvas"></canvas>
</template>

<script type="module" lang="ts">
import * as THREE from "three";
import { Object3D } from "three";
//@ts-ignore
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const cw = 600
const ch = 600

export default {
  mounted() {

  const canvas = <HTMLCanvasElement>this.$refs.canvas

    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera( 75, cw/ch, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha:true,
    });
    renderer.setSize( cw, ch );

    camera.position.z = 4;

    const light = new THREE.PointLight( 0xffffff, 1 );
    light.position.set( 0, 0, 5 );
    scene.add( light );

    const loader = new GLTFLoader();

    let potato:Object3D

    loader.load( '/potato/potato.glb',  ( gltf:any )=> {
      potato  =gltf.scene
      scene.add( gltf.scene );
    }, undefined,
      console.error
      );

    function animate() {
      requestAnimationFrame( animate );
      if(potato){
        //potato.rotation.x += 0.01;
        potato.rotation.y += 0.01;
      }

      renderer.render( scene, camera );
    }

    animate();
  },
};
</script>
