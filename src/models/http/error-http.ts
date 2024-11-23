export class ErrorHttp {
    code: number;
    message: string;
    data: any | null;

    constructor(vCode: number, vMessage: string, vData: any | null) {
      this.code = vCode;
      this.message = vMessage;
      this.data = vData;
    }
  }

  export enum HTTP_STATUS_CODE {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
  }
  