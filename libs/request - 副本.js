/**
 * 仿wx.request写的功能，功能一样，加了一些共通配置的东西,减少接口开发需要配置的参数
 * TODO 未将wx.request功能未全部重写，所有特殊对应原时候再继续加
 */

/**
 * 日后要增加的功能
 * clickDelay 现阶段为true与false, 限制时间为1秒，再增加一个函数回调模式，用来变更页面信息用
 * 用户类型检测处 增加 注册用户 与 授权用户的区别 区分验证级别（现在由后台返回301 或 302 判断，不建议增加）
 * 出现错误后台报警的api
 */

//普通配置
var clickDelayTime = 1000; //延迟点击默认时间
//TODO 这项没有完成
var errorUrl = ''; //接口出现错误用来报警的api,正常来说后台应该自己有的，主要用来前期测试交流开发减少沟通

/*********************************
 * 模拟数据api配置
 ********************************/
const openMock = false; //开启模拟数据
if (openMock == true) {
    var apiData = require('./apiData.js');
}

/*********************************
 * api配置配置
 ********************************/
const defaultConfig = {
    apiType: 'default', //默认参数类型
    method: 'GET', //默认请求类型
    data: {}, //数据为空
    clickDelay: true, //开启点击延迟
    showLoading: true, //发送请求是否显示loading true/false
    showLoadingMessage: '正在请求...', //发送请求时显示的文本框
    showSuccessLoading: false, //关闭
    showSuccessLoadingMessage: '',
    showErrorLoading: true, //开启
    showErrorLoadingMessage: ''
}

/*********************************
 * 状态码文档
 * 200 正确数据 需要在codeSuccess中指定，正确数据跳入成功返回页面，也可以根据项目修改
 * 300 普通错误(未特定指定) 跳入codeError函数，未特定指定的也会跳入codeError
 * 301 去授权登录页面(小程序登录) 接入指定函数
 * 302 去注册页面(绑定手机号或添加其他数据) 接入指定函数
 * 500 异常错误(即不应该出现的错误) 需要向后台发送日志
 * 900 异常跳转,去首页(用户跳到了权限无法到达的页面，重定向到首页)
 * 其他异常 跳入codeError函数，未特定指定的也会跳入codeError
 ********************************/
//常用参数判断设置
const codeSuccess = 200; //正确的code

//全局code判断函数，未指定的为调用处处理
const codeList = {
    "301": toUserLogin, //去登录
    "302": toPagesUserRegister, //去注册页面
    "900": function () { //用户没有权限的请求
        wx.switchTab({
            url: '/' + getApp().constant.pagesList.index
        })
    }
}

/**
 * 返回数据修改
 */
const returnCofig = {
    codeField: 'code', //code的字段,code只支付数字,非数字报错
    dataField: 'data', //数据的字段
    msgField: 'msg' //消息的字段
}

/*********************************
 * 核心方法
 * setConfig 所有参数说明
 * -->api 获取api.js中的配置信息 xxx.xxx.xxx 模式，现阶段最大支付三级
 ********************************/
/**
 * 核心方法
 * @param data
 * @returns {*}
 */
