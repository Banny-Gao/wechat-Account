const {
  get
} = require('../util/request'),
  util = require('util'), {
    apiDomain,
    apiURL
  } = require('../config.basic')

getTicket = (access_token) => {
  const url = util.format(apiURL.ticketApi, apiDomain, access_token)
  return new Promise(resolve => {
    get(url).then(response => {
      const data = JSON.paerse(response)
      resolve(data)
    })
  })
}

module.exports = getTicket