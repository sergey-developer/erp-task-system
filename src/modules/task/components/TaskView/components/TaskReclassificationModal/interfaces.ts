import { FieldsErrors } from 'shared/services/api'

type FormFields = { reclassificationReason: number; comment: string }

export type TaskReclassificationFormFields = Required<FormFields>

export type TaskReclassificationFormErrors = FieldsErrors<FormFields>
