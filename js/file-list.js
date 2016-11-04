/*
 * @Author: Haitai
 * @Date:   2016-11-02 09:40:36
 * @Last Modified by:   Haitai
 * @Last Modified time: 2016-11-04 16:07:35
 */

'use strict';
//前台定义的allfil用于接收解析后台传入的数据
function allfile(data) {
    var searchContent = document.querySelector(".search_input");
    var searchVal = searchContent.value;
    if (window.sessionStorage) {
        //用于本地临时存储会话信息 转成字符串形式进行存储
        sessionStorage.setItem(searchVal, JSON.stringify(data));
    }
    //生成html添加位置
    var searchResultContent = document.querySelector('.search_result_content');
    var html = '';
    html += '<ul class="file_list_all">'
    for (var i = 0; i < data.result.length; i++) {
        var name = data.result[i].CHECKOUTPERNAME == null ? '' : data.result[i].CHECKOUTPERNAME;
        html += `<li class="file_list">
                         <a href="file-detail.html?detail=${data.result[i].DFILEGUID}">
                             <div class="file_list_content">
                                 <div class="file_list_name">
                                     <span class="file_list_title">${data.result[i].DFILENAME}</span>
                                 </div>
                                 <div class="list_footer">
                                     <span>${name}</span> <span class="date">${data.result[i].DATCREATEDATETIME.slice(0,10)}</span><i></i>
                                 </div>
                             </div>
                         </a>
                     </li>`
    }
    html += '</ul>';
    searchResultContent.innerHTML = html;
};
(function() {


    //JSONP形式跨域请求
    var search = document.querySelector(".icon_search");
    var searchContent = document.querySelector(".search_input");
    //获取存储在本地sessionstarage中的值转成json格式
    var sessionResult = JSON.parse(sessionStorage.getItem(searchContent.value));
    var searchResultContent = document.querySelector('.search_result_content');
    if (sessionResult != null) {
        var html = '';
        html += '<ul class="file_list_all">'
        for (var i = 0; i < sessionResult.result.length; i++) {
            var name = sessionResult.result[i].CHECKOUTPERNAME == null ? '' : sessionResult.result[i].CHECKOUTPERNAME;
            html += `<li class="file_list">
                         <a href="file-detail.html?detail=${sessionResult.result[i].DFILEGUID}">
                             <div class="file_list_content">
                                 <div class="file_list_name">
                                     <span class="file_list_title">${sessionResult.result[i].DFILENAME}</span>
                                 </div>
                                 <div class="list_footer">
                                     <span>${name}</span> <span class="date">${sessionResult.result[i].DATCREATEDATETIME.slice(0,10)}</span><i></i>
                                 </div>
                             </div>
                         </a>
                     </li>`
        }
        html += '</ul>';
        searchResultContent.innerHTML = html;
    }
    //点击搜索图标触发跨域请求
    search.addEventListener("click", function() {
        //创建script标签实现跨域请求
        var JSONP = document.createElement("script");
        JSONP.type = "text/javascript";
        var start = encodeURI(encodeURI(searchContent.value));
        //定义个callback字段传到后台allfile参数用于拼接返回数据

        JSONP.src = "http://192.168.0.76:8088/ERMSV2.0/serachAllFilesByFileName.action?callback=allfile&loginName=zhenglh&inputValue=" + start + "";

        //JSONP.src = "http://192.168.0.110:8088/ERMSV2.0/serachAllFilesByFileName.action?loginName=zhenglh&inputValue=" + start + "";

        //将script标签加入到html中
        document.querySelector("head").appendChild(JSONP);
    })


    //html5 ajax跨域请求
    // var search = document.querySelector(".icon_search");
    // search.addEventListener('click', function() {
    //     var searchContent = document.querySelector(".search_input");
    //     //取得输入框的值
    //     var start = encodeURI(encodeURI(searchContent.value));
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('get', "http://192.168.2.125:8088/ERMSV2.0/serachAllFilesByFileName.action?loginName=zhenglh&inputValue=" + start + "", true);

    //     //xhr.open('get', "http://192.168.0.76:8088/ERMSV2.0/serachAllFilesByFileName.action?loginName=zhenglh&inputValue=" + start + "", true);
    //     xhr.send(null);
    //     xhr.onreadystatechange = function() {
    //         if (xhr.readyState == 4) {
    //             if (xhr.status == 200) {
    //                 var data = xhr.responseText;
    //                 console.log(data);
    //             }
    //         }
    //     }
    // })


})();
