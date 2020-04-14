/**
 * @description: 出车完成
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { AtButton, AtMessage } from "taro-ui";

import "./index.scss";

export default class StepOutThree extends Component {
    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };

    static defaultProps = {};

    config = {
        navigationBarTitleText: "出车完成"
    };

    componentDidMount = () => {};

    goHome = () => {
        Taro.clearStorageSync();
        Taro.navigateTo({
            url: "/pages/home/Home"
        });
    };

    render() {
        return (
            <View>
                <AtMessage />
                <View className="container">
                    <Text>恭喜您,停车成功</Text>

                    <AtButton
                        type="primary"
                        className="btn"
                        onClick={this.goHome}
                    >
                        返回首页
                    </AtButton>
                </View>
            </View>
        );
    }
}
