/**
 * 轻路由系统
 * 与页面相关项目的页页,可能在每个页面中使用耦合较深
 */

/**
 * tab页列表,要与json一致,用来做toPage方法
 */
export const tabPagesList = {
  'index': '/pages/index/index',
  'cate': '/pages/goods_cate/goods_cate',
  'cart': '/pages/order_addcart/order_addcart',
  'user': '/pages/user/user',
};

// 常用列表页,用来在不同api中跳转同一个页面
export const pagesList = {
  'index': '/pages/index/index', //首页
  'userH5Login': '/pages/login/index', //用户授权登录
  'userWeChatMiniLogin': '/pages/login/wxLogin', // 微信授权登录
  'userRegister': '', //用户注册页
  'errorPage': '/pages/notFound/index', // 错误页面
}

/**
 * 去登录页面
 * @desc 有平台区分
 */
export function toPageLogin() {
  // #ifdef H5
  uni.navigateTo({
    url: pagesList.userH5Login
  })
  // #endif

  // #ifdef MP-WEIXIN
  uni.navigateTo({
    url: pagesList.userWeChatMiniLogin
  })
  // #endif

  return true;
}

/**
 * 去注册页面
 * @des 
 */
export function toRegisterPage() {

}

/**
 * 去错误页面
 */
export function toPagesError() {
  if (pagesList.errorPage) {
    uni.redirectTo({
      url: pagesList.errorPage
    });

    return true;
  }

  return false;
}

/**
 * 去页面
 * @desc 判断是否跳转的是tab页面,进行不同的跳转
 * @param {Object} page 跳转页面
 */
export function toPage(page) {
  if (tabPagesList.indexOf(page) > 0) {
    uni.switchTab({
      url: page
    })
  } else {
    uni.navigateTo({
      url: page
    })
  }
}
