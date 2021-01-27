/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:44:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 14:03:01
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\logger\config.ts
 */
import * as log4js from 'log4js';

log4js.configure({
    appenders: {
        dongrui_node: { type: 'console', filename: '../logs/access' },
        error: {
            type: 'file',
            filename: 'logs/dongrui_error',
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log',
            layout: {
                type: 'pattern',
                pattern: '[%d] [%p] - %m'
            }
        },
        access: {
            type: 'file',
            filename: 'logs/dongrui_access',
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log',
            layout: {
                type: 'pattern',
                pattern: '[%d] [%p] - %m'
            }
        }
    },
    categories: {
        default: { appenders: ['access', 'dongrui_node'], level: 'debug' },
        err: { appenders: ['error', 'dongrui_node'], level: 'error' },
        access: { appenders: ['access'], level: 'debug' }
    }
});

export const Logger = log4js.getLogger();
