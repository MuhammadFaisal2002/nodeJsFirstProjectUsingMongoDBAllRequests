const fs = require('fs')
function logReqRes(filename) {
    return (req, res, Next) => {
        fs.appendFile(filename, `\n${Date.now}:${req.ip} ${req.method}: ${req.path}\n`, (err, data) => { Next() })
    }
}
module.exports = {logReqRes,}