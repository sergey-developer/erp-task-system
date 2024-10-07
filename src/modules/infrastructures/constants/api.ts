export enum InfrastructuresApiEnum {
  GetInfrastructure = '/infrastructures/:id',
  UpdateInfrastructure = '/infrastructures/:id',

  GetInfrastructureOrdersForms = '/infrastructures/orders/',
  CreateInfrastructureOrderForm = '/infrastructures/orders/',
  GetInfrastructureOrderFormWorkTypeCost = '/infrastructures/orders/works/types/cost/',
  CreateInfrastructureOrderFormWorks = '/infrastructures/orders/works/',
  DeleteInfrastructureOrdersFormsWork = '/infrastructures/orders/works/:id',

  GetInfrastructureStatusHistory = '/infrastructures/statuses/',
  UpdateInfrastructureStatus = '/infrastructures/statuses/',
  CreateInfrastructureOrdersFormAttachment = '/infrastructures/orders/attachments/',
}

export enum InfrastructuresApiTagEnum {
  Infrastructure = 'Infrastructure',
  InfrastructureOrdersForms = 'InfrastructureOrdersForms',
}
