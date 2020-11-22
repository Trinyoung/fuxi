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