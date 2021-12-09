const SUCCESS_CODE = 200;
const SERVER_ERROR = 500;

const getIgnoreStatusCode = () => {
    const {RES_HALPER_IGNORE_STATUS_CODE} = process.env;
    return RES_HALPER_IGNORE_STATUS_CODE &&
        (RES_HALPER_IGNORE_STATUS_CODE === 'true' ||
            RES_HALPER_IGNORE_STATUS_CODE === true ||
            RES_HALPER_IGNORE_STATUS_CODE === 1 ||
            RES_HALPER_IGNORE_STATUS_CODE === '1')
}

const getErrorConsole = () => {
    const {RES_HALPER_ERR_CONSOLE} = process.env;
    return RES_HALPER_ERR_CONSOLE &&
        (RES_HALPER_ERR_CONSOLE === 'true' ||
            RES_HALPER_ERR_CONSOLE === true ||
            RES_HALPER_ERR_CONSOLE === 1 ||
            RES_HALPER_ERR_CONSOLE === '1')
}

const getDisableErrorStack = () => {
    const {RES_HALPER_DISABLE_ERR_STACK} = process.env;
    return RES_HALPER_DISABLE_ERR_STACK &&
        (RES_HALPER_DISABLE_ERR_STACK === 'true' ||
            RES_HALPER_DISABLE_ERR_STACK === true ||
            RES_HALPER_DISABLE_ERR_STACK === 1 ||
            RES_HALPER_DISABLE_ERR_STACK === '1')
}


const IGNORE_STATUS_CODE = getIgnoreStatusCode();
const ERR_CONSOLE = getErrorConsole();
const DISABLE_ERR_STACK = getDisableErrorStack();

const getStatusCode = (code) => {
    return IGNORE_STATUS_CODE ? SUCCESS_CODE : code;
}

module.exports = (req, res, next) => {
    res.data = (data, message = '') => {
        return res.status(getStatusCode((data && data.code) ? data.code : SUCCESS_CODE)).json({
            code: (data && data.code) ? data.code : SUCCESS_CODE,
            success: true,
            data,
            error: null,
            message
        });
    }

    res.message = (message, code = SUCCESS_CODE) => {
        if (message.constructor.name === 'String') {
            return res.status(getStatusCode(code || SUCCESS_CODE)).json({
                code: code || 200,
                success: code === SUCCESS_CODE,
                data: null,
                error: null,
                message
            });
        } else {
            return res.error(new Error(`Can not cast ${message.constructor.name} to String`), SERVER_ERROR)
        }
    }

    res.error = (error, code) => {
        code = error.code || code || SERVER_ERROR;
        if (error.constructor.name === 'Error' ||
            error.constructor.name === 'error' ||
            error.constructor.name === 'Object' ||
            error.constructor.name === 'object') {
            if (ERR_CONSOLE) {
                console.log(error);
            }
            return res.status(getStatusCode(code)).json({
                code: code,
                success: code === SUCCESS_CODE,
                data: null,
                error: {
                    message: error.message,
                    ...(DISABLE_ERR_STACK ? {} : {stack: error.stack}),
                },
                message: error.message
            });
        } else if (error.constructor.name === 'String') {
            return res.message(error, code);
        }
    }
    next();
}