const request = function (setConfig) {
    //log日志输出
    var time = new Date().getDate(); //获取时间参数
    var log = '【' + time + '】-【api接口url】【' + setConfig.api + '】-->';

    if (!setConfig) {
        errorAlert(log + '[配置错误]未传任何参数~');
        return false;
    }

    var app = getApp();

    //如果存在api,查找api配置
    if (setConfig.api) {
        var apiPath = setConfig.api.split('.');

        if (apiPath.length == 1) {
            var apiConfig = app.api[apiPath[0]];
        } else if (apiPath.length == 2) {
            var apiConfig = app.api[apiPath[0]][apiPath[1]];
        } else if (apiPath.length == 3) {
            var apiConfig = app.api[apiPath[0]][apiPath[1]][apiPath[2]];
        }

        if (!apiConfig) {
            errorAlert(log + '[配置错误]' + '未找到有效的api配置');
        }
    } else {
        var apiConfig = {}; //空数据
    }

    //默认配置合并,最终api配置: 默认配置 -> api配置 -> 用户配置
    var config = Object.assign({}, defaultConfig, apiConfig, setConfig);

    console.log(log + '[api配置]');
    console.log(config);

    //检测长度
    if (Object.keys(config).length <= 0) {
        errorAlert(log + '[配置错误]无任何api配置~');
        return false;
    }

    //TODO 检测必要参数 如url
    console.log(log + '[接口名称]' + config.name);

    // [操作函数]
    var successFunction = typeof config.success == 'function' ? config.success : '';
    var failFunction = typeof config.fail == 'function' ? config.fail : '';
    var codeErrorFunction = typeof config.codeError == 'function' ? config.codeError : '';
    var completeFunction = typeof config.complete == 'function' ? config.complete : '';

    // [各类事件配置]
    var apiType = config['apiType']; //api类型
    var clickDelay = config['clickDelay']; //点击延迟
    var showSuccessLoading = config['showSuccessLoading']; //codeSuccess时 是否弹窗
    var showSuccessLoadingMessage = config['showSuccessLoadingMessage'];
    var showErrorLoading = config['showErrorLoading']; //codeError时 是否弹窗
    var showErrorLoadingMessage = config['showErrorLoadingMessage']; //codeError时 是否弹窗
    var showLoading = config['showLoading']; //是否显示loading
    var data = config.data ? config.data : {};

    /*
     * parameter传参:跟据api参数配置进行对应检测必填项或强制增加项
     * api设置为true 必填项
     * api设置为属性 强制项，不会接受参数调整,只配置这个参数，类似常量
     * api设置false 非必填项
     * 不设置不检测
     */
    if (!config.data || (typeof config.data != "object" && typeof config.data != "array")) {
        var parameter = new Object();
    } else {
        var parameter = config.data;
    }

    //TODO 参数检测重构,无法检测多维数组,需要重构,同时增加更详尽的规则
    //for (var key in data) {
    //    var value = data[key];
    //    if (value === true && !data[key] && data[key] !== 0) { //检测必填项
    //        errorAlert(log + '【参数】' + key + '必填');
    //        return false;
    //    } else if (value && value !== true) { //参数存在 并且不为true
    //        data[key] = value;
    //    }
    //    //false 与 空 不检测
    //}

    // [parameter传参]参数剔空,去空格 TODO 无法检测多维数组,需要重构,这里应该与上面进行合并
    for (var i in data) {
        if (data[i] == undefined) { //去除javascript中的undefined未定义内容
            delete data[i]
        }

        if (typeof data[i] == 'string') { //如果是字符串,两边去空
            data[i] = data[i].trim();
        }

        if (data[i] === '') { //值为空值时
            delete data[i];
        }

        if (data[i] == undefined) { //TODO 需要测试是不是字符串,未定义，这个是javascript的错误类型需要删除
            delete data[i];
        }
    }

    // [parameter传参]:默认必带参数 TODO 这个单词意义不明
    if (config.source) {
        data['source'] = config.source;
    }

    // 是否携带token,默认情况下只有要token就会携带,只有notUser时不携带
    if (app.userInfo.token && apiType != 'notUser') {
        data['token'] = app.userInfo.token;
    }

    // [apiType检测]某种类型下携带某些参数
    if (apiType == 'user') { //需要用户登录
        console.log(log + '[执行用户强制登录检测]', app.userInfo.token);
        if (!app.userAuto.checkUserLogin()) {
            //未登录跳转登录页
            toUserLogin();
            return true;
        }
    } else if (apiType == 'default' || apiType == 'notUser') { //默认模式

    } else {
        errorAlert(log + 'apiType类型,暂不支持');
        return false;
    }

    console.log(log + '[提交参数]', data);

    // [点击延迟]任何事件都不准许多次点击提交,一个接口1秒只能提交一次
    if (clickDelay == true) {
        var clickDelayName = 'clickDelay.' + config['api'];

        if (wx.getStorageSync(clickDelayName) == true) {
            console.log(log + clickDelayName + ':接口延迟点击中..........拒绝本次请求');

            //防止锁死，任何点击都配置1秒后解除
            setTimeout(function () {
                console.log(log + clickDelayName + ':延迟事件解除1');
                wx.removeStorageSync(clickDelayName);
            }, clickDelayTime)
            return false;
        } else {
            console.log(log + clickDelayName + ':请求通过,增加延迟1秒时间');
            wx.setStorageSync(clickDelayName, true); //进行延迟操作

            //防止锁死，任何点击都配置1秒后解除
            setTimeout(function () {
                console.log(log + clickDelayName + ':延迟事件解除2');
                wx.removeStorageSync(clickDelayName);
            }, clickDelayTime)
        }
    }

    // [请求loading] 显示请求loading
    if (showLoading == true) {
        apiShowLoading(config.showLoadingMessage)
    }

    //数据返回参数进行过滤
    var success = function (res) {
        //显示loading才会隐藏loading
        if (showLoading == true) {
            hideLoading();
        }

        //接口不做任何处理
        if (config['isProcessReturnData'] == false) {
            return false;
        }

        console.log(log + '[success数据]:', res);

        //未知错误,不等于200走不到该程序内
        if (res.statusCode !== 200) {
            alert('网络延迟,请稍后重试');
            //TODO 后期写接口访问日志
            return false;
        }

        /*
         * 配置服务错误类型,配置服务返回错误
         * 每个框架错误类型不一样，需要根据需求定制
         */
        if (1 != 1) {
            //TODO 后期写接口访问日志
            alert('接口错误,服务出错,请联系我们');
            return false;
        }

        //接口参数判断
        var content = res.data;
        var code = content[returnCofig.codeField]; //标识code
        var data = content[returnCofig.dataField] ? content[returnCofig.dataField] : {}; //核心数据
        var msg = content[returnCofig.msgField] ? content[returnCofig.msgField] : ''; //返回消息

        //没有正常的标识
        if (code === '' || isNaN(code)) {
            console.log(log + '[success][code]', code);
            //TODO 后期写接口访问日志
            alert('接口错误,未返回正确的标识,请联系我们');
            return false;
        }

        //检查特定错误code
        if (codeList[code]) {
            codeList[code](msg);
            return false;
        }

        //判断每种标识所走的逻辑
        if (code == codeSuccess) { //获取正常数据

            //弹出正确消息
            if (showSuccessLoading == true) {
                alert(showSuccessLoadingMessage ? showSuccessLoadingMessage : msg);
            }

            //TODO 增加回调检测,判断data中某些参数必须存在
            console.log(log + '[success]开始回调:');
            if (successFunction) {
                console.log(log + '[success]方法存在:');
                console.log(data);
                data = formatData(data); //格式化
                console.log(data);
                successFunction(data, res)
            }
        } else if (code || code === 0 || code === '0') { //其他类型,进入codeError
            //弹出错误消息
            if (showErrorLoading) {
                alert(showErrorLoadingMessage ? showErrorLoadingMessage : msg);
            }

            //进入codeError函数
            if (codeErrorFunction) {
                codeErrorFunction(content, res);
            }
            return true;
        } else {
            //TODO 后期写接口访问日志
            alert('接口错误,未返回正确的标识,请联系我们');
            return false;
        }
    }

    /**
     * 接口异常使用
     * @param res
     */
    var fail = function (res) {
        if (showLoading == true) {
            hideLoading();
        }

        wx.showModal({
            title: '消息',
            content: '服务器未返回正确数据,请尝试重新请求~',
            showCancel: false,
        })

        //传回参数
        if (failFunction) {
            failFunction(res)
        }
    }

    //类型判断,增加不同的头部信息
    if (config.method == 'POST') {
        var content_type = "application/x-www-form-urlencoded";
    } else if (config.method == 'GET') {
        var content_type = 'application/json;charset=utf-8'
    }

    console.log(log + '[链接全称]' + config.url);

    //[多维字典格式转换]多维字典格式转换,多维字典直接上传是传不上去的
    var isDuoWei = false;
    for (var i in data) {
        if (typeof data[i] == 'array' || typeof data[i] == 'object') {
            isDuoWei = true;
        }
    }

    if (isDuoWei == true) {
        var common = require('../utils/common.js');

        if (config.method == 'POST') {
            data = common.serialize(data);
        } else if (config.method == 'GET') {
            config.url = config.url + '?' + common.serialize(data);
            data = '';
        }

        console.log(log + '[多维数据]格式转换:', data);
    }

    //[虚拟返回数据]开启虚拟数据
    if (openMock == true) {
        //寻找数据
        var virtualData = getMockData(setConfig.api, log);
        var virtualRes = '';
        if (virtualData.type) {
            //拆解类型
            if (virtualData.type == 'url') { //替换url
                config.url = virtualData.data;
            } else if (virtualData.type == 'data') { //固定数据
                virtualRes = {
                    statusCode: 200,
                    data: virtualData.data
                }
            } else if (virtualData.type == 'mock') { //mock模拟
                var Mock = require('../utils/mock-min.js');
                virtualRes = {
                    statusCode: 200,
                    data: Mock.mock(virtualData.data)
                }
            }

            if (virtualRes) {
                alert('请注意,正在使用虚拟数据');
                console.log(log + '[虚拟数据]data:', virtualRes);
                success(virtualRes);
                return true;
            }
        }
    }

    //请示数据
    var cache = wx.request({
        url: config.url,
        method: config.method,
        dataType: 'json',
        data: data,
        header: {
            'content-type': content_type,
        },
        success: success,
        fail: fail,
        complete: completeFunction ? completeFunction : function (res) {
            console.log(log + '【complete】');
            console.log(res);
        }
    })

    return cache;
}

