let ipUrl = 'http://127.0.0.1:7001/default/'
let servicePath = {
    getArticleList: ipUrl + 'getArticleList',    //首页文章列表
    getArticleById: ipUrl + 'getArticleById/',
    getTypeInfo: ipUrl + 'getTypeInfo' , //文章详情页内容接口，需要接受参数
    getListById: ipUrl + 'getListById/'
}
export default servicePath