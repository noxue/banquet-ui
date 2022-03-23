import {
  shareConfig
} from "../common/shareConfig.js"

/**
 * 分享
 * @desc 目前兼容小程序，后期增加app
 */

module.exports = {
  data() {
    return {}
  },
  methods: {
    tableInit(object) {
      object.table = {
        data: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        pageStatus: 0
      }
      // object.data = []
      // object.total = 0
      // object.pageSize = 10
      // object.pageNum = 1
      // object.pageStatus = 0
    },
    tableRequest(object, request, type) {
      let table = object.table;
      if (type === 'reset') {
        table.pageNum = 1;
        table.pageStatus = 1;
        table.data = [];
      }

      // 状态判断
      if (table.pageStatus !== 1) return false;
      table.pageStatus = 5;

      request().then(list => {
        // 数据调整
        if (table.pageNum > 1) {
          table.data.concat(list);
        } else {
          table.data = list;
        }

        // 翻页配置修改
        if (list.length < table.pageSize) {
          if (table.data.length <= 0) {
            table.pageStatus = 99;
          } else {
            table.pageStatus = 10;
          }
        } else {
          table.pageStatus = 1;
        }

        table.pageNum++;

        // 停止下拉刷新
        uni.stopPullDownRefresh();
      }, err => {
        table.pageStatus = 1;

        // 停止下拉刷新
        uni.stopPullDownRefresh();
      })
    }
  }
}
