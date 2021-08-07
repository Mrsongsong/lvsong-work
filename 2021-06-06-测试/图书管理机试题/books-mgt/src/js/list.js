require("../css/list.less")
document.ready(function () {
    // 获取dom节点
    let mainDon = document.querySelector("main")
    let batchBtn = document.querySelector(".some-btn")
    let everyBtn = document.querySelector(".every-btn")
    let forwardDom =document.querySelector(".forward")
    // 定义一个批量删除的空数据变量
    let arrList = [];
    // 循环遍历数据渲染页面
    $http.get("/book/bookList", function (res) {
        // 拿取整个数据的id组成数组
        let arr1 = res.data;
        // 定义一个全部删除的空数据变量
        let arr2 = []
        // 循环添加每个数据的id到空数组
        arr1.forEach(function (item, index) {
            return arr2.push(item.id)
        })
        // 遍历循环生成动态数据
        let arr = res.data
        let html = ""
        arr.forEach(function (item, index) {
            html += `
            <a href="./details.html?id=${item.id}" class="jump" data-name="${item.id}"">
                <div class="list-box dpflex">
                    <input type="checkbox" class="choose-inp">
                    <img src="${item.book_imgurl}" alt="">
                    <div class="text-box">
                        <span class="title fs12">
                                <span class="fw fs16">名称：</span>
                                ${item.book_name}
                        </span>
                        <div class="class-name fs12 mt10 mb10">
                                <span class="fs14 mt5 fw">分类:</span>
                                ${item.book_cate}
                        </div>
                        <p class="fs12 c8a8 itd-box">${item.book_desc}</p>
                    </div>
                    <div class="rem-btn">删除</div>
                </div>
            </a>
            `
        })
        // 页面显示
        mainDon.innerHTML = html
        // 事件委派注册点击事件
        mainDon.addEventListener("click", function (e) {
            // 判断获取到删除按钮标签
            if (e.target.className == "rem-btn") {
                // 阻止a标签默认事件
                e.preventDefault()
                // 获取每个a标签单独的ID
                let index = e.target.parentNode.parentNode.dataset["name"]
                // 调用单独删除接口
                $http.get("/book/delete", { bookId: index }, function (res) {
                    location.reload()
                })
            }
            if (e.target.className == "choose-inp") {
                // 获取每个a标签单独的ID
                let index = e.target.parentNode.parentNode.dataset["name"]
                if (e.target.checked) {
                    arrList.push(index)
                }
                if (!e.target.checked) {
                    //input框不选中时候拿到对应的唯一编号ID进行查找
                    let index1 = arrList.indexOf(index);
                    //如果有则用splice进行删除
                    arrList.splice(index1, 1)
                }
            }
        })
        // 点击批量删除
        batchBtn.addEventListener("click", function (e) {
            // 调用批量删除按钮
            $http.post("/book/batchdelete", { bookIds: arrList }, function (res) {
                location.reload()
                console.log(res);
            })
        })
        // 点击全部删除清空数据
        everyBtn.addEventListener("click", function (e) {
            // 调用批量删除按钮
            $http.post("/book/batchdelete", { bookIds: arr2 }, function (res) {
                location.reload()
            })
        })
        // 点击进入添加图书页面
        forwardDom.addEventListener("click",function(){
            location.href="./index.html"
        })

    })


})