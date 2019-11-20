/**
 * @description: kitking-mobile-cli 脚本页面样式模板文件
 * @Author: fusy
 * @Date: 2019-01-22 14:51:54
 * -----
 * @Modified By: fusy
 * @Last Modified: 2019-06-20 20:13:44
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */
module.exports = function createLess(options = {}) {
    const { prefix, suffix } = options;
    return `
${prefix || ''}
${suffix || ''}
    `;
};
