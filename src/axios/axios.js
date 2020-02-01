import axios from 'axios';
import {Loading, Message} from 'element-ui'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    if(response.status == 200 && response.data !=''){
        return response.data;
    }else{
        Message({
            dangerouslyUseHTMLString: true,
            message: '数据请求失败'
        });
    }
}, error => {
    console.log(error)
    Message({
        dangerouslyUseHTMLString: true,
        message: '接口请求出错'
    });
    // 请求失败
    if (error && error.response) {
        switch (error.response.status) {
            case 401:
                Message.error({
                    message: '未授权，请登录',
                    // onClose: function () {
                    //     router.push({name: 'error-404'});
                    // }
                })
                break
            case 403:
                Message.error({
                    message: '拒绝访问',
                    // onClose: function () {
                    //     router.push({name: 'error-403'});
                    // }
                })
                break
            case 404:
                Message.error({
                    message: '请求地址出错',
                    // onClose: function () {
                    //     router.push({name: 'error-404'});
                    // }
                })
                break
            case 408:
                Message.error({
                    message: '请求超时',
                    // onClose: function () {
                    //     router.push({name: 'error-404'});
                    // }
                })
                break
            case 500:
                Message.error({
                    message: '服务器内部错误',
                    // onClose: function () {
                    //     router.push({name: 'error-500'});
                    // }
                })
                break
            default:
                return Promise.reject(error);
        }
    }
})
