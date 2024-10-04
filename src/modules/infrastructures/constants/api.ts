export enum InfrastructuresApiEnum {
  GetInfrastructure = '/infrastructures/:id',
  UpdateInfrastructure = '/infrastructures/:id',

  GetInfrastructureOrdersForms = '/infrastructures/orders/',

  GetInfrastructureStatusHistory = '/infrastructures/statuses/',
  UpdateInfrastructureStatus = '/infrastructures/statuses/',
  CreateInfrastructureOrdersFormAttachment = '/infrastructures/orders/attachments/',
}

export enum InfrastructuresApiTagEnum {
  Infrastructure = 'Infrastructure',
}
