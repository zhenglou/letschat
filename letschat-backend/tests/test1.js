async function test(){
  return 123;
}
const general2 =  async() => {
  try {
    console.log(await test());
  } catch (error) {
    throw error;
  }
}
general2();