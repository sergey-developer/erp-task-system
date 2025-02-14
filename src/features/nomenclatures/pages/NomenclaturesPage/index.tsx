import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Input, MenuProps, Row } from 'antd'
import { SearchProps } from 'antd/lib/input/Search'
import {
  createNomenclatureErrorMessage,
  createNomenclatureGroupErrorMessage,
  updateNomenclatureErrorMessage,
  updateNomenclatureGroupErrorMessage,
} from 'features/nomenclatures/api/constants'
import {
  useCreateNomenclatureMutation,
  useUpdateNomenclatureMutation,
} from 'features/nomenclatures/api/endpoints/nomenclatures.endpoints'
import {
  useCreateNomenclatureGroupMutation,
  useUpdateNomenclatureGroupMutation,
} from 'features/nomenclatures/api/endpoints/nomenclaturesGroups.endpoints'
import { NomenclatureFormModalProps } from 'features/nomenclatures/components/NomenclatureFormModal/types'
import { NomenclatureGroupFormModalProps } from 'features/nomenclatures/components/NomenclatureGroupFormModal/types'
import NomenclatureTable from 'features/nomenclatures/components/NomenclatureTable'
import { NomenclatureTableProps } from 'features/nomenclatures/components/NomenclatureTable/types'
import {
  useGetNomenclature,
  useGetNomenclatures,
  useGetNomenclaturesGroups,
} from 'features/nomenclatures/hooks'
import { UserPermissionsEnum } from 'features/users/api/constants/enums'
import { useUserPermissions } from 'features/users/hooks'
import sortBy from 'lodash/sortBy'
import React, { FC, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { EditIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { useGetCountriesCatalog } from 'shared/catalogs/countries/hooks'
import { useGetMeasurementUnitsCatalog } from 'shared/catalogs/measurementUnits/hooks'
import { SAVE_TEXT } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { NomenclaturesGroupDTO } from '../../api/dto'
import { GetNomenclaturesGroupsRequest, GetNomenclaturesRequest } from '../../api/schemas'
import { GroupListMenuStyled } from './styles'

const NomenclatureGroupFormModal = React.lazy(
  () => import('features/nomenclatures/components/NomenclatureGroupFormModal'),
)

const NomenclatureFormModal = React.lazy(
  () => import('features/nomenclatures/components/NomenclatureFormModal'),
)

const { Search } = Input
const nomenclaturesInitialPaginationParams = getInitialPaginationParams()

const NomenclaturesPage: FC = () => {
  const permissions = useUserPermissions([
    UserPermissionsEnum.NomenclaturesCreate,
    UserPermissionsEnum.NomenclaturesUpdate,
    UserPermissionsEnum.NomenclatureGroupsCreate,
    UserPermissionsEnum.NomenclatureGroupsUpdate,
  ])

  const [getNomenclaturesGroupsRequestArgs, setGetNomenclaturesGroupsParams] = useSetState<
    NonNullable<GetNomenclaturesGroupsRequest>
  >({})

  const [nomenclatureListParams, setNomenclatureListParams] = useSetState<
    NonNullable<GetNomenclaturesRequest>
  >(nomenclaturesInitialPaginationParams)

  const [hoveredGroupId, setHoveredGroupId] = useState<number>()
  const [editableGroup, setEditableGroup] = useState<NomenclaturesGroupDTO>()

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

  const { currentData: nomenclaturesGroups = [], isFetching: nomenclaturesGroupsIsFetching } =
    useGetNomenclaturesGroups(getNomenclaturesGroupsRequestArgs)

  const {
    currentData: allNomenclatureGroupList = [],
    isFetching: allNomenclatureGroupListIsFetching,
  } = useGetNomenclaturesGroups(undefined, {
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

  const { currentData: nomenclatures, isFetching: nomenclaturesIsFetching } =
    useGetNomenclatures(nomenclatureListParams)

  const { currentData: measurementUnitList = [], isFetching: measurementUnitListIsFetching } =
    useGetMeasurementUnitsCatalog(undefined, {
      skip: !createNomenclatureModalOpened && !editNomenclatureModalOpened,
    })

  const { currentData: countryList = [], isFetching: countryListIsFetching } =
    useGetCountriesCatalog(undefined, {
      skip: !createNomenclatureModalOpened && !editNomenclatureModalOpened,
    })

  const groupListMenuItems: MenuProps['items'] = useMemo(() => {
    const handleClickEdit = (group: NomenclaturesGroupDTO) => (event: MouseEvent) => {
      event.stopPropagation()
      setEditableGroup(group)
      debouncedToggleEditNomenclatureGroupModal()
    }

    return sortBy(
      nomenclaturesGroups.map((group) => {
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
    nomenclaturesGroups,
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
          getListParams: getNomenclaturesGroupsRequestArgs,
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
            showErrorNotification(createNomenclatureGroupErrorMessage)
          }
        }
      }
    },
    [
      createNomenclatureGroupMutation,
      getNomenclaturesGroupsRequestArgs,
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
        getListParams: getNomenclaturesGroupsRequestArgs,
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
          showErrorNotification(updateNomenclatureGroupErrorMessage)
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
            showErrorNotification(createNomenclatureErrorMessage)
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
          showErrorNotification(updateNomenclatureErrorMessage)
        }
      }
    }
  }

  const handleChangeSearch: SearchProps['onSearch'] = (value) => {
    const searchValue = value || undefined
    setGetNomenclaturesGroupsParams({ search: searchValue })
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
            disabled={nomenclaturesIsFetching || nomenclaturesGroupsIsFetching}
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
              isLoading={nomenclaturesGroupsIsFetching}
              area='parent'
              tip='Загрузка групп...'
            >
              <Space $block direction='vertical'>
                <Button block onClick={onClickAllNomenclature} disabled={nomenclaturesIsFetching}>
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
              dataSource={extractPaginationResults(nomenclatures)}
              pagination={extractPaginationParams(nomenclatures)}
              loading={nomenclaturesIsFetching}
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

export default NomenclaturesPage
