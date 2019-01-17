export function createCookie(
  name: string,
  value: string | number,
  seconds?: number,
) {
  let expires = ''
  if (seconds) {
    const date = new Date(seconds * 1000)
    expires = `; expires=${date.toUTCString()}`
  }
  document.cookie = `${name}=${value}${expires}; path=/`
  return value
}

export function readCookie(name: string) {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let c of ca) {
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

export function eraseCookie(name: string) {
  createCookie(name, '', -1)
}
