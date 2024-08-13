import http from "@/assets/httpConfig";

const API_ENDPOINT_LIST_URL = "/api/config";
const API_ENDPOINT_RES_URL = "/api/config/response";

class EndPoinService {
  async getEndpointList() {
    const res = await http.get(API_ENDPOINT_LIST_URL);
    return res.data;
  }

  async getEndpointDetails(id) {
    const res = await http.get(API_ENDPOINT_LIST_URL + "/" + id);
    return res.data;
  }

  async updateResStatus(req) {
    const res = await http.put(API_ENDPOINT_RES_URL, req);
    return res.data;
  }

  async addNewRes(req) {
    const res = await http.post(API_ENDPOINT_RES_URL, req);
    return res.data;
  }

  async removeRes(req) {
    const res = await http.delete(API_ENDPOINT_RES_URL, { data: req });
    return res.data;
  }

  async saveNewEndPiont(req) {
    const res = await http.post(API_ENDPOINT_LIST_URL, req);
    return res.data;
  }
}

export default new EndPoinService();
