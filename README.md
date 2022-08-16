# Janus

Library that allows your system to be two-faced, allowing some users a feature, and restricting the others.  
This library is used to maintain and provide access to predefined features only to a certain subset of your users on the basis of:
1. Specific Unique user IDs
1. Certain percentage of users in the system

## Installation

1. Setup `.npmrc` in the repo
1. Install with npm
	```bash
	npm i @shyplite/janus
	```

## Usage

### Setup 
```js
const Janus = require('@shyplite/janus')

let featureToggle = new Janus({
    client
})
```

### ExpressJS Middleware
```js
const checkFeatureEnabled = async (req, res, next) => { 
  try {
    if (await featureToggle.checkFeature('FEATURE_NAME', req.headers['userId'])) 
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