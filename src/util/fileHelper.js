import fs from 'fs'

export const readFile = async (url) => {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                reject(error)
            }
            resolve(data)
        })
    })

}
