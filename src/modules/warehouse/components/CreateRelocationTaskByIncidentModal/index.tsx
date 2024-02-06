import { Col, Form, Row, Select, SelectProps, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FC } from 'react'

import { TaskListItemModel } from 'modules/task/models'
import { getFullUserName } from 'modules/user/utils'

import LoadingArea from 'components/LoadingArea'
import BaseModal from 'components/Modals/BaseModal'
import Space from 'components/Space'

import { onlyRequiredRules } from 'shared/constants/validation'
import { formatDate } from 'shared/utils/date'
import { getSelectFieldNames } from 'shared/utils/selectField'

import {
  CreateRelocationTaskByIncidentFormFields,
  CreateRelocationTaskByIncidentModalProps,
} from './types'

const selectFieldNames = getSelectFieldNames('recordId')
const selectStyles: SelectProps['style'] = { width: '100%' }
const { Text } = Typography

const CreateRelocationTaskByIncidentModal: FC<CreateRelocationTaskByIncidentModalProps> = ({
  onFinish,

  searchValue,
  onSearchIncident,
  onChangeIncident,

  incidents,
  incidentsIsLoading,

  incident,
  incidentIsLoading,

  ...props
}) => {
  const [form] = useForm<CreateRelocationTaskByIncidentFormFields>()

  return (
    <BaseModal
      {...props}
      data-testid='create-relocation-task-by-incident-modal'
      okText='Продолжить'
      onOk={form.submit}
      title='Создать заявку на основе инцидента'
    >
      <Space $block direction='vertical' size='middle'>
        <Form<CreateRelocationTaskByIncidentFormFields>
          form={form}
          layout='vertical'
          onFinish={onFinish}
        >
          <Form.Item name='incident' label='Инцидент' rules={onlyRequiredRules}>
            <Select<TaskListItemModel['id'], TaskListItemModel>
              data-testid='incident-select'
              style={selectStyles}
              placeholder='Введите текст'
              showSearch
              onChange={onChangeIncident}
              onSearch={onSearchIncident}
              searchValue={searchValue}
              autoFocus
              notFoundContent={null}
              filterOption={false}
              options={incidents}
              fieldNames={selectFieldNames}
              loading={incidentsIsLoading}
            />
          </Form.Item>
        </Form>

        <LoadingArea isLoading={incidentIsLoading}>
          {incident && (
            <Space $block direction='vertical'>
              <Row>
                <Col span={5}>
                  <Text type='secondary'>Тема:</Text>
                </Col>

                <Col span={19}>{incident.title}</Col>
              </Row>

              <Row>
                <Col span={5}>
                  <Text type='secondary'>Срок:</Text>
                </Col>

                {incident.olaNextBreachTime && (
                  <Col span={19}>{formatDate(incident.olaNextBreachTime)}</Col>
                )}
              </Row>

              <Row>
                <Col span={5}>
                  <Text type='secondary'>Объект:</Text>
                </Col>

                <Col span={19}>{incident.name}</Col>
              </Row>

              <Row>
                <Col span={5}>
                  <Text type='secondary'>Адрес:</Text>
                </Col>

                {incident.address && <Col span={19}>{incident.address}</Col>}
              </Row>

              <Row>
                <Col span={5}>
                  <Text type='secondary'>Исполнитель:</Text>
                </Col>

                {incident.assignee && <Col span={19}>{getFullUserName(incident.assignee)}</Col>}
              </Row>
            </Space>
          )}
        </LoadingArea>
      </Space>
    </BaseModal>
  )
}

export default CreateRelocationTaskByIncidentModal
