import axios, { AxiosInstance } from "axios";
/*=============================================
=           Axios or API configuration           =
=============================================*/
/**
 *
 * For scalibility and maintainabiity, all the axios configurations can be done here and reusable across the
 *
 */

class BaseRequest {
  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        "X-Api-Key": process.env.REACT_APP_API_KEY,
      },
    });
  }
}
export default BaseRequest;
