import Axios from 'axios';
var config = require('../config')

class apiAxios {
	post(url, params) {
		const host = typeof window === 'undefined' && url.indexOf("/api/") > -1 ? config.server : "";
		return Axios.post(host + url, params);
	}
}    

export default new apiAxios();