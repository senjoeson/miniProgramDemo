# 微信小程序开发指引

#### [小程序开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

#### 简介

    小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验
    微信小程序优势在于，渲染层和逻辑层分离，与传统H5相比，传统H5渲染线程和逻辑线程是互斥；当js线程运行时，渲染线程会被挂起。当渲染线程运行时，js线程会被挂起；
    而小程序则将渲染层和逻辑层分离。将逻辑层运行到可执行脚本的沙盒中。通过桥接协议WeixinJsBridage进行通讯。

#### 小程序的运行环境

| 运行环境         | 逻辑层         | 渲染层           |
| ---------------- | -------------- | ---------------- |
| iOS              | JavaScriptCore | WKWebView        |
| 安卓             | V8             | chromium定制内核 |
| 小程序开发者工具 | NWJS           | Chrome WebView   |

#### 小程序生命周期
![Images](page-lifecycle.png)

