import { useBoolean, useSetState } from 'ahooks'
import { Input, Button, Row, Col, MenuProps, TablePaginationConfig } from 'antd'
import { SearchProps } from 'antd/lib/input/Search'
import { FC, useCallback, useMemo, useState } from 'react'

import AddOrEditNomenclatureGroupModal from 'modules/warehouse/components/AddOrEditNomenclatureGroupModal'
import { AddOrEditNomenclatureGroupModalProps } from 'modules/warehouse/components/AddOrEditNomenclatureGroupModal/types'
import AddOrEditNomenclatureItemModal from 'modules/warehouse/components/AddOrEditNomenclatureItemModal'
import NomenclatureTable from 'modules/warehouse/components/NomenclatureTable'
import { NomenclatureTableProps } from 'modules/warehouse/components/NomenclatureTable/types'
import { createNomenclatureGroupMessages } from 'modules/warehouse/constants'
import {
  useGetNomenclatureGroupList,
  useGetNomenclatureList,
} from 'modules/warehouse/hooks'
import {
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureListQueryArgs,
} from 'modules/warehouse/models'
import { useCreateNomenclatureGroupMutation } from 'modules/warehouse/services/nomenclatureApi.service'

import { EditIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks'
import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/services/api'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import { GroupListMenuStyled } from './styles'

const { Search } = Input

const NomenclatureListPage: FC = () => {
  const [getNomenclatureGroupListParams, setGetNomenclatureGroupListParams] =
    useSetState<GetNomenclatureGroupListQueryArgs>({})

  const [getNomenclatureListParams, setGetNomenclatureListParams] =
    useSetState<GetNomenclatureListQueryArgs>({
      limit: 10,
      offset: 0,
    })

  const [hoveredGroup, setHoveredGroup] = useState<number>()

  const [
    addNomenclatureGroupModalOpened,
    { toggle: toggleAddNomenclatureGroupModal },
  ] = useBoolean(false)

  const debouncedToggleAddNomenclatureGroupModal = useDebounceFn(
    toggleAddNomenclatureGroupModal,
  )

  const [
    addNomenclatureItemModalOpened,
    { toggle: toggleAddNomenclatureItemModal },
  ] = useBoolean(false)

  const debouncedToggleAddNomenclatureItemModal = useDebounceFn(
    toggleAddNomenclatureItemModal,
  )

  const [
    createNomenclatureGroupMutation,
    { isLoading: createNomenclatureGroupIsLoading },
  ] = useCreateNomenclatureGroupMutation()

  const {
    currentData: nomenclatureGroupList = [],
    isFetching: nomenclatureGroupListIsFetching,
  } = useGetNomenclatureGroupList(getNomenclatureGroupListParams)

  const {
    currentData: nomenclatureList,
    isFetching: nomenclatureListIsFetching,
  } = useGetNomenclatureList(getNomenclatureListParams)

  const groupListMenuItems: MenuProps['items'] = useMemo(
    () =>
      nomenclatureGroupList.map(({ id, title }) => ({
        key: id,
        label: title,
        title,
        itemIcon: id === hoveredGroup && (
          <EditIcon title='Редактировать группу' />
        ),
        onMouseEnter: () => setHoveredGroup(id),
        onMouseLeave: () => setHoveredGroup(undefined),
      })),
    [hoveredGroup, nomenclatureGroupList],
  )

  const handleCreateNomenclatureGroup = useCallback<
    AddOrEditNomenclatureGroupModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await createNomenclatureGroupMutation({
          ...values,
          getListParams: getNomenclatureGroupListParams,
        }).unwrap()

        toggleAddNomenclatureGroupModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            if (error.data.detail) {
              showErrorNotification(error.data.detail)
            }

            setFields(getFieldsErrors(error.data))
          } else if (isForbiddenError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          } else {
            showErrorNotification(createNomenclatureGroupMessages.commonError)
          }
        }
      }
    },
    [
      createNomenclatureGroupMutation,
      getNomenclatureGroupListParams,
      toggleAddNomenclatureGroupModal,
    ],
  )

  const handleChangeSearch: SearchProps['onSearch'] = (value) => {
    const searchValue = value || undefined
    setGetNomenclatureGroupListParams({ search: searchValue })
    setGetNomenclatureListParams({ search: searchValue, group: undefined })
  }

  const handleTablePagination = useCallback(
    (pagination: TablePaginationConfig) => {
      setGetNomenclatureListParams({
        offset: (pagination.current! - 1) * pagination.pageSize!,
        limit: pagination.pageSize!,
      })
    },
    [setGetNomenclatureListParams],
  )

  const handleChangeTable = useCallback<NomenclatureTableProps['onChange']>(
    (pagination) => {
      handleTablePagination(pagination)
    },
    [handleTablePagination],
  )

  const handleClickGroup: MenuProps['onClick'] = (data) => {
    setGetNomenclatureListParams({ group: Number(data.key) })
  }

  return (
    <>
      <Space
        data-testid='nomenclature-list-page'
        $block
        direction='vertical'
        size='middle'
      >
        <Space size='middle'>
          <Search
            placeholder='Поиск номенклатуры'
            disabled={nomenclatureGroupListIsFetching}
            onSearch={handleChangeSearch}
          />

          <Button onClick={debouncedToggleAddNomenclatureGroupModal}>
            + Добавить группу
          </Button>

          <Button onClick={debouncedToggleAddNomenclatureItemModal}>
            + Добавить номенклатуру
          </Button>
        </Space>

        <Row gutter={16}>
          <Col span={5}>
            <LoadingArea
              data-testid='group-list-loading'
              isLoading={nomenclatureGroupListIsFetching}
              area='parent'
              tip='Загрузка групп...'
            >
              <GroupListMenuStyled
                data-testid='group-list'
                mode='inline'
                items={groupListMenuItems}
                onClick={handleClickGroup}
              />
            </LoadingArea>
          </Col>

          <Col span={19}>
            <NomenclatureTable
              dataSource={nomenclatureList?.results || []}
              pagination={nomenclatureList?.pagination || false}
              loading={nomenclatureListIsFetching}
              onChange={handleChangeTable}
            />
          </Col>
        </Row>
      </Space>

      {addNomenclatureGroupModalOpened && (
        <AddOrEditNomenclatureGroupModal
          visible={addNomenclatureGroupModalOpened}
          title='Добавление номенклатурной группы'
          okText='Добавить'
          isLoading={createNomenclatureGroupIsLoading}
          onCancel={debouncedToggleAddNomenclatureGroupModal}
          onSubmit={handleCreateNomenclatureGroup}
        />
      )}

      {addNomenclatureItemModalOpened && (
        <AddOrEditNomenclatureItemModal
          visible={addNomenclatureItemModalOpened}
          title='Добавление номенклатурной позиции'
          okText='Добавить'
          onCancel={debouncedToggleAddNomenclatureItemModal}
          onSubmit={async () => {}}
        />
      )}
    </>
  )
}

export default NomenclatureListPage
