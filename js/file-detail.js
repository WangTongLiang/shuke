/*
 * @Author: Haitai
 * @Date:   2016-11-03 12:01:29
 * @Last Modified by:   Haitai
 * @Last Modified time: 2016-11-04 14:05:33
 */

'use strict';
//根据不同文件格式切换图片路径
function allExtension(extension) {
    switch (extension) {
        case 'excel':
            return 'excel.png';
            break;
        case 'mp4':
            return 'MP4.png';
            break;
        case 'mp3':
            return 'mp3.png';
            break;
        case 'pdf':
            return 'PDF.png';
            break;
        case 'ppt':
            return 'PPT.png';
            break;
        case 'txt':
            return 'txt.png';
            break;
        case 'wenjian':
            return 'wenjian.png';
            break;
        case 'word':
            return 'word.png';
            break;
        case 'zbd':
            return 'ZBD.png';
            break;
        default:
            return 'unknow.png';
            break;

    }
}

function allfile(data) {
    var quanZongHao = data.result[0].TOTALRECORD_ID == null ? '' : data.result[0].TOTALRECORD_ID;
    //获取文件扩展名
    var extension = data.result[0].TITLE.split('.')[1];
    var detailMessage = document.querySelector('.detail_message');
    var html = `<div class="file_search">
                <div class="file_search_box">
                    <p>${data.result[0].TITLE}</p>
                </div>
            </div>
            <main id="file_detail">
                <table>
                    <tr>
                        <td>全宗号</td>
                        <td class="quzonghao">${quanZongHao}</td>
                    </tr>
                    <tr>
                        <td>标识</td>
                        <td class="biaoshi">${data.result[0].IDENTIFIER}</td>
                    </tr>
                    <tr>
                        <td>标识类型</td>
                        <td class="biaoshileixing">${data.result[0].IDENTIFIER_TYPE}</td>
                    </tr>
                    <tr>
                        <td>标识名称</td>
                        <td class="biaoshimingceng">${data.result[0].IDENTIFIER_NAME}</td>
                    </tr>
                    <tr>
                        <td>标识编码</td>
                        <td class="biaoshibianma">${data.result[0].IDENTIFIER_CODE}</td>
                    </tr>
                    <tr>
                        <td>来源</td>
                        <td class="laiyuan">${data.result[0].PROVENANCE}</td>
                    </tr>
                    <tr>
                        <td>聚合层次</td>
                        <td class="juhecengci">${data.result[0].AGGREGATION_LEVEL}</td>
                    </tr>
                </table>
                <section class="wrap_more">
                    <div class="more">
                        <a href="#">查看更多</a>
                    </div>
                </section>
                <div class="fujian">
                    <ul class="myattention-productlist" id="attention">
                        <li>
                        </li>
                        <li class="clearfix">
                            <a href="#" class="">
                                <div class="pic-div">
                                    <img src="./images/file/${allExtension(extension)}">
                                </div>
                                <div class="prolist-content">
                                    <div class="prolist-name "><span>${data.result[0].TITLE}</span></div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </main>`
    detailMessage.innerHTML = html;
};
(function() {
    document.querySelector('.icon_back').addEventListener('click', function() {
        history.go(-1);
    });
    var search = window.location.search.split("=")[1];
    var JSONP = document.createElement("script");
    JSONP.type = "text/javascript";
    JSONP.src = "http://192.168.0.76:8088/ERMSV2.0/serachYDataById.action?callback=allfile&loginName=zhenglh&dfileguid=" + search + "";
    //http://10.165.223.121:8080/ERMS/serachYDataById.action?dfileguid=
    document.querySelector("head").appendChild(JSONP);
})();
