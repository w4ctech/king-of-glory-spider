module.exports = {
    devServer:{
        open:true,
        hot:true,
        proxy:{
            '/api': {
                target: 'http://pvp.qq.com/web201605',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            },
            '/heroImg': {
                target: 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/',
                changeOrigin: true,
                pathRewrite: {
                    "^/heroImg": ''
                }
            },
            '/equipImg': {
                target: 'https://game.gtimg.cn/images/yxzj/img201606/',
                changeOrigin: true,
                pathRewrite: {
                    "^/equipImg": ''
                }
            }
        }
    }
}
