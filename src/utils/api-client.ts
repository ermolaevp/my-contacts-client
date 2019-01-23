import SwaggerClient, { http } from 'swagger-client'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import { camelize } from 'humps'

class ApiClient {
  public spec: object
  public token?: string
  constructor(spec: object, token?: string) {
    this.spec = spec
    this.token = token
  }
  public execute({
    operationId,
    pathName,
    method,
    parameters,
    requestContentType = 'application/json',
    responseContentType = 'application/json',
    ...extras
  }: {
    operationId?: string
    pathName: string
    method: string
    parameters: object
    requestContentType: string
    responseContentType: string
  }) {
    if (pathName && method && !operationId) {
      operationId = `${method.toLowerCase()}-${pathName}`
    }

    const securities = { authorized: {} }
    if (this.token) {
      securities.authorized = {
        Authorization: `Bearer ${this.token}`,
      }
    }

    const responseInterceptor = (res: any) => {
      const meta: any = {}
      const metaHeaders =
        'x-current-page x-per-page x-runtime x-runtime x-total-count x-total-pages'
      metaHeaders.split(' ').forEach(header => {
        const val = res.headers[header]
        if (val) {
          const match = /x-([a-z\-]+)/.exec(header)
          if (match && match[1]) {
            const metaIndex = camelize(match[1])
            meta[metaIndex] = +val
          }
        }
      })
      const { authorization } = res.headers
      if (authorization) {
        const match = /^Bearer (.*?)$/.exec(authorization)
        if (match && match[1]) {
          res.authToken = match[1]
        }
      }
      res.meta = meta
      return res
    }

    const requestInterceptor = (req: any) => {
      return req
    }

    const requestParams: any = {
      spec: this.spec,
      operationId,
      parameters,
      securities,
      requestContentType,
      responseContentType,
      responseInterceptor,
      requestInterceptor,
      http,
      ...extras,
    }

    if (process.env.NODE_ENV === 'development') {
      requestParams.scheme = 'http'
    }

    const request = SwaggerClient.buildRequest(requestParams)

    if (
      request.body &&
      (isPlainObject(request.body) || isArray(request.body))
    ) {
      request.body = JSON.stringify(request.body)
    }

    // Build request and execute it
    return http(request)
  }
}

export default ApiClient
