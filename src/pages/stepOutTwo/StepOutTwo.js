/**
 * @description: 出车二
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { AtButton, AtMessage } from "taro-ui";
import tingchezhuangImage from "../../resources/images/tingchezhuang.jpg";
import "./index.scss";

const Bmob = require("../../common/Bmob-2.2.1.min.js");

export default class StepOutTwo extends Component {
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
        navigationBarTitleText: "防盗保护解锁"
    };

    componentDidMount = () => {};

    payFor = () => {
        var that = this;
        Taro.showModal({
            title: "支付停车费",
            content: "确定支付停车费吗?",
            success: function(res) {
                if (res.confirm) {
                    that.doUpdate();
                    that.updateStationNumber();
                } else if (res.cancel) {
                    console.log("用户点击取消");
                }
            }
        });
    };

    doUpdate = () => {
        const query = Bmob.Query("ParkStation");
        //  console.log("当前获取的parkstationid===>"+)
        query.set("id", Taro.getStorageSync("parkStationId"));
        query.set("protectState", false);
        query.set("payState", true);
        query
            .save()
            //  .get(Taro.getStorageSync("parkStationId"))
            .then(res1 => {
                console.log("输出的结果是" + JSON.stringify(res1));
                //  this.updateStations();
                // query.set("objectId", res.objectId);
                // query.save();
                this.setState({
                    canNext: true,
                    checkWord: "支付成功."
                });
                Taro.atMessage({
                    message: "成功解锁防盗保护",
                    type: "success"
                });
            })
            .catch(err => {
                console.log("出现异常===>" + err);
            });

        Taro.atMessage({
            message: "支付成功",
            type: "success"
        });
    };

    updateStationNumber = () => {
        console.log("更新方法不执行吗?");
        const query1 = Bmob.Query("Stations");
        query1
            .get(Taro.getStorageSync("stationId"))
            .then(res => {
                console.log(res);
                let curNumber = res.stationNumber + 1;
                console.log("当前设置的数据是===>" + curNumber);
                res.set("stationNumber", curNumber); //此处应该直接加一
                res.save();
            })
            .catch(err => {
                console.log(err);
            });
    };

    goNext = () => {
        Taro.navigateTo({
            url: "/pages/stepOutThree/StepOutThree"
        });
    };

    render() {
        return (
            <View>
                <AtMessage />
                <View className="container">
                    <Text>要想解锁防盗装置,必须先支付停车费</Text>

                    <Image className="img-style" src={tingchezhuangImage} />

                    <Text>{this.state.checkWord} </Text>
                </View>
                <AtButton type="primary" className="btn" onClick={this.payFor}>
                    点击支付停车费
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
