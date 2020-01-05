/**
 * 登录路由导航服务
 * @author linjianqun
 * @version 2018-12-08
 */

const routeName = {
  QRcode_page: 'qrcodeLoginPage'
}

/**
 * 重定向到通用扫码页
 * @param {*} $router
 * @param {*} toRouteName
 * @param {*} routeParams
 */
function replaceToQRCodeLoginPage($router, toRouteName, routeParams) {
  let params = {
    toRouteName: toRouteName
  };
  $router.replace({ name: routeName.QRcode_page, params: params, query: routeParams });
}

function routeToOtherPage() {
}

export {
  replaceToQRCodeLoginPage,
  routeToOtherPage
}
