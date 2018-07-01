import DP from './DataPersistence';


/**
 * 通信消息管理器。使得UI层可以专注于发起消息、接受消息处理结果并响应，而无需关心数据具体的持久化
 */
class Messager {

    //消息与promise的映射
    static mapPromise = {}


    constructor() {

    }

    /**
     * 发送消息事件
     * @param msg   消息名
     * @param data  数据
     */
    trigger(msg, req) {
        let fun = DP.getAction(msg);
        if (typeof fun === 'function') {

            let result = fun(req);
            // 如果是一个Promise对象,异步返回
            if (result && result.then !== undefined) {
                result.then((res) => {
                    Messager.mapPromise[msg] && Messager.mapPromise[msg].forEach((callback) => {
                        try {
                            callback(req, res);
                        } catch (e) {
                            console.log(e);
                        }
                    });
                }).catch((e) => {
                    console.log(e)
                });
            } else { //否则是同步的，直接返回
                Messager.mapPromise[msg] && Messager.mapPromise[msg].forEach((callback) => {
                    try {
                        callback(req, result);
                    } catch (e) {
                        console.log(e);
                    }
                });
            }

        } else {
            throw '[' + msg + ']消息事件在数据持久器还没有处理函数！';
        }
    }

    /**
     * 监听消息事件的广播及数据
     * @param msg       消息名
     */
    on(msg, callback) {

        if (!Messager.mapPromise[msg]) {
            Messager.mapPromise[msg] = new Map();
        }
        let key = Symbol();
        Messager.mapPromise[msg].set(key, callback);
        return key;
    }

    /**
     * 解绑事件
     * @param {*number} id 引用id
     */
    off(id) {
        Object.values(Messager.mapPromise).forEach((map) => {
            map.delete(id);
        })
    }
}

//使用window挂载来确保绝对唯一
let instance = null;
if (!window._eldInstanceMessager) {
    instance = new Messager();
    instance.map = Messager.mapPromise;
    window._eldInstanceMessager = instance;
}


export default window._eldInstanceMessager;