export const capitalize = (str: string) => {
  const lower = str.toLowerCase()
  const firstLetter = lower[0].toUpperCase()
  return `${firstLetter}${lower.slice(1)}`
}

export const titleize = (str: string) => {
  const words = str.replace(/_+/g, ' ').split(' ')
  return words.map(capitalize).join(' ')
}
