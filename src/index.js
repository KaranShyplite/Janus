class Janus {

	constructor (props) {
		this.client = props.client
	}

	evaluateStatus (sellerID, feature) {
		if ((sellerID % feature.modulus) == feature.modulusOffset)
			return true
		else if (feature?.sellerIDs?.includes(sellerID))
			return true
		else
			return false
	}

	async checkFeature (name, sellerID) {
		let feature = await this.client.hGet('JanusFeatureList', name)
		feature = parseJSON(feature)

		return evaluateStatus(sellerID, feature)
	
	}

	async getAllFeatures (sellerID) {
		let features = await this.client.hGetAll('JanusFeatureList')
		Object.keys(features).forEach(f => features[f] = this.evaluateStatus(sellerID, parseJSON(features[f])))
		return features	
	
	}

	async listAllFeatures () {
		let features = await this.client.hGetAll('JanusFeatureList')
		Object.keys(features).forEach(f => features[f] = parseJSON(features[f]))
		return features	
	}

}

const parseJSON = (str) => {
	try {
		return JSON.parse(str)
	}
	catch (err) {
		console.error('Error Parsing Janus Config', err, str)
		return {}
	}
}

module.exports = Janus