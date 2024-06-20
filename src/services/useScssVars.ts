import { type ThemeColors } from '@/types/themeColors'

const scssVarsToJSON = (scssVars: string): JSON => {
  const outputString: string =
    '{' +
    scssVars
      .replace(/ /g, '')
      .replace(/(?:\r\n|\r|\n)/g, '')
      .replace(':export{', '"')
      .replace(/:/g, '":"')
      .replace(/;/g, '","')
      .replace(',"}', '"')
      .replace('""', '')
      .replace('}', '') +
    '"}'

  const output: JSON = JSON.parse(outputString)

  return output
}

const scssVarsToVuetifyColors = (scssVars: string): ThemeColors => {
  const output: ThemeColors = scssVarsToJSON(scssVars) as object as ThemeColors

  return output
}

export { scssVarsToJSON, scssVarsToVuetifyColors }
