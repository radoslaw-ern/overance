export enum BaseButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export interface BaseButton {
  label: string
  icon?: string
  type?: BaseButtonType
  to?: string
  disabled?: boolean
}
