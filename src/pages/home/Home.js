/**
 * @description: 首页
 **/

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { AtButton, AtToast } from "taro-ui";

import "./index.scss";
import { id } from "postcss-selector-parser";

const Bmob = require("../../common/Bmob-2.2.1.min.js");

@connect(({ home, loading }) => ({
    ...home,
    loading: loading.effects["home/effectsDemo"]
}))
export default class Home extends Component {
    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };


     

    constructor(props) {
        super(props);
        this.state = {
            parkNumber: 0,
            stationName: "",
            enable: false
        };
    }

    static defaultProps = {};

    config = {
        navigationBarTitleText: "首页"
    };

    componentDidMount = () => {
        // this.props.dispatch({
        //     type: "home/effectsDemo",
        //     payload: { msg: "trigger effectsDemo" }
        // });
        const query = Bmob.Query("Stations");
        query.find().then(res => {
            //[{"createdAt":"2019-11-20 11:08:29","enable":true,"objectId":"eKdvLLLa",
            //"stationName":"测试停车场","stationNumber":200,"updatedAt":"2019-11-20 11:16:24"}]
            this.setState({
                parkNumber: res[0].parkNumber,
                stationName: res[0].stationName,
                enable: res[0].enable
            });
            // console.log(JSON.stringify(res));
        });
    };

    openScan = () => {
        // Taro.scanCode({
        //     onlyFromCamera: true,
        //     success (res) {
        //         console.log(res)
        //       }
        // })
    };
    //开始停车
    startPark = () => {
        //1检查停车场状态 2. 检查=停车场的车位数量
        if (!this.state.enable || this.state.parkNumber == 0) {
            Taro.showModal({
                title: "提示",
                content: "当前停车位不可用,无法停车.",
                success: res => {
                    if (res.confirm) {
                        console.log("用户点击确定");
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                }
            });
        } else {
            Taro.showLoading({
                title: "获取车辆信息中...",
                mask: true,
                success: res => {
                    setTimeout(() => {
                        Taro.hideLoading();
                        this.saveCarInfo();
                    }, 2000);
                    //保存成功

                    console.log("车辆信息已经获取");
                }
            });
        }
    };

   
    //解锁停车
    unlockPark = () => {};


    //保存车辆信息
    saveCarInfo=()=>{
        const query = Bmob.Query("Car");
        query.set("carNumber", "粤A 4783");
        query.set("carColor", "白色");
        query
            .save()
            .then(res => {
                Taro.showToast({
                    title: "保存车辆信息成功!",
                    icon: "success",
                    duration: 2000
                });
                Taro.navigateTo({
                    url: `/pages/parkStep/ParkStep?objectId=${res.objectId}`
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <View className="home-style">
                <Text>当前停车场: {this.state.stationName}</Text>
                <Text>当前的停车位: {this.state.parkNumber} 位</Text>
                <AtButton onClick={this.startPark}>停车流程</AtButton>
                <AtButton onClick={this.unlockPark}>出车流程</AtButton>
            </View>
        );
    }
}
