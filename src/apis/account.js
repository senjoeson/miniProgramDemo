/* eslint-disable import/prefer-default-export */
import request from "@/common/request";

export async function doLogin(params) {
    //{} 中 可能做不同的处理,
    return request("", params);
}
