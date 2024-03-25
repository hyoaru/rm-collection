type DivideArrayToSubArraysParams<T> = {
  array: T[];
  itemsPerSubArray: number
}

export default function divideArrayToSubArrays<T>({ array, itemsPerSubArray }: DivideArrayToSubArraysParams<T>): T[][] {
  let subArrays: T[][] = []

  for (let i = 0; i < array.length; i += itemsPerSubArray) {
    subArrays = [...subArrays, array.slice(i, i + itemsPerSubArray)]
  }

  return subArrays
}