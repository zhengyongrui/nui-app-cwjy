/**
 * 登录常量类
 * @author linjianqun 2018-12-08
 * @version 1.0.0
 */

 // 扫码支持的页面
export const QRCODE_EXAM_MAIN_PAGE = 'examMainPage';

// 扫码登录支持的路由和对应的参数设置
export const QRCodeLoginRouteParamConfig = {
  examMainPage: {
    logo: require('@/assets/img/weixuexi/logo.png'),
    queryParams: ['displayType', 'examinePlanId'],
    path: '/home/0/threeConstruction/examinationMain?displayType={{displayType}}&examinePlanId={{examinePlanId}}'
  },
}

export const other = null;
