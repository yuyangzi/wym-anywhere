# wym-anywhere

&emsp;&emsp;一个基于NodeJS的静态HTTP服务,使用ES6进行开发.其中使用了`async`和`await`异步函数.所以请使用nodev7.6以上的node版本

## Install

```shell
npm i -g wym-anywhere
```

## 使用方法

```shell
wym-anywhere
# 把当前文件夹作为静态资源服务器跟目录

wym-anywhere -p 8080
# 设置端口号为 8080 默认为8000

wym-anywhere -h localhost
# 设置 host 为 localhost 默认为 127.0.0.1

wym-anywhere -d /uer
# 设置跟目录为 /usr 默认为当前目录

wym-anywhere -v
# 显示版本号

wym-anywhere --help
# 显示帮助信息
```
