import mysql from 'serverless-mysql'

const db = mysql({
    config: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    }
})

export default async function executeQuery(query) {
    try {
        const results = await db.query(query)
        await db.end()
        return results
    }
    catch (error) {
        return {error}
    }
}