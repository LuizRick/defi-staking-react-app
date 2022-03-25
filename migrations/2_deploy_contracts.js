const r = require('./deploy_contracts');
module.exports = r.default.call(this, artifacts, web3);