/**
 * 格式化数据
 * @param data 数据
 * @param rule 规则 暂时不需要
 */
function formatData(data, rule) {
    for (var i in data) {
        if (typeof data[i] == "object" || typeof data[i] == 'array') {
            data[i] = formatData(data[i]);
        }

        if (data[i] == null) { //后台数据库中有时候会存null，这里清除
            data[i] = ''
        }
    }

    return data;
}


/**
 * showModal 严重错误,属于生产/开发环境都不可以出现的
 * @desc
 * @param t
 * @returns {boolean}
 */
function errorAlert(content) {
    wx.showModal({
        title: '提示',
        content: content,
        showCancel: false,
    })
}

/**
 * 显示loading
 * @param content
 */
function apiShowLoading(content) {
    var app = getApp();

    //未开启
    if (app.globalData.isShowLoading == false) {
        wx.showLoading({
            title: content,
            mask: true,
        })

        app.globalData.isShowLoading == true
    }
}

/**
 * 隐藏loading
 */
function hideLoading() {
    wx.hideLoading();
    getApp().globalData.isShowLoading == false;
}

/**
 * 普通消息
 * @param content
 */
function alert(content) {
    if (!content) {
        return false;
    }

    var time = content.length / 4 * 1000;
    if (time < 2000) time = 2000;
    wx.showToast({
        title: content,
        icon: 'none',
        duration: time
    })
}

