<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { Object3D } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = ref<HTMLCanvasElement | null>(null);
const width = ref(0);
let cw = 0,
  ch = 0,
  renderer: THREE.WebGLRenderer;

onMounted(() => {
  width.value = window.innerWidth;
  let remValue = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  cw = Math.min(window.innerWidth - 4 * remValue, 300);
  ch = cw ;

  if (canvas.value) {
    if (width.value > 800) {
      canvas.value.hidden = false;
      setupCanvas(canvas.value);
    } else {
      canvas.value.hidden = true;
    }
  }

  document.addEventListener("resize", () => {
    console.log("resize");
    width.value = window.innerWidth;
    remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
    cw = Math.min(window.innerWidth - 4 * remValue, 300);
    ch = cw / Math.SQRT2;
    renderer?.setSize(cw, ch);
    if (canvas.value) {
      if (width.value > 800) {
        canvas.value.hidden = false;
        setupCanvas(canvas.value);
      } else {
        canvas.value.hidden = true;
      }
    }
  });
});

function setupCanvas(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  scene.background = null;
  const camera = new THREE.PerspectiveCamera(75, cw / ch, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });
  renderer.setSize(cw, ch);
  camera.position.z = 2.5;

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(0, 0, 5);
  scene.add(light);

  const loader = new GLTFLoader();
  let potato: Object3D;
  loader.load(
    "/potato/potato.glb",
    (gltf: any) => {
      potato = gltf.scene;
      scene.add(gltf.scene);
    },
    (xhr: any) => {
      //console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    console.error
  );

  function animate() {
    requestAnimationFrame(animate);
    if (potato) {
      potato.rotation.y += 0.01;
      //potato.rotation.x += 0.01;
      //potato.rotation.z += 0.01;
    }

    renderer.render(scene, camera);
  }

  animate();
}
</script>
