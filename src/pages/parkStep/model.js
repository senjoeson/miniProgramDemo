
export default {
    namespace: 'parkstep',

    state: {},

    effects: { //effects 处理数据、逻辑
        *effectsDemo({ payload }, { call, put }) {
            yield put({
                type: 'reducersDemo',
                payload
            });
        }
    },

    reducers: { //reducers 渲染页面。
        reducersDemo(state, { payload }) {
            return { ...state, ...payload };
        }
    }
};
    