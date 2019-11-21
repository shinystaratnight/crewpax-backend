
const randomIndex = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

export default (length: number = 6) => {
  const codeLength = length
  const codeChars = '0123456789'

  let code = ''
  for (let index = 0; index < codeLength; index++) {
    code = code.concat(codeChars[randomIndex(0, codeChars.length)])
  }

  return code
}