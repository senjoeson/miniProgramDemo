
/**
 * @description: 停车步骤一
 **/
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from '@tarojs/redux';
import { AtButton } from "taro-ui";

import "./index.scss";

@connect(({ stepinone, loading }) => ({
    ...stepinone,
    loading: loading.effects['stepinone/effectsDemo']
}))
export default class StepInOne extends Component {

    static propTypes = {
        dispatch: PropTypes.any,
        msg: PropTypes.string
    };

    static defaultProps = {};

    config = {
        navigationBarTitleText: '停车步骤一'
    };

    componentDidMount = () => {
        this.props.dispatch({ type: 'stepinone/effectsDemo', payload: { msg: 'trigger effectsDemo' } })
    };

    render() {
        return (
            <View>
                <Text>{this.props.msg}</Text>
            </View>
        );
    }
}
    