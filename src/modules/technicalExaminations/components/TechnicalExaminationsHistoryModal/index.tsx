import { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { SetNonNullable } from 'shared/types/utils'

import TechnicalExaminationsHistoryTable from '../TechnicalExaminationsHistoryTable'
import { TechnicalExaminationsHistoryTableProps } from '../TechnicalExaminationsHistoryTable/types'

export type TechnicalExaminationsHistoryModalProps = SetNonNullable<
  BaseModalProps,
  'open' | 'onCancel'
> &
  Pick<TechnicalExaminationsHistoryTableProps, 'loading' | 'dataSource'>

const TechnicalExaminationsHistoryModal: FC<TechnicalExaminationsHistoryModalProps> = (props) => {
  const { loading, dataSource, ...modalProps } = props

  return (
    <BaseModal
      {...modalProps}
      data-testid='technical-examinations-history-modal'
      title='История актов технической экспертизы'
      width='80%'
      footer={null}
    >
      <TechnicalExaminationsHistoryTable loading={loading} dataSource={dataSource} />
    </BaseModal>
  )
}

export default TechnicalExaminationsHistoryModal
