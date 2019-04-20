'use strict';
const _ = require('lodash');

module.exports = {
  // 定义模型
  defineModel(
    app,
    name,
    attributes,
    attrs_default = { timestamps: false, freezeTableName: true }
  ) {
    const attrs = {};

    for (const key in attributes) {
      const value = attributes[key];
      if (_.isObject(value) && value.type) {
        value.allowNull = value.allowNull && true;
        attrs[key] = value;
      } else {
        attrs[key] = {
          type: value,
          allowNull: true,
        };
      }
    }

    return app.model.define(
      name,
      attrs,
      attrs_default || {
        createdAt: new Date(),
        updatedAt: new Date(),
        freezeTableName: true,
        getterMethods: {
          createdTime() {
            const createdTime = this.getDataValue('createdTime');
            if (createdTime) {
              return app.formatToDayTime(createdTime);
            }
          },
        },
        setterMethods: {},
      }
    );
  },
};
