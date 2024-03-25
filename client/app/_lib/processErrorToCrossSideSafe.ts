export default function processErrorToCrossSideSafe(error: any){
  if (!error) {
    return error
  }

  try {
      return Object.fromEntries(Object.entries(error))
  } catch (error) {
      return null
  }
}