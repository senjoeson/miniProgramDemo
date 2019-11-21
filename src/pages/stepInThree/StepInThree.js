/**
 * @description: 停车完成
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { AtButton, AtMessage } from "taro-ui";

import "./index.scss";

@connect(({ stepinthree, loading }) => ({
    ...stepinthree,
    loading: loading.effects["stepinthree/effectsDemo"]
}))
export default class StepInThree extends Component {
    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };

    static defaultProps = {};

    config = {
        navigationBarTitleText: "停车完成"
    };

    componentDidMount = () => {
        this.props.dispatch({
            type: "stepinthree/effectsDemo",
            payload: { msg: "trigger effectsDemo" }
        });
    };

    goHome = () => {
        Taro.navigateTo({
            url: "/pages/home/Home"
        });
    };
    render() {
        return (
            <View>
                <AtMessage />
                <View className='container'>
                    <Text>恭喜您,停车成功</Text>

                    <AtButton
                        type='primary'
                        className='btn'
                        onClick={this.goHome}
                    >
                        返回首页
                    </AtButton>
                </View>
            </View>
        );
    }
}
