const env = { PORT:process.env?.PORT || 1337, LOG:process.env?.LOG || 3 }
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
            if(env.LOG<6) console.log(`Running ${command}:\n<${data}`)
            data = data && JSON.parse(data) 
            if(env.LOG<6) console.log(`exec('${command} ${JSON.stringify(data)}')`)
            data = await exec(`${command} ${Object.values(data).map(s=>s).join(' ')}`,{shell:true}).catch(()=>'Error');
            if(data.stderr) throw new Error(data.stderr);

            //data = `"${data.stdout}"`
            if(env.LOG<6)console.log(`>${JSON.stringify(data)}`)
            r.end(JSON.stringify(data))
        }
        catch(e){ 
            if(env.LOG>4)console.error(e)
            data = 'An error has ocurred, expected a json.';
            r.end(data);
        }
    })
})
server.listen(env.PORT ,()=> console.log(`[::${env.PORT}] running`))
