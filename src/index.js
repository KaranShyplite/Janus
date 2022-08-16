class Janus {

	constructor (props) {
		this.client = props.client
	}

	evaluateStatus (userIds, feature) {
		if ((userIds % feature.modulus) == feature.modulusOffset)
			return true
		else if (feature?.userIdss?.includes(userIds))
			return true
		else
			return false
	}

	async checkFeature (name, userIds) {
		let feature = await this.client.hGet('JanusFeatureList', name)
		feature = parseJSON(feature)

		return evaluateStatus(userIds, feature)
	
	}

	async getAllFeatures (userIds) {
		let features = await this.client.hGetAll('JanusFeatureList')
		Object.keys(features).forEach(f => features[f] = this.evaluateStatus(userIds, parseJSON(features[f])))
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