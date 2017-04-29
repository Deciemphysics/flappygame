class AltArray extends Array {
    constructor() {
        super();
    }

    altMap(fn) {
        var newArr = [];
        for (let i = 0; i < this.length; i++) {
            var toAdd = fn(this[i]);
            if (toAdd) {
                newArr.push(toAdd);
            }
        }
        return newArr;
    }

    altEach(fn) {
        for (let i = 0; i < this.length; i++) {
            fn(this[i]);
        }
    }

    altReduce() {

    }
}