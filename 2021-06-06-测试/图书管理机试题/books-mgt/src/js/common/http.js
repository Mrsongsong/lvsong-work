const BASE_URL = 'http://139.9.177.51:5000'

function objToString(data) {
    let str = '';
    let keyArr = Object.keys(data);
    keyArr.forEach(function(item) {
        str += '&' + item + '=' + data[item]
    })
    str = str.replace('&', '?');
    return str;
}




const $http = {
    get: function(url, data, callback) {

        if (callback) { //三个参数
            //拼接 
            url = url + objToString(data);
        } else { //两个参数
            callback = data;
        }
        let xhr = new XMLHttpRequest();
        xhr.open('get', BASE_URL + url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    },
    post: function(url, data, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('post', BASE_URL + url);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.send(JSON.stringify(data));
    },
    ajax: function(params) {
        if (params.type.toLowerCase() === 'get') {
            this.get(params.url, params.data, params.success)
        }

        if (params.type.toLowerCase() === 'post') {
            this.post(params.url, params.data, params.success)
        }
    }

}



// 文件上传
function $updateFile(url, fdKey, fdValue, success) {
    const xhr = new XMLHttpRequest();

    const fd = new FormData();
    fd.append(fdKey, fdValue);

    xhr.open('POST', BASE_URL + url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const resData = JSON.parse(xhr.responseText)
            success(resData)
        }
    }
    xhr.send(fd);
}



//挂载
window.$http = $http;
window.$updateFile = $updateFile;