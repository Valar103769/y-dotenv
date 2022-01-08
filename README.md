### 支持 .env 文件

读取项目中 .env 文件中的变量, 注入到 process.env

集成了 [vue-cli 中的 mode 和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F),使用方式与之一致
即:

1. 支持 mode
2. 支持 local

> mode 和 local 都存在时, local 与 mode 会合并,local 优先

跟 dotenv 做同样的事, 但处理方式与 dotenv 有很大不同, dotenv 不会修改已经存在 process.env 上的变量,某些时候,

- `.env`文件里的变量跟实际代码跑的变量不一致, 属于黑盒
- 而 dot 始终取`.env`文件里的变量,属于白盒

### example

#### install

```bash
npm install dot -D
```

#### usage

在项目根目录下创建一个 .env 文件

```bash
// .env
FOO=bar
VUE_APP_NOT_SECRET_CODE=some_value
```

在编译阶段,你可以使用它

```bash
const dot = require('dot')
const env = dot({ mode: "development" });
console.log(env)
```

| 参数 | 描述                | 例子                                  |
| ---- | ------------------- | ------------------------------------- |
| path | 自定义.env 文件路径 | `path.resolve(process.cwd(),'./env')` |
| mode | 文件后缀            | `.env.[mode]`                         |