/**
 * 进入->用户授权登录页
 * TODO 把该接口转到userAuto中去
 * @param content
 */
function toUserLogin(content) {
    //TODO 本页直接跳转获取登录(前提是已经受权过)
    var app = getApp();
    console.log('去登录', app.globalData.isToLogin);
    if (app.globalData.isToLogin == false) {
        //清除用户信息,添加跳转标记,并进行跳转
        app.userAuto.deleteUser();
        app.globalData.isToLogin = true;
        wx.navigateTo({
            url: '/' + app.constant.pagesList.userLogin
        })

        //解除限制跳转登录页
        setTimeout(function () {
            app.globalData.isToLogin = false;
        }, 2000)
    } else {
        //解除限制跳转登录页(防止异常情况下没有解除)
        setTimeout(function () {
            app.globalData.isToLogin = false;
        }, 2000)
    }
}

/**
 * 进入->用户注册页面
 * TODO 把该接口转到userAuto中去
 */
function toPagesUserRegister() {
    var app = getApp();
    if (app.globalData.isToLogin == false) {

        //清除用户信息,添加跳转标记,并进行跳转
        app.globalData.isToLogin = true;
        wx.navigateTo({
            url: '/' + getApp().constant.pagesList.userRegister
        })

        //解除限制跳转登录页
        setTimeout(function () {
            app.globalData.isToLogin = false;
        }, 2000)
    } else {
        //解除限制跳转登录页(防止异常情况下没有解除)
        setTimeout(function () {
            app.globalData.isToLogin = false;
        }, 2000)
    }
}

/**
 * 获取api模拟数据
 * @param api
 * @param log
 * @returns {*}
 */
function getMockData(api, log) {
    var apiPath = api.split('.'); //拆解数组
    var virtualConfig = '';
    var virtualPath = '';
    var virtualdData = '';

    if (apiPath.length == 1) {
        virtualConfig = apiData[apiPath[0]];
        virtualPath = apiPath[0] + '.js';
    } else if (apiPath.length == 2 && typeof apiData[apiPath[0]] != 'undefined') {
        virtualConfig = apiData[apiPath[0]][apiPath[1]];
        virtualPath = apiPath[0] + '/' + apiPath[1] + '.js';
    } else if (apiPath.length == 3 && typeof apiData[apiPath[0]] != 'undefined' && typeof apiData[apiPath[0]][apiPath[1]] != 'undefined') {
        virtualConfig = apiData[apiPath[0]][apiPath[1]][apiPath[2]];
        virtualPath = apiPath[0] + '/' + apiPath[1] + '/' + apiPath[2] + '.js';
    }

    console.log(log + '[虚拟数据]配置:', virtualConfig);
    console.log(log + '[虚拟数据]路径:', './apiData/' + virtualPath);
    if (virtualConfig && virtualConfig.isUse == true) {
        var virtualList = require('./apiData/' + virtualPath)
        console.log(log + '[虚拟数据]数据列表:', virtualList);

        if (virtualConfig.type == 1) {
            if (virtualConfig.index && virtualList[virtualConfig.index]) { //指定位置
                virtualdData = virtualList[virtualConfig.index];
            } else { //未指定
                virtualdData = virtualList[0]
            }
        }

        if (virtualConfig.type == 2) {
            let number = virtualConfig.index++;

            if (virtualConfig.list && virtualConfig.list.length > 0) {
                if (!virtualConfig.list[number]) {
                    number = 0;
                }

                number = virtualConfig.list[number];
            } else {
                //重置位置
                if (!virtualList[number]) {
                    number = 0;
                }
            }

            virtualdData = virtualList[number] ? virtualList[number] : '';
            virtualConfig.index = number;
        }

        console.log(log + '[虚拟数据]数据:', virtualdData);
        return virtualdData;
    } else {
        return false;
    }
}

//返回
module.exports = request;