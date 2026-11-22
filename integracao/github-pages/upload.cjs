const fs=require('node:fs'),path=require('node:path'),readline=require('node:readline');
const root=__dirname,manifest=JSON.parse(fs.readFileSync(path.join(root,'asset-manifest.json'))),url='https://gdwhcjwenuwloglivgis.supabase.co/functions/v1/g11-pages-transfer';
if(process.stdin.isTTY)process.stdin.setRawMode(true);
const rl=readline.createInterface({input:process.stdin,terminal:false});
rl.once('line',async line=>{rl.close();const {secret,action,password,id}=JSON.parse(line),headers={'x-deploy-capability':secret};try{
if(action==='fixture-create'){const r=await fetch(url+'?action=fixture',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({password})});if(!r.ok)throw Error('fixture '+r.status);console.log(JSON.stringify(await r.json()));return;}
if(action==='fixture-delete'){const r=await fetch(url+'?action=fixture&id='+encodeURIComponent(id),{method:'DELETE',headers});if(!r.ok)throw Error('fixture cleanup '+r.status);console.log('Fixture removed.');return;}
const names=Object.keys(manifest).filter(n=>action!=='html-only'||n.endsWith('.html')),total=names.length;let count=0;async function worker(){while(names.length){const name=names.shift(),f=manifest[name],data=fs.readFileSync(path.join(root,'protected',name));const r=await fetch(url+'?name='+encodeURIComponent(name),{method:'POST',headers:{...headers,'Content-Type':f.mime},body:data});if(!r.ok)throw Error(name+' '+r.status);count++;if(count%12===0||count===total)console.log(JSON.stringify({uploaded:count,total}));}}
await Promise.all([worker(),worker()]);console.log('Upload complete.');
}catch(e){console.error(e.message);process.exitCode=1;}});
