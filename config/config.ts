import * as log4js from 'log4js';
export const config = {
    mongodbSever: {
        DB_URL: "mongodb://127.0.0.1/process"
    },
    auth: {
        algorithm: 'aes-192-cbc',
        secret: 'trinyoung123'
    },
    session_config: {
        key: 'lqy123',
        maxAge: 20 * 1
    },
    tokenKey: 'trinyoung123'
}
// const crypto = require('crypto');

// const algorithm = 'aes-192-cbc';
// const password = '用于生成密钥的密码';
// // 改为使用异步的 `crypto.scrypt()`。
// const key = crypto.scryptSync(password, '盐值', 24);
// // 使用 `crypto.randomBytes()` 生成随机的 iv 而不是此处显示的静态的 iv。
// const iv = Buffer.alloc(16, 0); // 初始化向量。

// const cipher = crypto.createCipheriv(algorithm, key, iv);

// let encrypted = cipher.update('要加密的数据', 'utf8', 'hex');
// encrypted += cipher.final('hex');
// console.log(encrypted);
// // 打印: 9d47959b80d428936beef61216ef0b7653b5d23a670e082bd739f6cebcb6038f



// // const crypto = require('crypto');

// // const algorithm = 'aes-192-cbc';
// // const password = 'Password used to generate key';
// // Use the async `crypto.scrypt()` instead.
// // const key = crypto.scryptSync(password, 'salt', 24);
// // The IV is usually passed along with the ciphertext.
// // const iv = Buffer.alloc(16, 0); // Initialization vector.

// const decipher = crypto.createDecipheriv(algorithm, key, iv);

// // Encrypted using same algorithm, key and iv.
// // const encrypted =
// //   'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
// let decrypted = decipher.update(encrypted, 'hex', 'utf8');
// decrypted += decipher.final('utf8');
// console.log(decrypted);