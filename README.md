# 说明

主要clone 改写自 https://github.com/angularclass/angular2-webpack-starter

# 对starter项目构建工具的修改点

1. 对css，scss普通编译的过程， 在webapck.dev.js webapck.prod.js 中，增加assets目录.

2. webapck.dev.js的devServer中加了一个setup中间件，用于mock本地json.

3. npm start 直接修改为使用热更新的命令

4. 增加gulp more，对webpack生成的文件进行二次处理，目前主要是生成对应main.fest，用于指明浏览器存储哪些静态资源

5. 采用新的目录结构，目测是css, scss，导致的，导致aot，不能使用----待改进---必须得弄。页面刷新时间为6s，其中缓存资源加载0.5s，浏览器编译时间太长 ---今天timeline--有变化，jit一般也就两三秒，当然aot更快

6. loader中 删除 resource-override选项
# 框架todo

1. 继续修改构建工具

2. 删除某些不必要文件，比如 assets中的icon等

3. 研究一下angular的http，最好还是转为promise，以及怎么对ajax请求添加公共处理逻辑
  ----rxjs 学习一下，应该不用promise了---看完，勉强懂了

4. 类似redux状态管理,或者最基本的做个全局数据缓存

# 业务todo
4. 改ngIf 为ngShow一类的-----发现有人推荐 原生 [hidden] 属性，基本实现功能，在loading.css加入了一个全局css属性
5. 公用代码，组件抽离directive
    -
6. 更多组件，比如toast,confirm dialog, madal弹窗等---找了个控件--sweetAlert--貌似有点老，接口也不行，但是好使

7. polyfill 为什么引入css.会出错。？？


# 使用

1. 本地json存放在src/assets/mock-data目录下，注意在server.json中做好配置

2. 建议component，pages的样式，必须使用scss开发， css样式建议放到assets目录

3. 一般引用外部模块，最好使用 npm install 的方式进行； 如果引入模块，过于老旧，没有支持npm commonjs规范等，请手动copy到src/assets/lib目录，再在代码中使用 require的方式引入，实在不行可以放入assets,在index.html创建script标签等

4.

# 备注 注意要点


#### 记录平时ts，angular2趟过的坑，或者个人感觉比较奇怪的地方

1. src/app/services 目录下文件，不要再取名 之内service了 报错

2. 各种数据类型检查，在dev阶段会报错，但是不影响运行，build则因为报错无法继续，todo--找个办法

3. ServerHostDetailComponent,热更新不成功，需要重新npm start，才生效---可能切分支导致的

4. 指定未知数据类型:any
# 优化用户名获取，

  ```
  <#if user??>
    <div style="display:none" id="swift_user_data">
        <input id="swift_user_data_input" value="${user.name}">
    </div>
  </#if>
  ```

 #### 针对aot单独说明，目前测试发现

 1. 会扫描 app目录下面的组件文件，当该组件，没有引入到项目里面，会报错
    ‘Cannot determine the module for component AppComponent’
    ，希望有配置项。能忽略它，目前手动删除，-----先使用手动删除

2. 发现和aot，亦或者 lazy loading特性相关的 ng-router-loader ，在git上只有20多个star，严重怀疑，代码质量。

3. 最诡异的一点。同一个component下面文件，把 scss改为 css就能成功aot编译成功，scss则在编译的最后部分报错，'ERROR in ./~/css-loader!./~/sass-loader/lib/loader.js!./config/resource-override.js
Module build failed: No input specified: provide a file name or a source string to process';
关键为啥jit能成功。aot就不能成功！！！ ------对应策略删除loader中 resource-override选项
