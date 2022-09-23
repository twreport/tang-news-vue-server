module.exports = {
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        // 直接覆盖变量
                        // 'text-color': '#111',
                        // 'border-color': '#eee',
                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "/var/www/html/vue_servers/news/src/style/vant.less";`,
                    }
                }
            }
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 8000,   // 端口号
        https: false,
        open: true,
        disableHostCheck: true,//允许外网访问
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                // target: 'http://127.0.0.1/api',
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true,
                pathRewrite: {
                    //    '^/dev-api': '',
                    ["^" + process.env.VUE_APP_BASE_API]: ""
                }
            }
        }
    },
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production' ? '/news/' : '/'
};