
<script setup lang="ts">

import { isSorted } from "~/utils/sorting/helpers"
import { err } from '~/utils/maze/helpers'


let working = false
let active = -1
let sorted = true
let canvas = ref<HTMLCanvasElement | null>(null)
let ctx:CanvasRenderingContext2D
let cw:number;
let ch:number;
let arr=Array(40).fill(undefined).map((_el,i)=>(i+1))

const setWorking =(isWorking:boolean)=>{working = isWorking}
const setActive =(isActive:number)=>{active=isActive}
const setArr=(m_arr:number[])=>{arr = m_arr};

onMounted(()=>{
  if(canvas.value != null){
    ctx = canvas.value.getContext('2d') ?? err("no ctx")
    cw = canvas.value.width = 400
    ch = canvas.value.height = 300

    draw(arr)
  }
  console.log("draw called, arr", arr)
})

const nlognsorts = [
  {name:"Merge Sort", func:initMergeSort , time:"nlogn"},
]

const polynomialSorts = [
  {name:"Bubble Sort", func:bubbleSort, time:"n^2"},
  {name:"Insertion Sort", func:insertionSort, time:"n^2"},
  {name:"Selection Sort", func:selectionSort , time:"n^2"},
]

const exponentialSorts = [
  {name:"Bozo Sort", func:bozoSort, time:"n!"},
]




function swap(arr:any[],i1:number,i2:number){
  let temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}

function shuffle(){
  for(let i in arr){
    swap(arr,Math.floor(Math.random()*20),Number(i))
  }
  endSort()
}

function reverse(){
  setArr(Array(40).fill(undefined).map((_el,i)=>(i+1)).reverse())
  endSort()
}

function semiSort(){
  setArr(Array(40).fill(undefined).map((_el,i)=>(i+1)))
  
  for(let i = 0; i<arr.length;i+=Math.floor(Math.random()*5)){
    swap(arr,Math.floor(Math.random()*20),i)
  }
  endSort()
}

function endSort(){
  active = -1
  working = false
  draw(arr)
}

function draw(arr:number[]){
  ctx.clearRect(0,0,cw,ch)
  ctx.save()
  
  for(let i in arr){
    ctx.fillStyle = sorted ? 'green': '#000000';
    ctx.fillStyle = (active >=0 && parseInt(i) ==  active) ? 'red' : ctx.fillStyle;
    ctx.fillRect(0+1,ch-1,8,-arr[i]*(250/39))
    ctx.translate(10,0)
  }
  ctx.restore()
}

async function bozoSort(){

  if(!window.confirm('bozo sort uses exponential time. Since each iteration takes ~20ms, and 40! = 815915283247897734345611269596115894272000000000 , this cannot be expected to solve the equation for ~5.175*(10^38) years, or  ~3.8*(10^28) universe ages')){
    return
  }

  shuffle()
  while(!isSorted(arr)){

    shuffle()
    await new Promise((res)=>setTimeout(res,1))
    draw(arr)

  }
  // setArr(localArray) 

  endSort()
}

async function bubbleSort (){  
  let bubbleSortI = 1
  setWorking(true)

  while(true){
    if(arr[bubbleSortI-1] > arr[bubbleSortI]){
      swap(arr,bubbleSortI-1,bubbleSortI)

    }

    if(bubbleSortI >= arr.length - 1){
      if(isSorted(arr)){
        break
      }else{
        bubbleSortI = 1
      }
    }else{
      bubbleSortI++
    }

    setActive( bubbleSortI)
    draw(arr)
    await new Promise((res)=>setTimeout(res,10))
  }
  endSort()
  setArr(arr)
}

async function selectionSort(){
  setWorking(true)
  for(let i = 0;i<arr.length;i++){
    let max = i
    for(let j =i ;j<arr.length;j++){
      max = arr[max]<arr[j] ? max : j
      await new Promise((res)=>setTimeout(res,10))
      setActive(j)
      draw(arr)
    }
    swap(arr,max,i)
  }
  endSort()
}

async function insertionSort(){
  setWorking(true)
  for(let i=1;i<arr.length;i++){
    let temp = arr[i];
    let j=i-1;

    while(j>=0 && arr[j] > temp){
      arr[j+1] = arr[j];
      j--;
      await new Promise((res)=>setTimeout(res,50))
      setActive(j)
      draw(arr)
    }
    arr[j+1] = temp;
    setActive(i)
    await new Promise((res)=>setTimeout(res,50))
    draw(arr)
  }
  endSort()
}

async function initMergeSort(){
  setArr( await mergeSort(arr) )
  endSort()
}

async function mergeSort(marr:number[]):Promise<number[]>{
  const mid = marr.length /2
  
  return marr.length < 2 ?
  marr :
  await merge(
    await mergeSort(marr.slice(0,mid)),
    await mergeSort(marr.slice(mid))
  )
}

async function merge(left:number[],right:number[]):Promise<number[]>{
  let arr:number[] = []
  while(left.length && right.length){
    arr.push(left[0] < right[0] ? left.shift() as number : right.shift() as number)
    draw(arr)
    await new Promise(res=>setTimeout(res,40))
  }
  return [...arr,...left,...right]
}

</script>

<template>
  <div class="container">

    <h1>Sorting Algorithms!</h1>
    <h4>Press some buttons and test it out.</h4>
    <hr>
    <label >Starting Configurations:</label>
    <button @click="()=>{if(!working){ shuffle()}}">Shuffled</button>
    <button @click="()=>{if(!working){ reverse()}}" >Reverse</button>
    <button @click="()=>{if(!working){ semiSort()}}" >Semi-Sorted</button>
    <hr>
    <label for="">Factorial Time:</label>
    <button v-for="sort in exponentialSorts" :key="sort.name" @click="()=>{if(!working){sort.func()}}">{{ sort.name }}</button>
    <hr>
    <label for="">Quadratic Time:</label>
    <button v-for="sort in polynomialSorts" :key="sort.name" @click="()=>{if(!working){sort.func()}}">{{ sort.name }}</button>
    <hr>
    <label for="">nlogn Time:</label>
    <button v-for="sort in nlognsorts" :key="sort.name" @click="()=>{if(!working){sort.func()}}">{{ sort.name }}</button>
  
    <br>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped >
.container{
  margin-left:5%;
  margin-right:5%;
  canvas{
    border:2px solid black;
    margin-top:10px;
  }
}
</style>