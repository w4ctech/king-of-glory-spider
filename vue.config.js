module.exports = {
    devServer:{
        open:true,
        port: 2333,
        hot:true,
        proxy:{
            '/api': {
                target: 'http://pvp.qq.com/web201605',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        }
    },
    publicPath: './king-of-glory-spider/dist',
    outputDir: 'dist',
    lintOnSave: true,
    assetsDir: 'static',
    runtimeCompiler: false,


}
