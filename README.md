# 在线代码编辑器（onlineIDE）  
## 后端
judge0 docker  
后端请自行部署judge0 docker。  
参考：https://my.oschina.net/suncf/blog/4257003
## 前端
vue3 + vite + typescript + tailwind + ace editor  
## 预览
![image](https://user-images.githubusercontent.com/35400185/148081461-53c0f5bf-171d-48bb-b958-1cbc708ad44d.png)

支持主题切换和背景配置
![image](https://user-images.githubusercontent.com/35400185/148083734-ff050501-3d21-4f4e-b951-a16a3deb8cd4.png)
![image](https://user-images.githubusercontent.com/35400185/148082641-b3bf5dbc-620e-4657-aa99-19541e1cc250.png)

## 功能
支持十几种语言（主要是judge0给力）  
支持Ctrl + S 本地保存代码，刷新浏览器上次写的代码还在。  
支持Ctrl + R 一键运行代码。  
支持字号、tab键大小切换。  
支持自适应平板端、pc端布局。  
支持直接引用dist文件夹中内容实现jsdeliver的cdn加速。（如需二次开发请配置.env）
## 注意
如需二次开发请务必更改/src/config/env.ts 中的后端接口地址为你自己的，因为项目里写的几个测试ip都不稳定随时关， 请自行部署后端api 。
