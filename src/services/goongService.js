import httpRequest from '../utils/httpRequest';

const goongService = {
  getPlaces: (input) => {
    const url = `https://rsapi.goong.io/Place/AutoComplete?api_key=UMRiT4CiOH9UU9Ju9L1YJLSYZM5EQberRoSsyfDW&input=${input}`;

    return httpRequest.get(url);
  },
  getPlaceDetailByPlaceId: (id) => {
    const url = `https://rsapi.goong.io/Place/Detail?place_id=${id}&api_key=UMRiT4CiOH9UU9Ju9L1YJLSYZM5EQberRoSsyfDW`;

    return httpRequest.get(url);
  },
};

export default goongService;
