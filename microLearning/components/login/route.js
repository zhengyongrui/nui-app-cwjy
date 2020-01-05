/**
 * 登录模块路由
 * @author linjianqun
 * @version1.0.0 2018-12-06
 */
const LoginPage = () => import(/* webpackChunkName:"LoginPage" */'./pages/LoginPage');
const ResetPwdPage = () => import(/* webpackChunkName:"ResetPwdPage" */'./pages/ResetPwdPage');
const RegisterPage = () => import(/* webpackChunkName:"RegisterPage" */'./pages/RegisterPage');
const QRcodeLoginPage = () => import(/* webpackChunkName:"QRcodeLoginPage" */'./pages/QRcodeLoginPage');

const route = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage
  },
  {
    name: 'outer_resetPwd',
    path: '/resetPwd',
    component: ResetPwdPage
  },
  {
    name: 'outer_register',
    path: '/register',
    component: RegisterPage
  },
  {
    name: 'qrcodeLoginPage',
    path: '/qrcodeLogin/:toRouteName',
    component: QRcodeLoginPage,
    children: [
      {
        name: 'qrcodeLoginPage_register',
        path: 'register',
        component: RegisterPage
      },
      {
        name: 'qrcodeLoginPage_resetPwd',
        path: 'resetPwd',
        component: ResetPwdPage
      }
    ]
  },
]

export default route
