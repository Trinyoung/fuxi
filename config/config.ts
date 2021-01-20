/*
 * @Author: your name
 * @Date: 2020-11-23 09:04:01
 * @LastEditTime: 2021-01-20 13:26:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\config\config.t
 */

export const config = {
  mongodbSever: {
    DB_URL: 'mongodb://127.0.0.1/process'
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
