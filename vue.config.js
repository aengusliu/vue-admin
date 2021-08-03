module.exports = {
    
    // 公共路径 默认为"/"，建议使用"./"相对路径
    // 影响 打包生成文件 的 引入资源公共路径
    publicPath: "./", 
    
    // webpack-dev-server 相关配置
    // 本地服务器配置(用 npm run serve 打开的 webpack 服务器的配置项)
    devServer: {   
      port: 8080, // 端口
      host: "localhost", // 域名
      https: false, // 是否开启https
      open: true,	// 是否在开启服务器后自动打开浏览器访问该服务器
      hot: true, // 开启热加载
      // 设置代理(用于跨域)
      proxy: {
          '/api': {
              // 代理的目标地址
              target: 'http://localhost:9090',
              // 开启跨域
              changeOrigin: true
          }
      }
    },

    // 是否为 Babel 或 TypeScript 使用 thread-loader
    parallel: require('os').cpus().length > 1,

    // 向 PWA 插件传递选项
    pwa: {},

    // CSS相关配置
    css: {
        // 是否将组件中的CSS提取至一个独立的CSS文件中
        // 默认： 生产环境下为 true ; 开发环境下为 false
        extract: true,
        // 是否为CSS开启 source map，设置为true之后可能影响构建的性能
        // 默认：false
        sourceMap: false,
        // 向CSS相关的loader传递选项
        loaderOptions: {
            // 内部选项会传递给css-loader
		    sass: {
              //  （配置全局样式）  
		      prependData: `@import "./src/styles/main.scss";`
            },
            // // 内部选项会传递给postcss-loader
            // postcss: {}
        },
        // 启动CSS modules for all css/pre-processor files
        requireModuleExtension: true
    },
    
    // 取消lint语法检测，此处可不配置
    lintOnSave: false, 
    
    // 用 build 命令打包后，输出目录名称为：dist
    outputDir:"dist", 
    
    // 静态文件输出目录，基于dist(即在目录dist下有assets目录存放静态文件)
    assetsDir:"assets", 
    
    // 将打包生成的html文件命名为 index.html
    indexPath: "index.html", 
    
    // 取消.map文件的打包，加快打包速度
    productionSourceMap: false, 
    
    // 配置webpack配置项
    configureWebpack: (config) => {
      // process.env为环境变量，分别对应.env.development文件和.env.production文件 此处表示加快开发环境打包速度
      if (process.env.NODE_ENV !== 'production') return;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;	//生产环境去掉console.log
      return {  // 此处配置webpack.config.js的相关配置
        plugins: [],
        performance: {}
      };
    }
};
