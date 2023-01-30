import BaseRequest from ".";
import { API_ROUTES } from "./routes";
/*=============================================
=         API HTTP Methods and routes          =
=============================================*/

/**
 *
 * Here, we can now extend and bind the APU configuration we had created with the routes
 *
 */

class RequestService extends BaseRequest {
  getAllPorts = async () => {
    return await this.api.get(API_ROUTES.PORTS);
  };
  getMarketRates = async (query: { origin: string; destination: string }) => {
    return await this.api.get(
      `${API_ROUTES.PORTS}?origin=${query.origin}&destination${query.destination}`
    );
  };
}

const requestService = new RequestService();
export default requestService;
