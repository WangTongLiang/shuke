/*
 * @Author: Haitai
 * @Date:   2016-11-02 09:40:36
 * @Last Modified by:   Haitai
 * @Last Modified time: 2016-11-04 16:07:35
 */

'use strict';
//ǰ̨�����allfil���ڽ��ս�����̨���������
function allfile(data) {
    var searchContent = document.querySelector(".search_input");
    var searchVal = searchContent.value;
    if (window.sessionStorage) {
        //���ڱ�����ʱ�洢�Ự��Ϣ ת���ַ�����ʽ���д洢
        sessionStorage.setItem(searchVal, JSON.stringify(data));
    }
    //����html���λ��
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


    //JSONP��ʽ��������
    var search = document.querySelector(".icon_search");
    var searchContent = document.querySelector(".search_input");
    //��ȡ�洢�ڱ���sessionstarage�е�ֵת��json��ʽ
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
    //�������ͼ�괥����������
    search.addEventListener("click", function() {
        //����script��ǩʵ�ֿ�������
        var JSONP = document.createElement("script");
        JSONP.type = "text/javascript";
        var start = encodeURI(encodeURI(searchContent.value));
        //�����callback�ֶδ�����̨allfile��������ƴ�ӷ�������

        JSONP.src = "http://192.168.0.76:8088/ERMSV2.0/serachAllFilesByFileName.action?callback=allfile&loginName=zhenglh&inputValue=" + start + "";

        //JSONP.src = "http://192.168.0.110:8088/ERMSV2.0/serachAllFilesByFileName.action?loginName=zhenglh&inputValue=" + start + "";

        //��script��ǩ���뵽html��
        document.querySelector("head").appendChild(JSONP);
    })


    //html5 ajax��������
    // var search = document.querySelector(".icon_search");
    // search.addEventListener('click', function() {
    //     var searchContent = document.querySelector(".search_input");
    //     //ȡ��������ֵ
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
