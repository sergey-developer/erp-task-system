import { Button, ButtonProps } from 'antd'
import React, { FC } from 'react'

import { FilterIcon } from 'components/Icons'

export type FilterButtonProps = Omit<ButtonProps, 'icon' | 'children'>

const FilterButton: FC<FilterButtonProps> = (props) => {
  return (
    <Button {...props} icon={<FilterIcon $size='large' />}>
      Фильтры
    </Button>
  )
}

export default FilterButton
