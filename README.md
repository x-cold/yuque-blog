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

## 配置文件

> config.yml

```
# 主题
theme: txd

# 语雀 API 设置
yuque:
  base: https://www.yuque.com/api/v2
  login: yinzhi
  repo: blog

# Site
title: 小冷的备忘录
subtitle: 但凡能引起思考的句子，都是些好句子
keywords: 小冷的备忘录,HTML/CSS/JAVASCRIPT,前端工程师,Angular,Ionic,Vue,React,Node.js,Powershell,Qt5
description: 小冷的备忘录,HTML/CSS/JAVASCRIPT,前端工程师,Angular,Ionic,Vue,React,Node.js,Powershell,Qt5
author: 小冷
language: zh-CN

# 友情链接
links:
  -
    name: 阿里巴巴
    url: https://www.alibaba.com
  -
    name: 阿里巴巴国际UED
    url: http://www.aliued.com/
  -
    name: 阿里巴巴U一点
    url: http://www.aliued.cn/

# 导航链接
navigators:
  -
    name: HOME
    url: /
  -
    name: BLOG
    url: /blogs

```

## Usage

### Install

```
npm install
```

### 启动开发环境

```
npm run dev
```

### 生产环境前端构建

```
npm run build
```

### 生产环境开启

```
npm start
```

访问: http://localhost:6001/

## TODO

- [x] 后端项目初始化
- [x] 前端项目初始化
- [x] 语雀仓库相关开放 API 服务
- [x] 接口单元测试
- [x] 接口代理开发
- [x] mock 数据准备
- [x] PWA 整站离线支持
- [x] 页面开发
- [x] 内容可配置
- [x] 主题可定制
- [ ] 页面优化


## License

[MIT](LICENSE)
