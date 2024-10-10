export enum InfrastructuresApiEnum {
  GetInfrastructure = '/infrastructures/:id',
  UpdateInfrastructure = '/infrastructures/:id',
  GetInfrastructureOrdersForms = '/infrastructures/orders/',
  CreateInfrastructureOrderForm = '/infrastructures/orders/',
  CreateInfrastructureOrdersFormAttachment = '/infrastructures/orders/attachments/',
  GetInfrastructureOrderFormWorkTypeCost = '/infrastructures/orders/works/types/cost/',
  CreateInfrastructureOrderFormWorks = '/infrastructures/orders/works/',
  DeleteInfrastructureOrdersFormsWork = '/infrastructures/orders/works/:id',
}

export enum InfrastructuresApiTagEnum {
  Infrastructure = 'Infrastructure',
  InfrastructureOrdersForms = 'InfrastructureOrdersForms',
}
