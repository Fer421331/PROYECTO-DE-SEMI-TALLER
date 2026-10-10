import { ErrorResponseType, SuccessResponseType } from "../types/responses.type.js";


let defResponse: ErrorResponseType | SuccessResponseType;
defResponse = {
  error: {
    code: -2,
    data: {},
    message: { value: "Sesión no válida" },
  },
};

const unauthorizedResp: ErrorResponseType = {
  error: {
    code: 401,
    data: {},
    message: { value: "No autorizado" },
  },
};

const successResponse = (data: any, message: string) => {
  return {
    success: {
      code: 1,
      data: data,
      message: { value: message },
    },
  };
};

const errorResponse = (message: string) => {
  return {
    error: {
      code: -1,
      data: {},
      message: { value: message },
    },
  };
};

export default defResponse;
export { successResponse, errorResponse, unauthorizedResp };
