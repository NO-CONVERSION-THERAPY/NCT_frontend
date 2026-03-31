const path = require('path')
const paths = {
    views: path.join(__dirname, '../views'),
    public: path.join(__dirname, '../public'),
    blogData: path.join(__dirname, '../data.json'),
    blog: path.join(__dirname, '../blog')
}
module.exports = {
    paths
}