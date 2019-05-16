const db = require('../../database/db')
const moment = require('moment')
module.exports = app => {
  const weUserSchema = require('../schema/we_user.js')(app)
  const WeUser = db.defineModel(app, 'we_user', weUserSchema)

  WeUser.getUserIdByopenId = async openId => {
    const targetUser = await WeUser.findOne({
      attributes: ['user_id'],
      where: {
        open_id: openId
      }
    })
    return targetUser.user_id
  }

  WeUser.addUser = async userInfo => {
    const result = await WeUser.create(userInfo)
    return result.user_id
  }

  WeUser.getUserInfo = async userId => {
    const info = await WeUser.findOne({
      attributes: [
        'user_id',
        'nick_name',
        'gender',
        'avatar',
        'city',
        'country'
      ],
      where: {
        user_id: userId
      }
    })

    const conver = {
      userId: info.user_id,
      nickName: info.nick_name,
      avatar: info.avatar
    }

    return conver
  }

  WeUser.updateLoginDate = async userId => {
    const record = await WeUser.update(
      { updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') },
      {
        fields: ['updated_at'],
        where: {
          user_id: userId
        }
      }
    )

    return record
  }

  return WeUser
}
