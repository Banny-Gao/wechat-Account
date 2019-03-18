const promiseWraper = (res) => {
  return new Promise(resolve => {
    resolve(res)
  })
}


module.exports = {
  promiseWraper
}