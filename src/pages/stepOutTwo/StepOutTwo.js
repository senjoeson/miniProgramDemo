
/**
 * @description: 出车二
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from '@tarojs/redux';
import { AtButton } from "taro-ui";

import "./index.scss";


export default class StepOutTwo extends Component {

    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };

    static defaultProps = {};

    config = {
        navigationBarTitleText: '出车二'
    };

    componentDidMount = () => {
        
    };

    render() {
        return (
            <View>
                <Text>{this.props.msg}</Text>
            </View>
        );
    }
}
    