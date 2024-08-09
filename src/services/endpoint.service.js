import http from "@/assets/httpConfig";

const API_ENDPOINT_LIST_URL = "/api/config";

class EndPoinService {
  async getEndpointList() {
    const res = await http.get(API_ENDPOINT_LIST_URL);
    return res.data;
  }

  async getEndpointDetails(id) {
    const res = await http.get(API_ENDPOINT_LIST_URL + "/" + id);
    return res.data;
  }
}

export default new EndPoinService();
