import React, { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { CONFIRM_TEXT } from 'shared/constants/common'

export type ConfirmModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onOk' | 'onCancel' | 'children' | 'title'>
>

const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  return <BaseModal {...props} okText={CONFIRM_TEXT} />
}

export default ConfirmModal
