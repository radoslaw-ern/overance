export enum GenericButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export interface GenericButton {
  label: string
  icon?: string
  type?: GenericButtonType
  to?: string
  disabled?: boolean
}
