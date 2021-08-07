/**
 * 工具函数
 */
let toast = {
    // 封装轻提示
    createToast: function(status, msg) {
        let bodyDom = document.body
        let div = document.createElement("div")
        div.className = "toast"
        let html = `
            <i class="iconfont ${status==0?"icon-gou2":"icon-cha"}"></i>
            <p>${msg}</p>
        `
        div.innerHTML = html
        bodyDom.appendChild(div)


        setTimeout(function() {
            div.remove()
        }, 1000)
    },
    //封装页脚
    createFooter: function(page) {
        let bodyDom = document.body
        let footer = document.createElement("footer")
        footer.className = "footer dpflex"
        let html = `
        <div class="${page=="home"?"home active":"home"}">
            <i class="iconfont icon-shouye"}"></i>
            <div>首页</div>
        </div>
        <div class="${page=="sports"?"sport active":"sport"}">
            <i class="iconfont icon-xin"}"></i>
            <div>运动</div>
        </div>
        <div class="${page=="mine"?"Personal active":"Personal"}">
            <i class="iconfont icon-Icon_wode--outline"}"></i>        
            <div>我的</div>
        </div>
        `
        footer.innerHTML = html
        bodyDom.appendChild(footer)
    },
    // 注册点击事件
    clickAll: function() {
        let home = document.querySelector(".footer .home")
        let sport = document.querySelector(".footer .sport")
        let Personal = document.querySelector(".footer .Personal")
        home.addEventListener("click", function(e) {
            location.href = "./home.html"
        })
        sport.addEventListener("click", function(e) {
            location.href = "./sports.html"
        })
        Personal.addEventListener("click", function(e) {
            location.href = "./mine.html"
        })

    },
    // 字符串转对象
    strToObj: function(data) {
        // ?id=3&age=20
        let obj = {}
        let str = data
        let str1 = str.substr(1)
            // id=3&age=20
        let arr = str1.split("&")
            // ["id=3","age=20"]
        arr.forEach(function(item, index) {
            let arr1 = item.split("=")
                // [id,3] id是个字符串所以不能用obj.要用obj[]
            obj[arr1[0]] = arr1[1]
        })
        return obj;
    }
}
window.toast = toast