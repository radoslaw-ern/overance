import { type ThemeColors } from '@/types/themeColors'

const scssVarsToJSON = (scssVars: string): JSON => {
  const output: JSON = JSON.parse(
    '{"' +
      scssVars
        .slice(10)
        .slice(0, -2)
        .replace(/ /g, '')
        .replace(/:/g, `":"`)
        .replace(/;/g, `",`)
        .replace(/\n/g, `"`)
        .slice(0, -1) +
      '}'
  )

  return output
}

const scssVarsToVuetifyColors = (scssVars: string): ThemeColors => {
  const output: ThemeColors = scssVarsToJSON(scssVars) as object as ThemeColors

  return output
}

export { scssVarsToJSON, scssVarsToVuetifyColors }
