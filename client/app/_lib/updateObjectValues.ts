type UpdateObjectValuesParams<T> = {
  itemToUpdate?: T
  partiallyUpdatedItem: Partial<T>
}

export default function updateObjectValues<T>({itemToUpdate, partiallyUpdatedItem}: UpdateObjectValuesParams<T>){
  const updatedItem = itemToUpdate
  Object.entries(partiallyUpdatedItem).map(([key, value]) => {
    if (value && updatedItem) {
      updatedItem[key as keyof typeof updatedItem]
    }
  })

  return updatedItem
}