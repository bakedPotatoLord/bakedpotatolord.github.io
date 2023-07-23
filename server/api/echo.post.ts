export default defineEventHandler(async (event) => {
  let message = (await readBody(event)).message
  console.log(message)
  return {message}
  
})

