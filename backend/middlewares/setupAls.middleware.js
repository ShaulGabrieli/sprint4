const authService = require('../api/auth/auth.service')
const asyncLocalStorage = require('../services/als.service')

async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}
 
  asyncLocalStorage.run(storage, () => {
    if (!req.cookies) return next()
    console.log('req-setupAsyncLocalStorage', JSON.stringify(req.cookies))
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    console.log('inLoginValidate', loggedinUser)

    if (loggedinUser) {
      const alsStore = asyncLocalStorage.getStore()
      alsStore.loggedinUser = loggedinUser
    }
    next()
  })
}

module.exports = setupAsyncLocalStorage

