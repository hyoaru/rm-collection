export default function processErrorToCrossSideSafe(error){
    try {
        return Object.fromEntries(Object.entries(error))
    } catch (error) {
        return null
    }
}