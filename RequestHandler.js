var axios = require('axios')

var root = "https://bizhacks.bbycastatic.ca/mobile-si/si/v3/products/search?query=laptop"

export default class RequestHandler
{
	static getProduct()
	{
	    return new Promise(function(fulfill, reject){
			var res = ''
			axios.get(root).then(function(response){
 				res = (response.request.response);
 				fulfill(res);
			}).catch(function(e){
 				console.log(e);
			})
	    });
  }

	static sendGeoLoc(macId, lat, long, alt, time)
	{
			return new Promise(function(fulfill, reject){
			var res = ''
			axios.post(root+'/record-activity',{
				'mac': macId,
				'point': {
					'lat': lat,
					'long': long,
					'alt': alt
				},
				'date-time': time
			}).then(function(response){
				res = (response.request.response);
				fulfill(res);
			}).catch(function(e){
				console.log(e);
				reject(e);
			})
			});
  }
}
