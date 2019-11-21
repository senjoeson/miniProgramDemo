/**
 * @description: 停车步骤
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Progress, Checkbox, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { AtButton, AtCheckbox } from "taro-ui";

import drawQrcode from "../../common/weapp.qrcode.min.js";
import checkImage from "../../resources/images/check.png";

import "./index.scss";

@connect(({ parkstep, loading }) => ({
    ...parkstep,
    loading: loading.effects["parkstep/effectsDemo"]
}))
export default class ParkStep extends Component {
    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            carId: "",
            step1State: false,
            step2State: false,
            step3State: true,
            step4State: true,
            step5State: true
        };
    }

    static defaultProps = {};

    config = {
        navigationBarTitleText: "停车步骤"
    };

    componentDidMount = () => {
        let objId = this.$router.params.objectId;

        console.log("车辆信息:" + this.$router.params.carNumber);
        this.setState({
            carId: objId,
            carNumber: this.$router.params.carNumber
        });
        drawQrcode({
            width: 200,
            height: 200,
            canvasId: "myQrcode",
            text: "https://github.com/yingye"
        });
        // this.props.dispatch({ type: 'parkstep/effectsDemo', payload: { msg: 'trigger effectsDemo' } })
    };

    render() {
        return (
            <View>
                <View className='rows-style'>
                    <Text style='margin-left: 20rpx'>
                        当前操作的车辆: {this.state.carNumber}
                    </Text>

                    <View className='step-style'>
                        <Text style='margin-left: 20rpx'>
                            步骤1: 检查是否有剩余停车位
                        </Text>

                        {this.state.step1State && (
                            <Image src={checkImage} className='img-style' />
                        )}
                    </View>

                    <View className='step-style'>
                        <Text style='margin-left: 20rpx'>
                            步骤2: 打开停车场栏杆是否开启
                        </Text>
                        {this.state.step2State && (
                            <Image src={checkImage} className='img-style' />
                        )}
                    </View>

                    <View className='step-style'>
                        <Text style='margin-left: 20rpx'>
                            步骤3: 是否可以停入停车位
                        </Text>
                        {this.state.step3State && (
                            <Image src={checkImage} className='img-style' />
                        )}
                    </View>

                    <View className='step-style'>
                        <Text style='margin-left: 20rpx'>
                            步骤4: 停车完成,生成计费二维码
                        </Text>
                        {this.state.step4State && (
                            <Image src={checkImage} className='img-style' />
                        )}
                    </View>

                    <View className='qrcode-style'>
                        <canvas
                            style='width: 200px; height: 200px;padding:20px;'
                            canvas-id='myQrcode'
                        ></canvas>
                    </View>

                    <View className='step-style' style='margin-top:80px'>
                        <Text style='margin-left: 20rpx'>
                            步骤5: 扫描停车桩二维码,开始计费
                        </Text>
                        {this.state.step5State && (
                            <Image src={checkImage} className='img-style' />
                        )}
                    </View>
                </View>
            </View>
        );
    }
}
