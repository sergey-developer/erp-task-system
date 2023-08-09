export type CreateNomenclatureGroupMutationArgs = {
  title: string
}

// todo: use list item model when it will be ready
export type CreateNomenclatureGroupSuccessResponse = {
  id: number
  title: string
}

export type CreateNomenclatureGroupBadRequestErrorResponse =
  Partial<CreateNomenclatureGroupMutationArgs>
