/*
 * @Author: your name
 * @Date: 2020-09-23 16:03:09
 * @LastEditTime: 2021-01-29 19:35:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\db\mongo\mongo.ts
 */
import * as mongoose from 'mongoose';
import * as config from 'config';
import { Logger } from '../../logger/config';
const DB_URL:string = config.get('database.mongodb.url');

Logger.info(DB_URL, '数据库地址');
let connectTimes = 0;
const connect = function () {
    connectTimes++;
    if (connectTimes > 5) {
        Logger.error('connect mongodb connectTimes > 5');
        setTimeout(() => {
            process.exit(1);
        }, 2000);
        return;
    }
    mongoose.set('useCreateIndex', true);
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    mongoose.connection.on('connected', () => {
        console.info('connect mongodb successfully');
    });
    mongoose.connection.on('error', (error) => {
        Logger.error('connect mongodb failed', error);
    });
};
// 加上这个
// mongoose.connect(db, { useNewUrlParser: true })
connect();
mongoose.connection.on('disconnected', function () {
    connect();
});
export default mongoose.model;
