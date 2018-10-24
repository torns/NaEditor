## H5Editor
一个可视化运营页面搭建工具，在装修台中可以使用系统自带的图片热区、文字、轮播、浮层等模块，或使用自定义代码模块进行传统的HTML+CSS+JS开发，同时也有模拟真实业务场景的商品模块，用户可以录入商品并选择模板后自动展示商品列表。
### 效果展示：
![](
https://naeditor-image.oss-cn-shenzhen.aliyuncs.com/jasdkfhdshfsadfhdjkhfhasdjkfhadsf.gif)

### [线上地址](h5editor.cn)
（如果不想注册，可以使用__测试账号__，__用户名：test__，__密码：test__）

### 总体架构
![](
https://naeditor-image.oss-cn-shenzhen.aliyuncs.com/gdsjhkglasdhsdlghdsagh.jpg)
### 兼容浏览器：
* Chrome(推荐)
* Safari
* Firefox
* 360/搜狗
* Edge

### 后续工作：

##### Bug:
* 图片热区——绘制热区逻辑重构
* ModuleBar高度更新不及时

##### 产品需求方面：
* 子页面
* 真实的发布逻辑
* 视频模块
* 背景音乐模块
* 页面/模块/模板上限
* 图片上传服务使用hash生成图片名
* 页面管理优化（页面重命名/表格项/排序/搜索）
* ~~兼容360、safari、搜狗、firefox浏览器~~  2018.10.17
* ~~模板库与自定义模板机制~~ 2018.10.15
* ~~商品模块~~ 2018.10.10
* ~~浏览页图片懒加载~~ 2018.9.23

##### 前端：
* 管理端（Vue）
* 商品库组件
* 链接选择工具
* 静态资源http2
* 轮播组件使用react-loadable引入
* 调研immutable
* 图片懒加载优化
* PWA
* 重构interface.ts
* ~~浏览页接入React服务端渲染~~ 2018.9.5


##### 服务端：
* XSS、CSRF漏洞
* 用户登录态session存入redis
* 密码校验MD5
* 接口越权校验与防刷
* 全站https
* 登录注册验证码
* Typescript
* 接口单元测试
* mongodb连表查询调研
* redis缓存更新策略优化
* ~~redis缓存页面渲染结果~~ 2018.9.20
* ~~图片上传服务~~ 2018.8.22

##### RN：
* 买一台iphone..
* 接入浮层模块
* 接入定位模块
* 接入文字模块
* 接入


##### 持续集成与部署：
* 调研Docker
* 编译报错回滚
* 白屏测试
* jenkins内权限划分
* nginx切换为openresty
* 浏览页ETag检测移到反代层
* ~~接入线上编译/打包~~ 2018.9.21