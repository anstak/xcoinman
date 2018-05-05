import Axios from 'axios';
var config = require('../config')

class apiAxios {

	post(url, params) {
		const host = typeof window === 'undefined' && url.indexOf("/api/") > -1 ? config.server : "";
		return Axios.post(host + url, params);
	}

	get(url) {
		const host = typeof window === 'undefined' && url.indexOf("/json_static/") > -1 ? config.wordpress : "";
		return Axios.get(host + url);
	}
}    

export default new apiAxios();