/* eslint-disable import/no-commonjs */
/**
 * @description: kitking-mobile-cli 脚本组件模板文件
 * @Author: fusy
 * @Date: 2019-06-20 19:52:46
 * -----
 * @Modified By: fusy
 * @Last Modified: 2019-06-20 20:13:14
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */


const { createIndex, createIndexDTS, craeteComponent, craeteComponentDTS } = require('kitking-mobile-cli/templates/component');

function craeteClassComponent({ name, description }) {
    return `
/**
 * @description ${description || ''}
 **/
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';

export default class ${name} extends Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    render(){
        return <View></View>
    }
}
    `;
}

function craeteClassComponentDTS({ name }) {
    return `
import * as React from 'react';
export default class ${name} extends React.Component<any, any> {};
    `;
}

module.exports = {
    createIndex,
    createIndexDTS,
    craeteComponent,
    craeteComponentDTS,
    craeteClassComponent,
    craeteClassComponentDTS
};
