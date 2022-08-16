# Janus

## Installation

1. Setup `.npmrc` in the repo
1. Install with npm
	```
	npm i @shyplite/janus
	```

## Usage

### Setup 
```
const Janus = require('@shyplite/janus')

let featureToggle = new Janus({
    client
})
```

### ExpressJS Middleware
```
const checkFeatureEnabled = async (req, res, next) => { 
  try {
    if (await featureToggle.checkFeature('FEATURE_NAME',req.headers['userId'])) 
      next() 
    else 
      res.status(400).send({ message:'FEATURE_NAME is not enabled', success:false }) 
  }
  catch (err) {
    next(err)
  }
}

router.get("/some/feature/route", checkFeatureEnabled, async (req, res, next) => {
```