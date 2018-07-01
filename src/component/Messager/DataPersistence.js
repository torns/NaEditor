/**
 * 数据持久器。负责数据的保存及响应
 */
class DataPersistence{

    constructor(){

    }

    static action = {
        xxx1: ()=>{},
        xxx2: ()=>{}
    }

    /**
     * 给数据持久单元增加行为处理函数。如果有覆盖之前的行为处理函数，为给出警告
     * @param data  {xxx: function(){return promise}, ...}  行为处理函数必须返回一个promise对象
     */
    addAction(data){
        if(data){
            for(let name in data){
                if(DataPersistence.action[name]){
                    console.error('警告：覆盖了一个名为[' + name + ']的行为处理函数');
                }
                DataPersistence.action[name] = data[name];
            }
        }
    }

    /**
     * 通过名字获取行为处理函数
     * @param name
     * @returns {*}
     */
    getAction(name){
        return DataPersistence.action[name];
    }

} 

//使用window挂载来确保绝对唯一
let instance = null;
if(!window._eldInstanceDataPersistence){
    instance = new DataPersistence();
    window._eldInstanceDataPersistence = instance;
}

export default window._eldInstanceDataPersistence;
