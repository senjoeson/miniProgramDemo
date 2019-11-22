/**
 * @description: 出车一
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { AtButton, AtMessage } from "taro-ui";
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
        var that = this;
        //扫描完成  计算总停车时间
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
                    that.updateData();
                }
            }
        });
    };
    goNext = () => {
        Taro.navigateTo({
            url: "/pages/stepOutTwo/StepOutTwo"
        });
    };

    updateData = () => {
        this.setState({
            canNext: true,
            checkWord: "解锁成功."
        });
        Taro.atMessage({
            message: "扫码成功",
            type: "info"
        });
        var endDate = new Date().getTime();
        const query = Bmob.Query("ParkStation");
        query.set("id", Taro.getStorageSync("parkStationId"));
        //   .get(Taro.getStorageSync("parkStationId"))
        query.set("payMoney", "20");
        query.set("endDate", endDate);
        query
            .save()
            .then(res => {
                console.log("输出保存的结果是" + JSON.stringify(res));

                //  query.save();
                Taro.atMessage({
                    message: "解锁车辆成功,已停止计费。",
                    type: "success"
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <View>
                <AtMessage />
                <View className="container">
                    <Text>扫描二维码解锁</Text>

                    <Image className="img-style" src={tingchezhuangImage} />

                    <Text>{this.state.checkWord} </Text>
                </View>
                <AtButton
                    type="primary"
                    className="btn"
                    onClick={this.openScan}
                >
                    扫描二维码
                </AtButton>

                {this.state.canNext && (
                    <AtButton
                        type="primary"
                        className="btn"
                        onClick={this.goNext}
                    >
                        下一步
                    </AtButton>
                )}
            </View>
        );
    }
}
