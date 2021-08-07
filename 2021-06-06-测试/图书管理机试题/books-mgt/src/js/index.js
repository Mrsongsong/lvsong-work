require("../css/index.less")
document.ready(function(){
    // 获取dom节点
    const rightImgDom =document.querySelector(".right-box")
    const bookImgDom =document.querySelector(".book-img")
    const iconAddDom =document.querySelector(".icon-add")
    const uploadDom =document.querySelector(".upload")
    const addDom =document.querySelector(".add-btn")
    const nameInp = document.querySelector(".inp-name")
    const classInp = document.querySelector(".inp-class")
    const introduceInp = document.querySelector(".introduce")
    const backDom =document.querySelector(".back")
    // 服务器地址
    console.log(bookImgDom);
    const BASE_URL = 'http://139.9.177.51:5000'
    let url = ""
    //点击图片上传功能实现
    uploadDom.addEventListener("change",function(){
        let arr = uploadDom.files[0]
        console.log(arr);
        $updateFile("/book/upload","imgurl",arr,function(res){
            url =BASE_URL+ res.imgurl
            bookImgDom.src= url
            if(bookImgDom.src){
                iconAddDom.style.display="none"
            }
        })
    })
    // 模拟点击div实现input点击上传图片的功能
    rightImgDom.addEventListener("click",function(){
        uploadDom.click()
    })
    // 点击上传
    addDom.addEventListener("click",function(){
        let obj = {
            bookName:nameInp.value,
            category:classInp.value,
            desc:introduceInp.value,
            imgurl:url,
        }
        $http.post("/book/add",obj,function(res){
            console.log("添加成功");
        })
    })
    // 点击返回图书列表页
    backDom.addEventListener("click",function(){
        location.href="./list.html"
    })
})