const getRandomInt = (min: number = 1, max: number = 1000): number => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min) + min)
}

export default getRandomInt
