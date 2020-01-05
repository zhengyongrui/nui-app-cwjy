import CryptoJS from '../../libs/encrypt/core';
import tripledes from '../../libs/encrypt/tripledes';
import ECB from '../../libs/encrypt/mode-ecb';
import RSAKey from '../../libs/rsa/rsa';
import {
	hex_md5
} from '../../libs/md5/md5';

function _processKey(srcKey) {
	let keyLen = 8;
	let srcKeyLen = srcKey.length;
	if (srcKeyLen > keyLen) {
		srcKey = srcKey.substr(0, keyLen);
	} else {
		let paddLen = keyLen - srcKeyLen;
		for (let i = 0; i < paddLen; i++) {
			srcKey += '0';
		}
	}
	return window.CryptoJS.enc.Utf8.parse(srcKey);
}

/**
 * 加密方法
 * @param { String } content
 * @param { String } srcKey
 */
function encrypt(content, srcKey) {
	if (!srcKey) {
		return '';
	}
	const key = _processKey(srcKey);
	let encryptStr = window.CryptoJS.DES.encrypt(content, key, {
		mode: window.CryptoJS.mode.ECB,
		padding: window.CryptoJS.pad.Pkcs7
	});
	return encryptStr.toString();
}

/**
 * 解密
 * @param {*} content
 * @param {*} srcKey
 */
function decrypt(content, srcKey) {
	if (!srcKey) {
		return '';
	}
	const key = _processKey(srcKey);
	const ciphertext = window.CryptoJS.enc.Base64.parse(content);
	let decryptStr = window.CryptoJS.DES.decrypt({
		ciphertext: ciphertext
	}, key, {
		mode: window.CryptoJS.mode.ECB,
		padding: window.CryptoJS.pad.Pkcs7
	});
	decryptStr = decryptStr.toString();
	let result = [];
	for (let index = 0; index < decryptStr.length; index += 2) {
		let char = decryptStr[index] + decryptStr[index + 1];
		result.push(String.fromCharCode(parseInt(char, 16)));
	}
	return result.join('');
}

function RSAEncrypt(value, srcKey) {
	let pk = {
		n: '55ad4b6c739452c01710d7763455abca358fc472a243517e743ef1d69618b6396fe7a76409cef96b716cb73723235f56614e19ee16bd0e0a8f47b8639ef15b6a95124e984757133060114472ef20ff18087cef05647d02ed70c3e7a9afb1ed0023cedcf64f9eea0d8ae0be7d68938f5c413077978d5435621f2c52524dbf8a97',
		e: '10101'
	};
	let rsa = new RSAKey();
	rsa.setPublic(pk.n, pk.e);
	return rsa.encrypt(value);
}

function MD5Encrypt(value) {
	return hex_md5(value);
}

export default {
	encrypt,
	decrypt,
	RSAEncrypt,
	MD5Encrypt
};
