import { RedisClient, createClient, Callback } from 'redis';
class CacheHelper {
    client: RedisClient;
    constructor(password: string) {
        this.client = createClient(6379, '127.0.0.1', {});
        if (password) {
            this.client.auth(password);
        }
    }
    put(cacheName: string, key: string, value: any, cb?: Callback<any>) {
        const str = JSON.stringify(value);
        this.client.hset(cacheName, key, encodeURIComponent(str), cb);
    }

    get(cacheName: string, key: string, cb: Callback<any>) {
        this.client.hget(cacheName, key, cb);
    }

    del(cacheName: string, key: string, cb: Callback<any>) {
        this.client.del(cacheName, key, cb);
    }
};
const cacheHelper = new CacheHelper('');
export default cacheHelper;