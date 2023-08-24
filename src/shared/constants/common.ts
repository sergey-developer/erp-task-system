import { EllipsisConfig } from 'antd/es/typography/Base'

export const APP_NAME: string = 'Obermeister-ITSM'

export const DOUBLE_CLICK_DEBOUNCE_TIME: number = 300

export const commonEllipsisConfig: Pick<EllipsisConfig, 'rows' | 'expandable'> =
  {
    rows: 4,
    expandable: true,
  }
