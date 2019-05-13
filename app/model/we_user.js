const db = require('../../database/db')
module.exports = app => {
  const weUserSchema = require('../schema/we_user.js')(app)
  const WeUser = db.defineModel(app, 'we_user', weUserSchema)

  WeUser.getUserByopenId = async openId => {
    const targetUser = await WeUser.findOne({
      where: {
        open_id: openId
      }
    })
    return targetUser
  }

  WeUser.addUser = async userInfo => {
    const result = await WeUser.create(userInfo)
    return result.user_id
  }

  return WeUser
}
