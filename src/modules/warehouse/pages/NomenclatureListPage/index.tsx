import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Input, MenuProps, Row } from 'antd'
import { SearchProps } from 'antd/lib/input/Search'
import sortBy from 'lodash/sortBy'
import React, { FC, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { UserPermissionsEnum } from 'modules/user/constants/enums'
import { useMatchUserPermissions } from 'modules/user/hooks'
import { NomenclatureFormModalProps } from 'modules/warehouse/components/NomenclatureFormModal/types'
import { NomenclatureGroupFormModalProps } from 'modules/warehouse/components/NomenclatureGroupFormModal/types'
import NomenclatureTable from 'modules/warehouse/components/NomenclatureTable'
import { NomenclatureTableProps } from 'modules/warehouse/components/NomenclatureTable/types'
import {
  createNomenclatureMessages,
  updateNomenclatureMessages,
} from 'modules/warehouse/constants/nomenclature'
import {
  createNomenclatureGroupMessages,
  updateNomenclatureGroupMessages,
} from 'modules/warehouse/constants/nomenclatureGroup'
import { useGetMeasurementUnitList } from 'modules/warehouse/hooks/measurementUnit'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useGetNomenclatureGroupList } from 'modules/warehouse/hooks/nomenclatureGroup'
import {
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureListQueryArgs,
  NomenclatureGroupListItemModel,
} from 'modules/warehouse/models'
import {
  useCreateNomenclatureMutation,
  useUpdateNomenclatureMutation,
} from 'modules/warehouse/services/nomenclatureApi.service'
import {
  useCreateNomenclatureGroupMutation,
  useUpdateNomenclatureGroupMutation,
} from 'modules/warehouse/services/nomenclatureGroupApi.service'

import { EditIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { SAVE_TEXT } from 'shared/constants/common'
import { useGetCountryList } from 'shared/hooks/country'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { GroupListMenuStyled } from './styles'

const NomenclatureGroupFormModal = React.lazy(
  () => import('modules/warehouse/components/NomenclatureGroupFormModal'),
)

const NomenclatureFormModal = React.lazy(
  () => import('modules/warehouse/components/NomenclatureFormModal'),
)

const { Search } = Input
const nomenclaturesInitialPaginationParams = getInitialPaginationParams()

const NomenclatureListPage: FC = () => {
  const permissions = useMatchUserPermissions([
    UserPermissionsEnum.NomenclaturesCreate,
    UserPermissionsEnum.NomenclaturesUpdate,
    UserPermissionsEnum.NomenclatureGroupsCreate,
    UserPermissionsEnum.NomenclatureGroupsUpdate,
  ])

  const [getNomenclatureGroupListParams, setGetNomenclatureGroupListParams] = useSetState<
    NonNullable<GetNomenclatureGroupListQueryArgs>
  >({})

  const [nomenclatureListParams, setNomenclatureListParams] = useSetState<
    NonNullable<GetNomenclatureListQueryArgs>
  >(nomenclaturesInitialPaginationParams)

  const [hoveredGroupId, setHoveredGroupId] = useState<number>()
  const [editableGroup, setEditableGroup] = useState<NomenclatureGroupListItemModel>()

  const [editableNomenclatureId, setEditableNomenclatureId] = useState<number>()

  const [createNomenclatureGroupModalOpened, { toggle: toggleCreateNomenclatureGroupModal }] =
    useBoolean(false)

  const debouncedToggleCreateNomenclatureGroupModal = useDebounceFn(
    toggleCreateNomenclatureGroupModal,
  )

  const [editNomenclatureGroupModalOpened, { toggle: toggleEditNomenclatureGroupModal }] =
    useBoolean(false)

  const debouncedToggleEditNomenclatureGroupModal = useDebounceFn(toggleEditNomenclatureGroupModal)

  const [createNomenclatureModalOpened, { toggle: toggleCreateNomenclatureModal }] =
    useBoolean(false)

  const debouncedToggleCreateNomenclatureModal = useDebounceFn(toggleCreateNomenclatureModal)

  const [editNomenclatureModalOpened, { toggle: toggleEditNomenclatureModal }] = useBoolean(false)

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

  const debouncedHandleCloseEditNomenclatureModal = useDebounceFn(handleCloseEditNomenclatureModal)

  const [createNomenclatureGroupMutation, { isLoading: createNomenclatureGroupIsLoading }] =
    useCreateNomenclatureGroupMutation()

  const [updateNomenclatureGroupMutation, { isLoading: updateNomenclatureGroupIsLoading }] =
    useUpdateNomenclatureGroupMutation()

  const { currentData: nomenclatureGroupList = [], isFetching: nomenclatureGroupListIsFetching } =
    useGetNomenclatureGroupList(getNomenclatureGroupListParams)

  const {
    currentData: allNomenclatureGroupList = [],
    isFetching: allNomenclatureGroupListIsFetching,
  } = useGetNomenclatureGroupList(undefined, {
    skip: !createNomenclatureModalOpened && !editNomenclatureModalOpened,
  })

  const [createNomenclatureMutation, { isLoading: createNomenclatureIsLoading }] =
    useCreateNomenclatureMutation()

  const [updateNomenclatureMutation, { isLoading: updateNomenclatureIsLoading }] =
    useUpdateNomenclatureMutation()

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

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(nomenclatureListParams)

  const { currentData: measurementUnitList = [], isFetching: measurementUnitListIsFetching } =
    useGetMeasurementUnitList(undefined, {
      skip: !createNomenclatureModalOpened && !editNomenclatureModalOpened,
    })

  const { currentData: countryList = [], isFetching: countryListIsFetching } = useGetCountryList(
    undefined,
    { skip: !createNomenclatureModalOpened && !editNomenclatureModalOpened },
  )

  const groupListMenuItems: MenuProps['items'] = useMemo(() => {
    const handleClickEdit = (group: NomenclatureGroupListItemModel) => (event: MouseEvent) => {
      event.stopPropagation()
      setEditableGroup(group)
      debouncedToggleEditNomenclatureGroupModal()
    }

    return sortBy(
      nomenclatureGroupList.map((group) => {
        const { id, title } = group

        return {
          key: id,
          label: title,
          title,
          itemIcon: id === hoveredGroupId && permissions.nomenclatureGroupsUpdate && (
            <EditIcon title='Редактировать группу' onClick={handleClickEdit(group)} />
          ),
          onMouseEnter: () => setHoveredGroupId(id),
          onMouseLeave: () => setHoveredGroupId(undefined),
        }
      }),
      'label',
    )
  }, [
    debouncedToggleEditNomenclatureGroupModal,
    hoveredGroupId,
    nomenclatureGroupList,
    permissions.nomenclatureGroupsUpdate,
  ])

  const handleClickGroup: MenuProps['onClick'] = (data) => {
    setNomenclatureListParams({
      group: Number(data.key),
      offset: nomenclaturesInitialPaginationParams.offset,
    })
  }

  const handleCreateNomenclatureGroup = useCallback<NomenclatureGroupFormModalProps['onSubmit']>(
    async (values, setFields) => {
      try {
        await createNomenclatureGroupMutation({
          ...values,
          getListParams: getNomenclatureGroupListParams,
        }).unwrap()

        toggleCreateNomenclatureGroupModal()
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
      toggleCreateNomenclatureGroupModal,
    ],
  )

  const handleUpdateNomenclatureGroup: NomenclatureGroupFormModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
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

  const handleCreateNomenclature = useCallback<NomenclatureFormModalProps['onSubmit']>(
    async (values, setFields) => {
      try {
        await createNomenclatureMutation(values).unwrap()
        toggleCreateNomenclatureModal()
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
    [createNomenclatureMutation, toggleCreateNomenclatureModal],
  )

  const handleUpdateNomenclature: NomenclatureFormModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
    if (!editableNomenclatureId) return

    try {
      await updateNomenclatureMutation({
        ...values,
        id: editableNomenclatureId,
        getListParams: nomenclatureListParams,
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
    setNomenclatureListParams({
      search: searchValue,
      group: undefined,
      offset: nomenclaturesInitialPaginationParams.offset,
    })
  }

  const handleTablePagination = useCallback(
    (pagination: Parameters<NomenclatureTableProps['onChange']>[0]) => {
      setNomenclatureListParams(calculatePaginationParams(pagination))
    },
    [setNomenclatureListParams],
  )

  const handleChangeTable = useCallback<NomenclatureTableProps['onChange']>(
    (pagination) => {
      handleTablePagination(pagination)
    },
    [handleTablePagination],
  )

  const onClickAllNomenclature = () =>
    setNomenclatureListParams({
      group: undefined,
      offset: nomenclaturesInitialPaginationParams.offset,
    })

  return (
    <>
      <Space data-testid='nomenclature-list-page' $block direction='vertical' size='middle'>
        <Space size='middle'>
          <Search
            placeholder='Поиск номенклатуры'
            allowClear
            disabled={nomenclatureListIsFetching || nomenclatureGroupListIsFetching}
            onSearch={handleChangeSearch}
          />

          {permissions.nomenclatureGroupsCreate && (
            <Button onClick={debouncedToggleCreateNomenclatureGroupModal}>Добавить группу</Button>
          )}

          {permissions.nomenclaturesCreate && (
            <Button onClick={debouncedToggleCreateNomenclatureModal}>Добавить номенклатуру</Button>
          )}
        </Space>

        <Row gutter={16}>
          <Col span={5}>
            <LoadingArea
              data-testid='group-list-loading'
              isLoading={nomenclatureGroupListIsFetching}
              area='parent'
              tip='Загрузка групп...'
            >
              <Space $block direction='vertical'>
                <Button
                  block
                  onClick={onClickAllNomenclature}
                  disabled={nomenclatureListIsFetching}
                >
                  Вся номенклатура
                </Button>

                <GroupListMenuStyled
                  data-testid='group-list'
                  mode='inline'
                  items={groupListMenuItems}
                  selectedKeys={
                    nomenclatureListParams.group
                      ? [String(nomenclatureListParams.group)]
                      : undefined
                  }
                  onClick={handleClickGroup}
                />
              </Space>
            </LoadingArea>
          </Col>

          <Col span={19}>
            <NomenclatureTable
              dataSource={extractPaginationResults(nomenclatureList)}
              pagination={extractPaginationParams(nomenclatureList)}
              loading={nomenclatureListIsFetching}
              onChange={handleChangeTable}
              onClickName={debouncedHandleOpenEditNomenclatureModal}
            />
          </Col>
        </Row>
      </Space>

      {createNomenclatureGroupModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={debouncedToggleCreateNomenclatureGroupModal}
              tip='Загрузка модалки добавления номенклатурной группы...'
            />
          }
        >
          <NomenclatureGroupFormModal
            open={createNomenclatureGroupModalOpened}
            title='Добавление номенклатурной группы'
            okText='Добавить'
            isLoading={createNomenclatureGroupIsLoading}
            onCancel={debouncedToggleCreateNomenclatureGroupModal}
            onSubmit={handleCreateNomenclatureGroup}
          />
        </React.Suspense>
      )}

      {editNomenclatureGroupModalOpened && !!editableGroup && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={debouncedToggleEditNomenclatureGroupModal}
              tip='Загрузка модалки редактирования номенклатурной группы...'
            />
          }
        >
          <NomenclatureGroupFormModal
            open={editNomenclatureGroupModalOpened}
            title='Редактирование номенклатурной группы'
            okText={SAVE_TEXT}
            initialValues={{ title: editableGroup.title }}
            isLoading={updateNomenclatureGroupIsLoading}
            onCancel={debouncedToggleEditNomenclatureGroupModal}
            onSubmit={handleUpdateNomenclatureGroup}
          />
        </React.Suspense>
      )}

      {createNomenclatureModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={debouncedToggleCreateNomenclatureModal}
              tip='Загрузка модалки добавления номенклатурной позиции...'
            />
          }
        >
          <NomenclatureFormModal
            open={createNomenclatureModalOpened}
            title='Добавление номенклатурной позиции'
            okText='Добавить'
            isLoading={createNomenclatureIsLoading}
            groups={allNomenclatureGroupList}
            groupsIsLoading={allNomenclatureGroupListIsFetching}
            countries={countryList}
            countriesIsLoading={countryListIsFetching}
            measurementUnits={measurementUnitList}
            measurementUnitsIsLoading={measurementUnitListIsFetching}
            onCancel={debouncedToggleCreateNomenclatureModal}
            onSubmit={handleCreateNomenclature}
          />
        </React.Suspense>
      )}

      {editNomenclatureModalOpened && !!editableNomenclatureId && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={debouncedHandleCloseEditNomenclatureModal}
              tip='Загрузка модалки редактирования номенклатурной позиции...'
            />
          }
        >
          <NomenclatureFormModal
            open={editNomenclatureModalOpened}
            title='Редактирование номенклатурной позиции'
            okText={SAVE_TEXT}
            isLoading={updateNomenclatureIsLoading}
            submitBtnDisabled={!permissions.nomenclaturesUpdate}
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
        </React.Suspense>
      )}
    </>
  )
}

export default NomenclatureListPage
