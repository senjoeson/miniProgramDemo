/**
 * @description: kitking-mobile-cli 脚本页面模板文件
 * @Author: fusy
 * @Date: 2019-01-22 14:51:50
 * -----
 * @Modified By: fusy
 * @Last Modified: 2019-06-20 20:35:10
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */
const dir2hump = require('kitking-mobile-cli/utils').dir2hump;
const uppercase = require('kitking-mobile-cli/utils').uppercase;

module.exports = function createPage(options) {
    const { input, name, isCreateStyle, isCreateModel, styleSuffix } = options;
    const dirNameHump = dir2hump(input);

    return `
/**
 * @description: ${options.description || ''}
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from '@tarojs/redux';
import { AtButton } from "taro-ui";

${isCreateStyle ? `import "./index.${styleSuffix}";` : ''}

${
    isCreateModel
        ? `@connect(({ ${dirNameHump}, loading }) => ({
    ...${dirNameHump},
    loading: loading.effects['${dirNameHump}/effectsDemo']
}))`
        : ''
}
export default class ${uppercase(name)} extends Component {

    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };

    static defaultProps = {};

    config = {
        navigationBarTitleText: '${options.description || name}'
    };

    componentDidMount = () => {
        ${isCreateModel ? `this.props.dispatch({ type: '${dirNameHump}/effectsDemo', payload: { msg: 'trigger effectsDemo' } })` : ''}
    };

    render() {
        return (
            <View>
                <Text>{this.props.msg}</Text>
            </View>
        );
    }
}
    `;
};
