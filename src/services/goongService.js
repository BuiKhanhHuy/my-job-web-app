import httpRequest from '../utils/httpRequest';
import { AUTH_CONFIG } from '../configs/constants';

const goongService = {
  getPlaces: (input) => {
    const url = `https://rsapi.goong.io/Place/AutoComplete?api_key=${AUTH_CONFIG.GOONGAPI_KEY}&input=${input}&limit=15`;

    return httpRequest.get(url);
  },
  getPlaceDetailByPlaceId: (id) => {
    const url = `https://rsapi.goong.io/Place/Detail?place_id=${id}&api_key=${AUTH_CONFIG.GOONGAPI_KEY}`;

    return httpRequest.get(url);
  },
};

export default goongService;
