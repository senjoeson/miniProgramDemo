/**
 * @description: 公共请求方法
 * @Author: fusy
 * @Date: 2019-06-20 15:29:33
 * -----
 * @Modified By: fusy
 * @Last Modified: 2019-06-20 20:15:11
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

import Taro from "@tarojs/taro";

const codeMessage = {
    200: "服务器成功返回请求的数据。",
    201: "新建或修改数据成功。",
    202: "一个请求已经进入后台排队（异步任务）。",
    204: "删除数据成功。",
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有权限（令牌、用户名、密码错误）。",
    403: "用户得到授权，但是访问是被禁止的。",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请检查服务器。",
    502: "网关错误。",
    503: "服务不可用，服务器暂时过载或维护。",
    504: "网关超时。",
};
/**
 * 可以配置公共参数数据
 * @param {*} pararms
 */
function initParams(pararms) {
    return { ...pararms };
}

/**
 * 验证交易码  可以配置全局错误信息执行操作.
 */
const checkCode = (response) => {
    //后期会做一个统一的认证  针对不同交易码.会有不同的处理结果,如 错误页面  网络错误页面 或者成功页面等
    // if (isCheckCode && response.data.respCode != "000000") {
    //     Taro.showToast({
    //         title: response.data.respMsg,
    //         icon: "none",
    //         duration: 2000
    //     });
    //     return [response.data, null];
    // }
    // return [null, response.data];
    return response;
};

/**
 * 验证响应状态码
 * @param {*} response
 */
const checkStatus = (response) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
        return [null, response.data];
    }
    const errortext = codeMessage[response.statusCode] || response.errMsg;
    // notification.error({
    //     message: `请求错误 ${response.status}: ${response.url}`,
    //     description: errortext
    // });

    const error = new Error(errortext);
    error.name = response.statusCode;
    error.response = response;
    throw error;
};

/**
 * 请求异常
 */
const catchError = (error) => {
    console.log(error);

    if (error) {
        Taro.showToast({
            title: error.toString(),
            icon: "none",
            duration: 2000,
        });
    }
};

export default function request(url, pararms, opt) {
    const _params = initParams(pararms);
    Taro.showToast({
        icon: "loading",
        duration: 0,
    });
    return Taro.request({
        url: url,
        data: _params,
        method: "POST",
        header: {
            "content-type": "application/json",
        },
        ...opt,
    })
        .then((response) => {
            Taro.hideToast();
            return response;
        })
        .then(checkStatus)
        .then(checkCode)
        .catch(catchError);
}

// export default function request(url, pararms, opt = {}) {
//     const _url = url.indexOf("http") > -1 ? url : process.env.BASE_URL + url;
//     console.log("realURL: " + _url);
//     const _params = initParams(pararms);
//     const { loading, isCatchError, isCheckCode } = {
//         loading: true,
//         isCatchError: true,
//         isCheckCode: true,
//         ...opt
//     };
//     loading &&
//         Taro.showToast({
//             icon: "loading",
//             duration: 60000,
//             mask: true
//         });
//     const send = Taro.request({
//         url: _url,
//         data: _params,
//         method: "POST",
//         header: {
//             "content-type": "application/json"
//         },
//         ...opt
//     })
//         .then(response => {
//             loading && Taro.hideToast();
//             return response;
//         })
//         .then(checkStatus)
//         .then(response => checkCode(response, isCheckCode));
//     if (isCatchError) {
//         return send.catch(catchError);
//     }
//     return send;
// }
