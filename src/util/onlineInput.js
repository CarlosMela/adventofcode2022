import https from 'https'

const sessionCookie = ''

export const fetchInput = async (day, year = 2022) =>
    new Promise((resolve, reject) => {
        https.get(`https://adventofcode.com/${year}/day/${day}/input`,
            {
                headers: {
                    'Content-Type': 'text/plain',
                    'Cookie': `session=${sessionCookie}`
                }
            },
            res => {
                let data = []
                res.on('data', chunk => {
                    data.push(chunk)
                })
                res.on('end', () => {
                    resolve(data.toString().slice(0, -1))
                })
            })
            .on('error', err => {
                console.error('Error: ', err.message)
                reject(err.message)
            })
    })


