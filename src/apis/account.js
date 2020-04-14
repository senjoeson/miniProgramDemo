/* eslint-disable import/prefer-default-export */
import request from '@/common/request';

export async function doLogin(params){
    //{} 中 可能做不同的处理,
    return request("http://10.5.1.121:8081/user/postLogin", params);
}