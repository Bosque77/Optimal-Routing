/* eslint-disable @typescript-eslint/no-unsafe-argument */
const info = (...params: any[]) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...params)
    }
}

const error = (...params: any[]) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.error(...params)
    }
}

export default {
    info, error
}