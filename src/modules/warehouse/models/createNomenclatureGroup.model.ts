export type CreateNomenclatureGroupMutationArgs = {
  title: string
}

export type CreateNomenclatureGroupSuccessResponse = {
  id: number
  title: string
}

export type CreateNomenclatureGroupBadRequestErrorResponse =
  Partial<CreateNomenclatureGroupMutationArgs>
