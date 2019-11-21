/**
 * @description: 停车步骤二
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { AtButton, AtMessage } from "taro-ui";

import tingchezhuangImage from "../../resources/images/tingchezhuang.jpg";

import "./index.scss";

const Bmob = require("../../common/Bmob-2.2.1.min.js");

@connect(({ stepintwo, loading }) => ({
    ...stepintwo,
    loading: loading.effects["stepintwo/effectsDemo"]
}))
export default class StepInTwo extends Component {
    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            checkWord: "",
            canNext: false
        };
    }
    static defaultProps = {};

    config = {
        navigationBarTitleText: "操作停车桩"
    };

    componentDidMount = () => {
        this.props.dispatch({
            type: "stepintwo/effectsDemo",
            payload: { msg: "trigger effectsDemo" }
        });
    };

    openScan = () => {
        Taro.scanCode({
            onlyFromCamera: true,
            success: res => {
                //{result: "http://v.youku.com/v_show/id_XNzU2MTgzNzEy.html", charSet: "UTF-8", errMsg: "scanCode:ok",
                // scanType: "QR_CODE", rawData: "aHR0cDovL3YueW91a3UuY29tL3Zfc2hvdy9pZF9YTnpVMk1UZ3pOekV5Lmh0bWw="}
                if (res && res.result) {
                    this.setState({
                        canNext: true,
                        checkWord: "扫描成功."
                    });
                    Taro.atMessage({
                        message: "扫码成功",
                        type: "info"
                    });
                    var startDate = new Date();
                    const query = Bmob.Query("ParkStation");
                    query.set("cardId", Taro.getStorageSync("cardId"));
                    query.set("protectState", true);
                    query.set("payState", false);
                    query.set("startDate", startDate);
                    query
                        .save()
                        .then(res => {
                            this.updateStations();
                            Taro.atMessage({
                                message: "已成功计费,保护锁已开。",
                                type: "success"
                            });
                        })
                        .catch(err => {
                            Taro.atMessage({
                                message: err,
                                type: "success"
                            });
                        });
                }
            }
        });
    };

    updateStations = () => {
        const query = Bmob.Query("Stations");
        query
            .get("objectId")
            .then(res => {
                console.log(res);
                res.set("parkNumber", "199"); //此处应该直接递减
                res.save();
            })
            .catch(err => {
                console.log(err);
            });
    };

    goNext = () => {
        Taro.navigateTo({
            url: "/pages/stepInThree/StepInThree"
        });
    };

    render() {
        return (
            <View>
                <AtMessage />
                <View className='container'>
                    <Text>二维码已生成,请扫描二维码</Text>
                    <Text style='color:gray;font-size:12px'>
                        测试时,请找任意一张二维码扫描
                    </Text>
                    <Image className='img-style' src={tingchezhuangImage} />
                    <Text>扫码结果: {this.state.checkWord}</Text>
                </View>

                <AtButton
                    type='primary'
                    className='btn'
                    onClick={this.openScan}
                >
                    扫描二维码
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
