export class ResponseBodyVO<DataType> {
  code: number;
  message: string;
  data: DataType;
}

export class ResponseVO {
  statusCode: number;
  body: string;
}
