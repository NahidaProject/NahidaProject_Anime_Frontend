type BusClass = {
    // 传入
    emit: (name: string) => void
    // 传出
    on: (name: string, callback: Function) => void
    // 销毁
    // 这个建议加上, 组件频繁挂载会导致事件多次触发
    off: () => void
}

type PramsKey = string | number | symbol

type List = {
    [key: PramsKey]: Array<Function>
}

class Bus implements BusClass {
    list: List

    constructor() {
        this.list = {}
    }

    emit(name: string, ...args: Array<any>) {
        let eventName: Array<Function> = this.list[name]
        eventName.forEach(fn => {
            fn.apply(this, args)
        })
    }

    on(name: string, callback: Function) {
        let fn: Array<Function> = this.list[name] || []
        fn.push(callback)
        this.list[name] = fn
    }

    off(){
        this.list = {}
    }
}

export default new Bus()