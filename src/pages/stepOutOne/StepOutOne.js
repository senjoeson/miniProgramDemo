/**
 * @description: 出车一
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { AtButton } from "taro-ui";
import tingchezhuangImage from "../../resources/images/tingchezhuang.jpg";
import "./index.scss";

const Bmob = require("../../common/Bmob-2.2.1.min.js");

export default class StepOutOne extends Component {
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
        navigationBarTitleText: "解锁车辆"
    };

    componentDidMount = () => {};

    openScan = () => {
        let cardId = Taro.getStorageSync("cardId");
        if (!cardId) {
            Taro.atMessage({
                message: "您当前没有可出车辆",
                type: "error"
            });
        }
        Taro.scanCode({
            onlyFromCamera: true,
            success: res => {
                if (res && res.result) {
                    this.setState({
                        canNext: true,
                        checkWord: "解锁成功."
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
    goNext = () => {};

    render() {
        return (
            <View className='container'>
                <Text>扫描二维码解锁</Text>

                <Image className='img-style' src={tingchezhuangImage} />

                <Text>{this.state.checkWord} </Text>
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
