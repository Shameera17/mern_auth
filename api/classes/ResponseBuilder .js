class ResponseBuilder {
  constructor() {}

  data({ data, message = "Operation successful" }) {
    return {
      success: true,
      message,
      data,
    };
  }

  message({ message = "Operation successful" }) {
    return {
      success: true,
      status: "success",
      message,
    };
  }
}
export default ResponseBuilder;
