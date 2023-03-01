export enum HttpMethodEnum {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export enum HttpCodeEnum {
  // 2**
  Ok = 200,
  Created = 201,

  // 4**
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ClientClosedRequest = 499,

  // 5**
  ServerError = 500,
  InvalidSSLCertificate = 526,
}
