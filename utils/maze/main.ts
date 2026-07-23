
//show solution button
// let showSolution = (<HTMLInputElement>document.querySelector('#showSolution'))
// showSolution
//   .onclick = (e) => {
//     //data validation
//     if (!mazeExists) {
//       e.preventDefault()
//       alert('you need to generate your maze first bozo')
//       return
//     }
//     //set line style based on 
//     if ((<HTMLInputElement>e.target).checked) {
//       ctx.strokeStyle = 'blue'
//     } else {
//       ctx.strokeStyle = 'white'
//     }

//     //trace the parent path
//     let n = endingNode
//     if (n.type == 6 || n.type == 3) {
//       nodes.forEach(n => n.y *= (Math.sqrt(3) / 2))
//     }

//     if ((<HTMLInputElement>e.target).checked) {
//       ctx.lineWidth = 2
//     } else {
//       ctx.lineWidth = 3.5
//     }

//     ctx.beginPath()
//     ctx.moveTo(n.x, n.y)
//     while (n.parent != undefined) {

//       ctx.lineTo(n.parent.x, n.parent.y)
//       ctx.lineTo(n.x, n.y)
//       ctx.lineTo(n.parent.x, n.parent.y)
//       n = n.parent
//     }
//     ctx.stroke()
//     if (n.type == 6 || n.type == 3) {
//       nodes.forEach(n => n.y /= (Math.sqrt(3) / 2))
//     }
//     //re-draw start and end nodes
//     startingNode.draw(ctx, blockSize)
//     endingNode.draw(ctx, blockSize)
//   }
