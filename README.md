# 开发指引

#### 环境

| 环境 | 版本    |
| ---- | ------- |
| node | >=8.0.0 |
| taro | v1.3.2  |

#### 依赖

| 框架名称 | 版本   | 作用                    | 文档网址                                                         |
| -------- | ------ | ----------------------- | ---------------------------------------------------------------- |
| taro     | v1.3.2 | 前端框架                | https://taro.aotu.io/                                            |
| taro-ui  | v2.2.1 | UI框架                  | https://taro-ui.aotu.io/                                         |
| dva      | v1.2.0 | 数据层框架，数据流控制 | https://dvajs.com                                               |

#### 指令

| 指令名称 | 使用方法                        | 作用                                                              | 参数说明                   |
| -------- | ------------------------------- | ----------------------------------------------------------------- | -------------------------- |
| cpfs     | npm run cpfs                    | 生成项目文件结构                                                  | -                          |
| page     | npm run page \[page\]           | 通过模板生成页面，页面组件、页面样式文件、model文件、修改路由文件 | npm run page user/register |
| ccui     | npm run ccui \[component_name\] | 通过模板生成组件 ,公共组件                                        | npm run ccui header        |
| cc       | npm run ccui \[component_name\] | 通过模板生成组件    业务相关组件                                  | npm run ccui login/form    |

#### 项目结构
参考《[文件结构.md](./文件结构.md)》
#### 开发规范
参考《[开发规范.md](./开发规范.md)》

# [小程序开发指引](./doc/wechat.md)

# [taro开发指引](./doc/taro.md)

# vscode 依赖插件 (开发前必须安装，很重要！！！)
插件能帮助规避代码编译问题和代码规范统一。
* ESlint
* Prettier - Code formatter
* psioniq File Header

# 页面结构
```
|-home
  |- Home.js 页面代码
  |- index.scss 页面样式
  |- model.js 页面数据层
```

Home.js 代码如下
```js
/**
 * @description: 首页
 **/
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import { connect } from '@tarojs/redux';
import { AtButton } from 'taro-ui';

import './index.scss';

/**
 *  通过 connect 高阶组件包裹，即可关联到redux store;
 *  connect(mapStateToProps, mapDispatchToProps);
 *  mapStateToProps = (state) => {...state};
 *  mapDispatchToProps = (dispatch) => {};
 * 
 *  当触发model reducers 方法时, mapStateToProps 则会执行, mapStateToProps 方法返回必须是一个object对象，该对象中的值将会更新到组件props中；
 *  home: 获取指定model state，model namespace 与之对应。如下则获取home的model state，home与model.js namespace对应；
 *  loading: 执行effects状态标识，当effects开始执行，则为true；执行完成则为false；effect是异步方法。每个页面会存在多个effects的情况，可通过以下语法获取对应effects loading状态
 *  loading.effects['[namespace]/[effect]']
 *  
 *  @connect(({ home, loading }) => ({
 *      getUserDataLoading: loading.effects['home/getUserData'] // 触发 this.props.dispatch({ type: 'home/getUserData'})时的loading状态
 *      getSysDataLoading: loading.effects['home/getSysData'] // 触发 this.props.dispatch({ type: 'home/getSysData'})时的loading状态
 *  }))
 * 
 *  触发this.props.dispatch({ type: 'home/effectsDemo', payload: { msg: 'trigger effectsDemo' } }); loading.effects['home/effectsDemo'] => true
 *  执行完成  loading.effects['home/effectsDemo'] => false
 **/
@connect(({ home, loading }) => ({
    ...home,
    loading: loading.effects['home/effectsDemo']
}))
export default class Home extends Component {
    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };

    static defaultProps = {};

    config = {
        navigationBarTitleText: '首页'
    };

    componentDidMount = () => {
        this.props.dispatch({ type: 'home/effectsDemo', payload: { msg: 'trigger effectsDemo' } });
    };

    render() {
        return (
            <View>
                <Text>{this.props.msg}</Text>
                <AtButton type='primary'>test</AtButton>
            </View>
        );
    }
}
```

model.js 代码如下

```js
import { queryUserData } from '@/apis/user'; // queryUserData 返回类型为promise
import { querySysData } from '@/apis/sys';//queryUserData 返回类型为promise
export default {
    namespace: 'home', // model 作用域，不能重复。唯一性

    state: {}, // 初始化state。

    /**
     *  effects，处理异步逻辑，获取接口数据。 effects为 es6 generator 函数
     *  方法前必须添加*号，内部需要 yield 标识符。
     *  语法格式 *(action, effects) => any; 可返回值，this.props.dispatch({ type: 'home/effectsDemo' }).then(([error, data]) => do...)
     *  select: 获取全局state，语法格式 const state = yield select((state) => state); 
     *  call: 调用请求方法 语法格式 const res = yield call(api, params);
     *  put: 触发reducers，更新state yield put({type: reducerName, [payload]});
     **/
    effects: { //effects 用于处理异步操作和业务逻辑 不直接修改 state
        *effectsDemo({ payload }, { call, put }) {
            yield put({
                type: 'reducersDemo',
                payload
            });
        }
        *getUserData({ payload }, { select, call, put }){
            const [error, data] = yield call(queryUserData, payload);
            if(!error){
                yield put({
                    type: 'updateUserInfo',
                    payload: data
                });
            }
            return [error, data];
        },
        *getSysData({ payload }, { call, put }){
            const [error, data] = yield call(querySysData, payload);
            if(!error){
                yield put({
                    type: 'updateSysInfo',
                    payload: data
                });
            }
        }
    },

    reducers: { //reducers 渲染页面。
        reducersDemo(state, { payload }) {
            return { ...state, ...payload };
        },
        updateUserInfo(state, {payload}){
            return {...state, ...payload}
        },
        updateSysInfo(state, {payload}){
            return {...state, ...payload}
        }
    }
};
    
```