/** Chain of Responsibility Pattern **/

/** Chain **/
const Chain = function (handler) {
    this.handler = handler;
    this.nextHandler = null;
}

Chain.prototype.setNextHandler = function (nextHandler) {
    this.nextHandler = nextHandler;
    return nextHandler;
}

Chain.prototype.pass = function (...args) {
    const result = this.handler(...args);
    if (result === 'next') {
        return this.nextHandler && this.nextHandler.pass(...args);
    }
    return result;
}

/** Handlers **/
const equalTen = function (number) {
    return (number === 10) ? 'equal-ten' : 'next';
}

const equalTwenty = function (number) {
    return (number === 20) ? 'equal-twenty' : 'next';
}

const equalThirty = function (number) {
    return (number === 30) ? 'equal-thirty' : 'next';
}

/** Controller **/
const chainController = function (number) {
    const checkEqualTen = new Chain(equalTen);
    const checkEqualTwenty = new Chain(equalTwenty);
    const checkEqualThirty = new Chain(equalThirty);

    checkEqualTen
        .setNextHandler(checkEqualTwenty)
        .setNextHandler(checkEqualThirty);

    return checkEqualTen.pass(number);
};

//is problem, when external call him, always get null
console.log(chainController(10));
console.log(chainController(18));
console.log(chainController(30));
