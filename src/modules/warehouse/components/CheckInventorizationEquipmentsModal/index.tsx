import { Checkbox, CheckboxProps, Flex, Typography } from 'antd'
import React, { FC, useMemo, useState } from 'react'

import CheckInventorizationEquipmentsTable from 'modules/warehouse/components/CheckInventorizationEquipmentsTable'
import {
  CheckInventorizationEquipmentsTableProps,
  CheckInventorizationEquipmentsTableRow,
} from 'modules/warehouse/components/CheckInventorizationEquipmentsTable/types'

import { ExclamationCircleIcon } from 'components/Icons'
import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { SAVE_TEXT } from 'shared/constants/common'

const { Text } = Typography

export type CheckInventorizationEquipmentsModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel'>
> &
  Pick<CheckInventorizationEquipmentsTableProps, 'onClickEdit' | 'editTouchedRowsIds'> & {
    data: CheckInventorizationEquipmentsTableRow[]
    onSubmit: () => Promise<void>
    isLoading: boolean
  }

const CheckInventorizationEquipmentsModal: FC<CheckInventorizationEquipmentsModalProps> = ({
  data,
  onSubmit,
  isLoading,
  onClickEdit,
  editTouchedRowsIds,
  ...props
}) => {
  const [isNotCredited, setIsNotCredited] = useState(false)
  const hasIsNotCredited = useMemo(() => data.some(({ isCredited }) => !isCredited), [data])

  const filteredData = useMemo(
    () =>
      hasIsNotCredited ? data.filter((item) => (isNotCredited ? !item.isCredited : true)) : data,
    [data, hasIsNotCredited, isNotCredited],
  )

  const handleChangeIsNotCredited: CheckboxProps['onChange'] = (event) => {
    setIsNotCredited(event.target.checked)
  }

  return (
    <BaseModal
      {...props}
      data-testid='check-inventorization-equipments-modal'
      okText={SAVE_TEXT}
      onOk={onSubmit}
      confirmLoading={isLoading}
      width='80%'
      title='Результаты загрузки оборудования из Excel'
    >
      <Flex vertical gap='middle'>
        {hasIsNotCredited && (
          <Flex data-testid='is-credited-block' vertical gap='middle'>
            <Flex gap='small'>
              <ExclamationCircleIcon $size='large' $color='fireOpal' />

              <Text>В списке результатов загрузки есть оборудование, требующее оприходования</Text>
            </Flex>

            <Flex gap='small'>
              <Checkbox checked={isNotCredited} onChange={handleChangeIsNotCredited}>
                Показывать только оборудование, требующее оприходования
              </Checkbox>
            </Flex>
          </Flex>
        )}

        <CheckInventorizationEquipmentsTable
          dataSource={filteredData}
          loading={isLoading}
          onClickEdit={onClickEdit}
          editTouchedRowsIds={editTouchedRowsIds}
        />
      </Flex>
    </BaseModal>
  )
}

export default CheckInventorizationEquipmentsModal
