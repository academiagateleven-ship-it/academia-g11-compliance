/* Builds the public login shell; original Sites files remain unchanged. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'), out=path.join(__dirname,'public'), assets=path.join(__dirname,'protected');
const base='/academia-g11-compliance/', release='c13ba103-pages-1';
fs.mkdirSync(out,{recursive:true});fs.mkdirSync(assets,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.pdf':'application/pdf','.zip':'application/zip','.svg':'image/svg+xml'};
const manifest={};
function walk(dir,rel=''){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const name=rel+e.name;if(e.isDirectory()){walk(path.join(dir,e.name),name+'/');continue;}let data=fs.readFileSync(path.join(dir,e.name));if(name.endsWith('.html')){let html=data.toString('utf8');html=html.replace(/((?:href|src)=["'])\/(?!\/)/g,'$1'+base);html=html.replace(/<head>/i,'<head><script src="'+base+'bridge.js"></script>');data=Buffer.from(html);}const target=path.join(assets,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data);manifest[name]={size:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex'),mime:mime[path.extname(name)]||'application/octet-stream'};}}
walk(path.join(root,'dist'));
fs.writeFileSync(path.join(__dirname,'asset-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const config={base,release,api:'https://gdwhcjwenuwloglivgis.supabase.co',key:'sb_publishable_jH55QRFAcJDT_0HcNkIK0Q_Q1RvmyFC',bucket:'g11-hub-assets'};
for(const file of ['gateway.js','sw.js','bridge.js']){let s=fs.readFileSync(path.join(__dirname,file),'utf8').replace('__CONFIG__',JSON.stringify(config)).replace('__MANIFEST__',JSON.stringify(manifest));new (require('node:vm').Script)(s,{filename:file});fs.writeFileSync(path.join(out,file),s);}
const html=fs.readFileSync(path.join(__dirname,'entry.html'),'utf8');for(const name of ['index.html','entry.html','404.html'])fs.writeFileSync(path.join(out,name),html);
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log(JSON.stringify({files:Object.keys(manifest).length,bytes:Object.values(manifest).reduce((n,f)=>n+f.size,0),release,publicFiles:fs.readdirSync(out)}));
