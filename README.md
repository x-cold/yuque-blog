# yuque-blog

yuque—blog 是一款基于[语雀](http://yuque.com/)内容管理平台的博客系统，用户可以在语雀上进行文档仓库的管理，然后在自定义的站点中展示这些内容

## 主要特性

- 优秀的文档编辑和管理体验（Powered by 语雀）
- 极速输出博客页面
- 可定制的博客主题
- 支持服务端渲染
- 支持 PWA 及离线访问
- 便捷的运维体验，提供一键部署的 Docker 镜像

## 技术栈

- 后端：Beidou (基于 Egg 和 React 的高性能同构框架)
- 前端：React / Reach-Router / Mobx / Axios / Mock.js / WorkBox

## TODO

- [x] 后端项目初始化
- [ ] 前端项目初始化
- [ ] ~~语雀 API SDK 封装~~
- [x] 语雀仓库相关开放 API 服务
- [ ] 接口代理开发
- [ ] mock 数据准备
- [ ] 页面开发
- [ ] PWA 整站离线支持

## Install

```
npm install
```

## Start

```
npm start
```

## License

[MIT](LICENSE)
