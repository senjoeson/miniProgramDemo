/**
 * @description: 停车步骤一
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { AtButton, AtMessage } from "taro-ui";

import door_check_image from "../../resources/images/door_check.jpg";
import "./index.scss";

const Bmob = require("../../common/Bmob-2.2.1.min.js");

@connect(({ stepinone, loading }) => ({
    ...stepinone,
    loading: loading.effects["stepinone/effectsDemo"]
}))
export default class StepInOne extends Component {
    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            checkWord: "",
            canNext: false
        };
    }

    config = {
        navigationBarTitleText: "栏杆是否开启"
    };

    componentDidMount = () => {};

    onCheck = () => {
        const query = Bmob.Query("Stations");
        query.find().then(res => {
            let word =
                res[0].enable && res[0].stationNumber > 0
                    ? "可以停入停车场"
                    : "当前停车场停车位不足或不可用";
            this.setState({
                checkWord: word,
                canNext: res[0].enable && res[0].stationNumber > 0
            });
        });
    };

    goNext = () => {
        Taro.navigateTo({
            url: "/pages/stepInTwo/StepInTwo"
        });
    };

    render() {
        return (
            <View>
                <AtMessage />
                <View className='container'>
                    <Text>检查停车场是否可以进入</Text>
                    <Image className='img-style' src={door_check_image} />

                    <Text>检查结果: {this.state.checkWord}</Text>
                </View>

                <AtButton type='primary' className='btn' onClick={this.onCheck}>
                    检查
                </AtButton>
                {this.state.canNext && (
                    <AtButton
                        type='primary'
                        className='btn'
                        onClick={this.goNext}
                    >
                        下一步
                    </AtButton>
                )}
            </View>
        );
    }
}
