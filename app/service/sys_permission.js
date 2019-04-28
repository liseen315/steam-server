const Service = require('egg').Service;
const _ = require('lodash');

class SysPermisionService extends Service {
  async getMenuAndPermissions(idList) {
    const permisions = await this.ctx.model.SysPermission.getPermisionByIdList(
      idList
    );

    let menuList = [];
    const permissionList = [];
    permisions.map(item => {
      menuList.push(item.menu_code);
      permissionList.push(item.permission_code);
    });

    menuList = _.uniq(menuList);

    return { menuList, permissionList };
  }
}

module.exports = SysPermisionService;
