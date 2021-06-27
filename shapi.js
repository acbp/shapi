const http = require('http')
const util = require('util')
const url = require('url')
const exec = util.promisify(require('child_process').exec)
const server = http.createServer((q,r)=>{
    let data = `Error ${r.method}`;
    const command = `${url.parse(q.url).pathname.slice(1)||"echo"}`;
    data ='';
    q.on('data',(c)=> data+=c )
    q.on('end',async()=>{
        try{
            console.log(`Running ${command}:\n<${data}`)
            data = JSON.parse(data)
            console.log(`exec('${command} ${JSON.stringify(data)}')`)
            data = await exec(`${command} ${Object.values(data).map(s=>s).join(' ')}`,{shell:true})
            if(data.stderr) throw new Error(data.stderr);
            console.log(`>${data.stdout}`)
        }
        catch(e){ console.error(e) }
            r.end(JSON.stringify({data}))
    })
})
server.listen(1337,()=> console.log('[0.0.0.0:1337] running'))
