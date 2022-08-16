class Janus {

	constructor (props) {
		this.client = props.client
	}

	evaluateStatus (userId, feature) {
		if ((userId % feature.modulus) == feature.modulusOffset)
			return true
		else if (feature?.userIds?.includes(userId))
			return true
		else
			return false
	}

	async checkFeature (name, userId) {
		let feature = await this.client.hGet('JanusFeatureList', name)
		feature = parseJSON(feature)

		return evaluateStatus(userId, feature)
	
	}

	async getAllFeatures (userId) {
		let features = await this.client.hGetAll('JanusFeatureList')
		Object.keys(features).forEach(f => features[f] = this.evaluateStatus(userId, parseJSON(features[f])))
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