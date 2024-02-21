import { useBoolean } from 'ahooks'
import { Button } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { FC, ReactElement, useState } from 'react'

import { CheckIcon, CloseIcon, EditIcon } from 'components/Icons'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import ReadonlyField, { ReadonlyFieldProps } from './ReadonlyField'

export type EditableFieldProps = ReadonlyFieldProps & {
  renderEditable: ({
    value,
  }: Pick<ReadonlyFieldProps, 'value'> & { onChange: (value: any) => void }) => ReactElement

  onSave: (value: any) => Promise<void>
  isLoading: boolean
}

const EditableField: FC<EditableFieldProps> = ({
  renderEditable,
  value: initialValue,
  displayValue = initialValue,

  onSave,
  isLoading,

  ...props
}) => {
  const [editable, { setTrue: setEditable, setFalse: setNotEditable }] = useBoolean(false)
  const [value, setValue] = useState(initialValue)

  const onChange = async () => {
    await onSave(value)
    setNotEditable()
  }

  const onCancel = () => {
    setValue(initialValue)
    setNotEditable()
  }

  return (
    <ReadonlyField
      value={initialValue}
      displayValue={
        editable ? (
          <Space>
            {renderEditable({ value: value, onChange: setValue })}
            {isLoading ? (
              <Spinner />
            ) : (
              <Button
                type='text'
                disabled={isEqual(initialValue, value)}
                icon={<CheckIcon $color='bleuDeFrance' $cursor='pointer' />}
                onClick={onChange}
              />
            )}
            <CloseIcon $color='fireOpal' onClick={onCancel} />
          </Space>
        ) : (
          <Space>
            {displayValue}
            <EditIcon $size='large' $cursor='pointer' $color='bleuDeFrance' onClick={setEditable} />
          </Space>
        )
      }
      {...props}
    />
  )
}

export default EditableField
