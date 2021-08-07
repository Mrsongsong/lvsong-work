require("../css/details.less")
document.ready(function () {
    // 获取dom节点
    let mainDom = document.querySelector("main")
    let backDom = document.querySelector(".back")
    
    // console.log(location.search);
    // 获取查询参数
    let sah = location.search
    // // 查询参数转字符串
    // let str = sah.substr(1)
    // // id=111&age=25
    // let arr = str.split("&")
    // console.log(arr);
    // let obj={}
    // arr.forEach(function(item,index){
    //     let arr1 = item.split("=")
    //     console.log(arr1);
    //     obj[arr1[0]]=arr1[1]
    // })
    // console.log(obj);
    let obj = toast.strToObj(sah)
    // 调用后端数据接口
    $http.get("/book/detail/" + obj.id, function (res) {
        console.log(res.data[0]);
        console.log(res.data[0].book_imgurl);
        // 转换为正常时间显示
        let data = new Date(res.data[0].book_ctime)
        let year = data.getFullYear()
        let month = data.getMonth() + 1
        let day = data.getDate()
        // 三目运算判断添零补齐
        month = month < 10 ? "0" + month : month
        day = day < 10 ? "0" + day : day
        console.log(year, month, day);
        // 动态数据渲染页面
        let html = `
            <div class="dpflex fdc book-box">
                <img src="${res.data[0].book_imgurl}">
                <div>书名：<span>${res.data[0].book_name}</span></div>
                <div>添加时间：<span>${year}-${month}-${day}</span></div>
                <div>所属分类：<span>${res.data[0].book_cate}</span></div>
                <div>简介：</div>
                <div>${res.data[0].book_desc}</div>
            </div>
        `
        mainDom.innerHTML = html
    })
    // 点击返回图书管理列表页
    backDom.addEventListener("click",function(){
        location.href="./list.html"
    })
})