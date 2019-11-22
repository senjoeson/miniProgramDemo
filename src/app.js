import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import dva from "@/common/dva";
import models from "@/models";

import Index from "@/pages/home/Home";

import "@/resources/styles/theme.scss";
import "@/resources/styles/base.scss";

const Bmob = require("./common/Bmob-2.2.1.min.js");

const dvaApp = dva.createApp({
    initialState: {},
    models: models
});

const store = dvaApp.getStore();

// const store = configStore();

class App extends Component {
    config = {
        pages: [
            "pages/home/Home",
            // "pages/parkStep/ParkStep",
            "pages/stepInOne/StepInOne",
            "pages/stepInTwo/StepInTwo",
            "pages/stepInThree/StepInThree",
            "pages/stepOutOne/StepOutOne",
            "pages/stepOutTwo/StepOutTwo",
            "pages/stepOutThree/StepOutThree"
        ],
        window: {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTitleText: "WeChat",
            navigationBarTextStyle: "black"
        }
    };

    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        );
    }
}

Bmob.initialize("8844924ffd68dbe5", "960616");
Taro.render(<App />, document.getElementById("app"));
