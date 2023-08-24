import { useBoolean, useSetState } from 'ahooks'
import { Input, Button, Row, Col, MenuProps, TablePaginationConfig } from 'antd'
import { SearchProps } from 'antd/lib/input/Search'
import {
  FC,
  useCallback,
  useMemo,
  useState,
  MouseEvent,
  useEffect,
} from 'react'

import MatchUserPermissions from 'modules/user/components/MatchUserPermissions'
import { useMatchUserPermissions } from 'modules/user/hooks'
import AddOrEditNomenclatureGroupModal from 'modules/warehouse/components/AddOrEditNomenclatureGroupModal'
import { AddOrEditNomenclatureGroupModalProps } from 'modules/warehouse/components/AddOrEditNomenclatureGroupModal/types'
import AddOrEditNomenclatureModal from 'modules/warehouse/components/AddOrEditNomenclatureModal'
import { AddOrEditNomenclatureModalProps } from 'modules/warehouse/components/AddOrEditNomenclatureModal/types'
import NomenclatureTable from 'modules/warehouse/components/NomenclatureTable'
import { NomenclatureTableProps } from 'modules/warehouse/components/NomenclatureTable/types'
import {
  createNomenclatureGroupMessages,
  createNomenclatureMessages,
  updateNomenclatureGroupMessages,
  updateNomenclatureMessages,
} from 'modules/warehouse/constants'
import {
  useGetCountryList,
  useGetMeasurementUnitList,
  useGetNomenclature,
  useGetNomenclatureGroupList,
  useGetNomenclatureList,
} from 'modules/warehouse/hooks'
import {
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureListQueryArgs,
  NomenclatureGroupListItemModel,
} from 'modules/warehouse/models'
import {
  useCreateNomenclatureGroupMutation,
  useCreateNomenclatureMutation,
  useUpdateNomenclatureGroupMutation,
  useUpdateNomenclatureMutation,
} from 'modules/warehouse/services/nomenclatureApi.service'

import { EditIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks'
import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/api'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'
import { calculatePaginationParams } from 'shared/utils/pagination'

import { GroupListMenuStyled } from './styles'

const { Search } = Input

const NomenclatureListPage: FC = () => {
  const updateNomenclaturePerms = useMatchUserPermissions([
    'NOMENCLATURES_UPDATE',
  ])
  const updateNomenclatureGroupPerms = useMatchUserPermissions([
    'NOMENCLATURE_GROUPS_UPDATE',
  ])

  const [getNomenclatureGroupListParams, setGetNomenclatureGroupListParams] =
    useSetState<GetNomenclatureGroupListQueryArgs>({})

  const [getNomenclatureListParams, setGetNomenclatureListParams] =
    useSetState<GetNomenclatureListQueryArgs>({ limit: 10, offset: 0 })

  const [hoveredGroupId, setHoveredGroupId] = useState<number>()
  const [editableGroup, setEditableGroup] =
    useState<NomenclatureGroupListItemModel>()

  const [editableNomenclatureId, setEditableNomenclatureId] = useState<number>()

  const [
    addNomenclatureGroupModalOpened,
    { toggle: toggleAddNomenclatureGroupModal },
  ] = useBoolean(false)

  const debouncedToggleAddNomenclatureGroupModal = useDebounceFn(
    toggleAddNomenclatureGroupModal,
  )

  const [
    editNomenclatureGroupModalOpened,
    { toggle: toggleEditNomenclatureGroupModal },
  ] = useBoolean(false)

  const debouncedToggleEditNomenclatureGroupModal = useDebounceFn(
    toggleEditNomenclatureGroupModal,
  )

  const [addNomenclatureModalOpened, { toggle: toggleAddNomenclatureModal }] =
    useBoolean(false)

  const debouncedToggleAddNomenclatureModal = useDebounceFn(
    toggleAddNomenclatureModal,
  )

  const [editNomenclatureModalOpened, { toggle: toggleEditNomenclatureModal }] =
    useBoolean(false)

  const debouncedHandleOpenEditNomenclatureModal = useDebounceFn<
    NomenclatureTableProps['onClickName']
  >((id) => {
    setEditableNomenclatureId(id)
    toggleEditNomenclatureModal()
  })

  const handleCloseEditNomenclatureModal = useCallback(() => {
    setEditableNomenclatureId(undefined)
    toggleEditNomenclatureModal()
  }, [toggleEditNomenclatureModal])

  const debouncedHandleCloseEditNomenclatureModal = useDebounceFn(
    handleCloseEditNomenclatureModal,
  )

  const [
    createNomenclatureGroupMutation,
    { isLoading: createNomenclatureGroupIsLoading },
  ] = useCreateNomenclatureGroupMutation()

  const [
    updateNomenclatureGroupMutation,
    { isLoading: updateNomenclatureGroupIsLoading },
  ] = useUpdateNomenclatureGroupMutation()

  const {
    currentData: nomenclatureGroupList = [],
    isFetching: nomenclatureGroupListIsFetching,
  } = useGetNomenclatureGroupList(getNomenclatureGroupListParams)

  const {
    currentData: allNomenclatureGroupList = [],
    isFetching: allNomenclatureGroupListIsFetching,
  } = useGetNomenclatureGroupList(undefined, {
    skip: !addNomenclatureModalOpened && !editNomenclatureModalOpened,
  })

  const [
    createNomenclatureMutation,
    { isLoading: createNomenclatureIsLoading },
  ] = useCreateNomenclatureMutation()

  const [
    updateNomenclatureMutation,
    { isLoading: updateNomenclatureIsLoading },
  ] = useUpdateNomenclatureMutation()

  const {
    currentData: nomenclature,
    isFetching: nomenclatureIsFetching,
    isError: isGetNomenclatureError,
  } = useGetNomenclature(editableNomenclatureId!, {
    skip: !editableNomenclatureId && !editNomenclatureModalOpened,
  })

  useEffect(() => {
    if (isGetNomenclatureError) {
      handleCloseEditNomenclatureModal()
    }
  }, [handleCloseEditNomenclatureModal, isGetNomenclatureError])

  const {
    currentData: nomenclatureList,
    isFetching: nomenclatureListIsFetching,
  } = useGetNomenclatureList(getNomenclatureListParams)

  const {
    currentData: measurementUnitList = [],
    isFetching: measurementUnitListIsFetching,
  } = useGetMeasurementUnitList(undefined, {
    skip: !addNomenclatureModalOpened && !editNomenclatureModalOpened,
  })

  const { currentData: countryList = [], isFetching: countryListIsFetching } =
    useGetCountryList(undefined, {
      skip: !addNomenclatureModalOpened && !editNomenclatureModalOpened,
    })

  const groupListMenuItems: MenuProps['items'] = useMemo(() => {
    const handleClickEdit =
      (group: NomenclatureGroupListItemModel) => (event: MouseEvent) => {
        event.stopPropagation()
        setEditableGroup(group)
        debouncedToggleEditNomenclatureGroupModal()
      }

    return nomenclatureGroupList.map((group) => {
      const { id, title } = group

      return {
        key: id,
        label: title,
        title,
        itemIcon: id === hoveredGroupId &&
          updateNomenclatureGroupPerms?.nomenclatureGroupsUpdate && (
            <EditIcon
              title='Редактировать группу'
              onClick={handleClickEdit(group)}
            />
          ),
        onMouseEnter: () => setHoveredGroupId(id),
        onMouseLeave: () => setHoveredGroupId(undefined),
      }
    })
  }, [
    debouncedToggleEditNomenclatureGroupModal,
    hoveredGroupId,
    nomenclatureGroupList,
    updateNomenclatureGroupPerms?.nomenclatureGroupsUpdate,
  ])

  const handleClickGroup: MenuProps['onClick'] = (data) => {
    setGetNomenclatureListParams({ group: Number(data.key), offset: 0 })
  }

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

  const handleUpdateNomenclatureGroup: AddOrEditNomenclatureGroupModalProps['onSubmit'] =
    async (values, setFields) => {
      if (!editableGroup) return

      try {
        await updateNomenclatureGroupMutation({
          ...values,
          id: editableGroup.id,
          getListParams: getNomenclatureGroupListParams,
        }).unwrap()

        toggleEditNomenclatureGroupModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            if (error.data.detail) {
              showErrorNotification(error.data.detail)
            }

            setFields(getFieldsErrors(error.data))
          } else if (isForbiddenError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          } else if (isNotFoundError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          } else {
            showErrorNotification(updateNomenclatureGroupMessages.commonError)
          }
        }
      }
    }

  const handleCreateNomenclature = useCallback<
    AddOrEditNomenclatureModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await createNomenclatureMutation(values).unwrap()
        toggleAddNomenclatureModal()
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
            showErrorNotification(createNomenclatureMessages.commonError)
          }
        }
      }
    },
    [createNomenclatureMutation, toggleAddNomenclatureModal],
  )

  const handleUpdateNomenclature: AddOrEditNomenclatureModalProps['onSubmit'] =
    async (values, setFields) => {
      if (!editableNomenclatureId) return

      try {
        await updateNomenclatureMutation({
          ...values,
          id: editableNomenclatureId,
          getListParams: getNomenclatureListParams,
        }).unwrap()

        handleCloseEditNomenclatureModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            if (error.data.detail) {
              showErrorNotification(error.data.detail)
            }

            setFields(getFieldsErrors(error.data))
          } else if (isForbiddenError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          } else if (isNotFoundError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          } else {
            showErrorNotification(updateNomenclatureMessages.commonError)
          }
        }
      }
    }

  const handleChangeSearch: SearchProps['onSearch'] = (value) => {
    const searchValue = value || undefined

    setGetNomenclatureGroupListParams({ search: searchValue })

    setGetNomenclatureListParams({
      search: searchValue,
      group: undefined,
      offset: 0,
    })
  }

  const handleTablePagination = useCallback(
    (pagination: TablePaginationConfig) => {
      setGetNomenclatureListParams(calculatePaginationParams(pagination))
    },
    [setGetNomenclatureListParams],
  )

  const handleChangeTable = useCallback<NomenclatureTableProps['onChange']>(
    (pagination) => {
      handleTablePagination(pagination)
    },
    [handleTablePagination],
  )

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
            allowClear
            disabled={
              nomenclatureListIsFetching || nomenclatureGroupListIsFetching
            }
            onSearch={handleChangeSearch}
          />

          <MatchUserPermissions expected={['NOMENCLATURE_GROUPS_CREATE']}>
            {({ permissions }) =>
              permissions.nomenclatureGroupsCreate ? (
                <Button onClick={debouncedToggleAddNomenclatureGroupModal}>
                  + Добавить группу
                </Button>
              ) : null
            }
          </MatchUserPermissions>

          <MatchUserPermissions expected={['NOMENCLATURES_CREATE']}>
            {({ permissions }) =>
              permissions.nomenclaturesCreate ? (
                <Button onClick={debouncedToggleAddNomenclatureModal}>
                  + Добавить номенклатуру
                </Button>
              ) : null
            }
          </MatchUserPermissions>
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
              onClickName={debouncedHandleOpenEditNomenclatureModal}
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

      {editNomenclatureGroupModalOpened && !!editableGroup && (
        <AddOrEditNomenclatureGroupModal
          visible={editNomenclatureGroupModalOpened}
          title='Редактирование номенклатурной группы'
          okText='Сохранить'
          initialValues={{ title: editableGroup.title }}
          isLoading={updateNomenclatureGroupIsLoading}
          onCancel={debouncedToggleEditNomenclatureGroupModal}
          onSubmit={handleUpdateNomenclatureGroup}
        />
      )}

      {addNomenclatureModalOpened && (
        <AddOrEditNomenclatureModal
          visible={addNomenclatureModalOpened}
          title='Добавление номенклатурной позиции'
          okText='Добавить'
          isLoading={createNomenclatureIsLoading}
          groups={allNomenclatureGroupList}
          groupsIsLoading={allNomenclatureGroupListIsFetching}
          countries={countryList}
          countriesIsLoading={countryListIsFetching}
          measurementUnits={measurementUnitList}
          measurementUnitsIsLoading={measurementUnitListIsFetching}
          onCancel={debouncedToggleAddNomenclatureModal}
          onSubmit={handleCreateNomenclature}
        />
      )}

      {editNomenclatureModalOpened && !!editableNomenclatureId && (
        <AddOrEditNomenclatureModal
          visible={editNomenclatureModalOpened}
          title='Редактирование номенклатурной позиции'
          okText='Сохранить'
          isLoading={updateNomenclatureIsLoading}
          permissions={updateNomenclaturePerms}
          nomenclature={nomenclature}
          nomenclatureIsLoading={nomenclatureIsFetching}
          groups={allNomenclatureGroupList}
          groupsIsLoading={allNomenclatureGroupListIsFetching}
          countries={countryList}
          countriesIsLoading={countryListIsFetching}
          measurementUnits={measurementUnitList}
          measurementUnitsIsLoading={measurementUnitListIsFetching}
          onCancel={debouncedHandleCloseEditNomenclatureModal}
          onSubmit={handleUpdateNomenclature}
        />
      )}
    </>
  )
}

export default NomenclatureListPage
