require("../css/list.less")
document.ready(function () {
    // 获取dom节点
    let mainDon = document.querySelector("main")
    let everyBtn = document.querySelector(".every-btn")
    let forwardDom = document.querySelector(".forward")
    let inpDom = document.querySelector(".inp")
    // 循环遍历数据渲染页面
    $http.get("/book/bookList", function (res) {
        // 定义一个全部删除的空数据变量
        let arr2 = []
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
            // 判断获取到a标签里input按钮标签
            if (e.target.className == "choose-inp") {
                // 点击事件获取全部动态渲染的inp标签
                let AllInp = document.querySelectorAll("main a input")
                // 实现反选功能并且数据进行改变
                // 立个标杆控制全选的状态
                let flag = true;
                // 检查每一个状态，只要有一个改变，就改变标杆的性质
                for (let a = 0; a < AllInp.length; a++) {
                    if (AllInp[a].checked == false) {
                        flag = false
                    }
                }
                // 全选状态---根据标杆的状态来改变全选按钮的状态
                if (flag == true) {
                    inpDom.checked = true
                } else {
                    inpDom.checked = false
                }
                // 获取每个a标签单独的ID
                let index = e.target.parentNode.parentNode.dataset["name"]
                // 判断arr2数据是否有值，如果有则进行下一步
                if (arr2) {
                    // 判断选中动态inp框选中时添加数组进去
                    if (e.target.checked) {
                        // inp选中状态往arr2数组添加数据
                        arr2.push(index)
                    }
                    if (!e.target.checked) {
                        //input框不选中时候拿到对应的唯一编号ID进行查找
                        let index1 = arr2.indexOf(index);
                        //如果有则用splice进行删除
                        arr2.splice(index1, 1)
                    }
                    console.log(arr2);
                }
            }
        })
        // 实现全选功能并且数据进行改变
        inpDom.addEventListener("click", function () {
            // 获取所有动态inp标签
            let AllInp = document.querySelectorAll("main a input")
            // 判断全选inp的值是否为选中状态
            if (inpDom.checked) {
                // 点击全选之前先将arr2数据清空，防止重复添加数据
                arr2 = [];
                // 循环遍历给每个动态inp框添加选中状态
                for (let a = 0; a < AllInp.length; a++) {
                    AllInp[a].checked = true
                    // 获取动态inp框上a标签的唯一属性ID值
                    let index = AllInp[a].parentNode.parentNode.dataset["name"]
                    // 把全部数据添加进arr2数组里
                    arr2.push(index)
                }
                // console.log(arr2);
            }
            // 判断全选inp的值是否为选中状态
            if (!inpDom.checked) {
                // 循环遍历给每个动态inp框添加不选中状态
                for (let b = 0; b < AllInp.length; b++) {
                    AllInp[b].checked = false;
                }
                // 不选中状态时，arr2数据全部清空
                arr2 = [];
            }
        })
        // 点击批量删除清空数据
        everyBtn.addEventListener("click", function (e) {
            // 调用批量删除接口
            console.log(arr2);
            $http.post("/book/batchdelete", { bookIds: arr2 }, function (res) {
                location.reload()
            })
        })
        // 点击进入添加图书页面
        forwardDom.addEventListener("click", function () {
            location.href = "./index.html"
        })

    })


})