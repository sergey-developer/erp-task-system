export enum HttpMethodEnum {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export enum HttpStatusCodeEnum {
  // 2**
  Ok = 200,
  Created = 201,
  // 4**
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  // 5**
  ServerError = 500,
}
