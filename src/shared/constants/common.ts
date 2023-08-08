import { EllipsisConfig } from 'antd/es/typography/Base'
import { FieldNames } from 'rc-select/lib/Select'

export const APP_NAME: string = 'Obermeister-ITSM'

export const DOUBLE_CLICK_DEBOUNCE_TIME: number = 300

export const commonEllipsisConfig: Pick<EllipsisConfig, 'rows' | 'expandable'> =
  {
    rows: 4,
    expandable: true,
  }

export const idAndTitleSelectFieldNames: Readonly<
  Pick<FieldNames, 'label' | 'value'>
> = {
  label: 'title',
  value: 'id',
}

export const idAndNameSelectFieldNames: Readonly<
  Pick<FieldNames, 'label' | 'value'>
> = {
  label: 'name',
  value: 'id',
}
