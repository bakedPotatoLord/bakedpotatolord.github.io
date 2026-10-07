

export async function wait(ms:number){
  await new Promise((res)=>setTimeout(res,ms))
}


export function isSorted(arr:number[]){
  for(let i = 1;i<arr.length;i++){
    if(arr[i-1] > arr[i]) return false
  }
  return true
}

