import getCollection from "@services/main/getCollection";

export default async function getRandomProducts(count = 4) {
  const { data: products, error } = await getCollection()
  const randomIndeces = []
  
  if (products.length < count) {
    return {data: [], error: {message: "Not enough products"}}
  }

  while (randomIndeces.length < count) {
    const randomIndex = Math.floor(Math.random() * products.length)
    if (!randomIndeces.includes(randomIndex)){
      randomIndeces.push(randomIndex)
    }
  }

  const data = randomIndeces.map((index) => (products[index]))

  return {data, error}
}