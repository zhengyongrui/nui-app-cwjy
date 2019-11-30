// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const login = function () {
	return new Promise(resolve => {
		uni.request({
		    url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
		    data: {
		        text: 'uni.request'
		    },
		    header: {
		        'custom-header': 'hello' //自定义请求头信息
		    },
		    success: (res) => {
		        console.log(res.data);
		        this.text = 'request success';
		    }
		});
	})
}

const addUser = function (userInfo) {
    let users = getUsers();
    users.push({
        account: userInfo.account,
        password: userInfo.password
    });
    uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

export default {
    getUsers,
    addUser
}
