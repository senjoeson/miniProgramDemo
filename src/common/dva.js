/**
 * @description: dva 初始代码
 * @Author: fusy
 * @Date: 2019-06-20 11:07:50
 * -----
 * @Modified By: fusy
 * @Last Modified: 2019-06-20 20:14:55
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

import { create } from 'dva-core';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';

let app;
let store;
let dispatch;

function createApp(opt) {
    // redux日志
    if (process.env.NODE_ENV === 'development') opt.onAction = [createLogger()];
    app = create(opt);
    app.use(createLoading({}));

    if (!global.registered) opt.models.forEach((model) => app.model(model));
    global.registered = true;
    app.start();

    store = app._store;
    app.getStore = () => store;

    dispatch = store.dispatch;

    app.dispatch = dispatch;
    return app;
}

export default {
    createApp,
    getDispatch() {
        return app.dispatch;
    }
};
