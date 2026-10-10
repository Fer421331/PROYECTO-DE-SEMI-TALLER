export type ErrorResponseType = {
  error: {
    code: number;
    data?: any;
    message: { value: string };
  };
};

export type SuccessResponseType = {
  success: {
    code: number;
    message: { value: string };
    data: any;
  };
};
