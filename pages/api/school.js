import executeQuery from "../../source/db";
import NextCors from 'nextjs-cors'

async function handler(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccesStatus: 200,
    })

    if(req.method === "PUT") {
        const {idx, title} = req.body
        if(!idx || !title){
            res.status(422).json({message: "Invalid data"})
            return;
        }
await executeQuery(`UPDATE school SET title = '${title}' WHERE idx = '${idx}'`)
res.status(201).json({message: "Data deleted!"})
return;
    }

    if(req.method === "DELETE") {
        const {idx} = req.body
        if(!idx){
            res.status(422).json({message: "Invalid data"})
            return;
        }
await executeQuery(`DELETE FROM school WHERE idx = '${idx}'`)
res.status(201).json({message: "Data deleted!"})
return;
    }

if(req.method === "POST") {
    const {idx} = req.body
    if(!idx){
        res.status(422).json({message: "Invalid data"})
        return;
    }
    const data = await executeQuery(`INSERT INTO school(idx) VALUES('${idx}')`)
    res.status(201).json({message: "Data created!", data})
    return;
}

if(req.method === "GET") {
const data = await executeQuery(`SELECT * FROM school WHERE idx = '${idx}'`)
res.status(201).json({message: "Data fetch", data})
return;
}
else{
    res.status(500).json({message: "Route not valid"})
}
}

export default handler;