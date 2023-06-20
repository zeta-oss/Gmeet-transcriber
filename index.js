const express=require('express');
const ejs=require('ejs');
const path=require('path');
const axios=require('axios');
const cheerio=require('cheerio');
const app=express();
const fetch=require('node-fetch-commonjs');
const redislab=require('ioredis');
const fs=require('fs');
const {Configuration,OpenAIApi} =require("openai");
const {PubSub}=require('@google-cloud/pubsub');
const redis=require('redis');const { validateHeaderName } = require('http');

const openaikey=Buffer.from("c2stMHhHZmJPenVvQ1N1aTFmbnZXVnhUM0JsYmtGSmVwZm9WSFVzNTVFRkdOQU9xbUcz","base64").toString("utf8");

app.use(express.json());

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views/partials'));

app.use('/', express.static(__dirname));


  // Wait a while for the subscription to run. (Part of the sample only.)


const main=async(user)=>{
  

};  

const datauser=async(user,txt)=>{
  

};  

const getdata=async(user)=>{
  
};  

const config=new Configuration({
  apiKey: openaikey.split("==")[0]
});

const openai=new OpenAIApi(config);

const resp_ai=async (text)=>{
const response_ai=await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `Summarize the text and ignore the html tags and css : ${text}`,
  temperature: 1,
  max_tokens: 2000,
  top_p: 1, 
  frequency_penalty: 0.6,
  presence_penalty: 0.6,
})
return response_ai.data.choices;
};




const valid_ai=async (product)=>{
  const response_ai=await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Can you verify the information in this conversations and fill the gaps: ${product}`,
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0.6,
    presence_penalty: 0.6,
  },{
    timeout:19000
  })
  return response_ai.data.choices;
};


const checkfromlist=()=>{
  var config = {
    method: 'get',
    headers: { 
      'Authorization': 'Bearer ya29.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',
      'Content-Type':'application/json',
      'Accept-type':'application/json'
    }

  };
  (async()=>{
    await  fetch('https://gmail.googleapis.com/gmail/v1/users/preetish@zeta.tech/messages',config)
    .then(resp=>resp.json()).then(data=>{
      const msgs=data.messages;
     // console.log(`..........89guhgih8u${JSON.stringify(data)}`);
      let msgids=[];
    //  console.log(`2323232.${JSON.stringify(msgs)}`);
      for(var msg of msgs) {
        console.log(`HULURIIIIIII${JSON.stringify(msg)}`)
        msgids.push(msg.id);
      }
      console.log(`:::::::::::${msgids}`);
      return msgids;
    }).catch(err=>console.log(err));
  })();
  
};

const headercheck=(sendlist)=>{
  for(var i=0;i<sendlist.length;i++) {
    const v=sendlist[i];
    //console.log(v.name);
    if(v.name=="From" && v.value.toLowerCase().indexOf("briefly")>-1) {
      console.log(v.name);
       return true;
    }
    if(v.name.toLowerCase()=="Subject" && v.value.toLowerCase().indexOf("briefly")>-1) {
      console.log(v.name);
      return true;
    }
    
  };
  return false;
};

app.post("/messages",(req,resp)=>{
    var config = {
        method: 'get',
        headers: { 
          'Authorization': 'Bearer ya29.a0AWY7CknORE3N3D2yPqU0WHaMzbT8u_8UlmJHbXOa2Vc4K10RTdF3gxFFnLm9knr3a16gY6M7UWWMjwsXC1kCnmyG5IksD0CG1JEi9wcwLxTYCL1UYWBPC16BemuBpQSDN4CMeIYV5ktaqJ7ABXcOzRpsFqFvLAaCgYKAXwSARMSFQG1tDrpP1pHkP6QLdosdthKVDG7Zg0165',
          'Content-Type':'application/json',
          'Accept-type':'application/json'
        }

      };   
      
      console.log("conn mess");
      //const msgsid=checkfromlist();
      
      resp.status(200).send("Not here");
});

app.get('/index-path',(req,resp)=>{

 // const cname=req.query.name;
 console.log("entered ");
 let accestoken_config={
  method: 'post',
  headers: {
    
  }
 };
 var aconfig = {
  method: 'post',
  url: 'https://www.googleapis.com/oauth2/v3/token',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : {"refresh_token": "1//0gw-2cKaI_kblCgYIARAAGBASNwF-L9IriBG8yJYO6pJ_4eT0IaBwB5ozZHUjv_rpvxwnZRicRxdW0xzP2Pm0_RZcmomj6edq_Ng",
  "grant_type": "refresh_token",
  "client_id": "800001409252-9ohnikgcmjje4711trvps886fv5unp1a.apps.googleusercontent.com",
  "client_secret": "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",
  "expires_in": "6000"}
};

      
        axios(aconfig).then(token_json=>{var token=token_json.data;console.log(JSON.stringify(token));var config = {
          method: 'get',
          headers: { 
            'Authorization': `Bearer ${token.access_token}`,
            'Content-Type':'application/json',
            'Accept-type':'application/json'
          }
        
        };  
        (async()=>{ 
        await  fetch('https://gmail.googleapis.com/gmail/v1/users/preetish@zeta.tech/messages',config)
        .then(resp=>resp.json()).then(data=>{
          const msgs=data.messages;
         // console.log(`..........89guhgih8u${JSON.stringify(data)}`);
          let msgids=[];
        //  console.log(`2323232.${JSON.stringify(msgs)}`);
          for(var msg of msgs) {
           // console.log(`${JSON.stringify(msg)}`)
            msgids.push(msg.id);
          }
          console.log(msgids);
          for  (let id of msgids) {
            
            let flag=false;
            if(1==1) {
              fs.readFile('./transcript.csv','utf8',(err,data)=>{
                 if(2==2) {
                
              
            
             


           // console.log(`ksjdkjdhisdhisdi${id}`);
   ( async()=>{ await fetch(`https://gmail.googleapis.com/gmail/v1/users/preetish@zeta.tech/messages/${id}`,config)
      .then(response=>response.json()).then(data=>{
       // console.log(data);
        data=data.payload;
       // console.log("here header:"+JSON.stringify(data.headers));
      // console.log(headercheck(data.headers));
        if(headercheck(data.headers)==true) {
          flag=true;
          //console.log(JSON.stringify(data));
          //console.log(id);
        
       // console.log(data);
        const val=data["body"]["data"];
        
       let decodestring="";
       if(val) {
       let buff_obj=Buffer.from(val,"base64");
        decodestring=buff_obj.toString("utf8");
       }
       const $=cheerio.load(decodestring);
        console.log($);

        
        
        let tables=$("table:nth-child(1):nth-child(1):last-child:first-child:nth-child(1)");
        console.log(tables.length);
        tables=tables.toString();

        (async()=>{
          
          const results=await new redislab().lrange('users',0,-1);
          const user_data=new Map();
          results.forEach(val=>{
            user_data.set(val,"");
          });
          let last_name="",speech_text="";
          console.log(tables);
          results.forEach(val => {
            console.log(`Redis: ${val}`);  
              speech_text="";
              for(var i=0;i<tables.length-val.length;i++) {
                  let found_name=true;
                  if(tables[i]==val[0]) {
                    for(var j=0;j<val.length;j++) {
                      if(val[j]!=tables[i+j]) {
                          found_name=false;
                          break;
                      }
                    }
                   // console.log("FFOUND!");
                  }
                  if(found_name) {
                  //  console.log(`FOUND-${val}`);
                    const subtable=tables.substring(i);
                    if(subtable.split(":")[1]) {
                    const text_added=subtable.split(":")[1].replace(/(<([^>]+)>)/ig,'');
                    user_data.set(val,user_data.get(val)+text_added);
                    }
                  }

                  
                 
              }
          });
          var headers1=[],rows1=[];
          let htmlres=`<table cellspacing="1" cellpadding="1" style="border:2px solid black;"><tr>`;
          let headertable="";
          let rowsdata=`<tr>`;
          let rankdata=`<ul>`;
          let dval='';
          for(let [key,val] of user_data) {
            key=key.trim().replace(/ /ig,'');
            val=val.trim().replace(/[0-9]/ig,'');
           // val=val.trim().replace(/ /ig,'');
            val=val.trim().replace(/\n/g,'');
            val=val.trim().replace(/<\/?[^>]+(>|$)/ig,'');
            val=val.trim().replace(/background/ig,'');
            val=val.trim().replace(/[px][']/ig,'');
            val=val.trim().replace(/&nbsp;/g,'');
           val=val.substring(1000,Math.min(val.length,4000));

            console.log(`Here it is :    ${key}---${val}`);
            if(val.trim()!=""){
              val=val.trim();
            val=await resp_ai(val);
            val=val[0]["text"];
            await datauser(key,val);
            rankdata+=`<li>${key} has contributed - ${val.length}</li>`;
      //      const model=new OpenAIApi({temperature:0.9});

            //val=val;
            
            dval+=val+", ";
            console.log(val);
          //  console.log(val);
            headertable+=`<th>${key}</th>`;
            rowsdata+=`<td>${val}</td>`;
            console.log(`${key}----${val}`);
            headers1.push(`"${key}"`);
            rows1.push(`"${val}"`);
          
         // const openaimodel=new OpenAI();
        //  openaimodel.azureOpenAIApiKey="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";
         // const model=new OpenAI({temperature:0.9});
         rest_txt=val;

        /*  const template=`Can you verify the information in this conversations and fill the gaps: {product}`;
          const prompt=new PromptTemplate({template,inputVariables:["product"]}); 
          const chain=new LLMChain({llm:openai,prompt});
          const resd=await chain.call({product:dval});*/

          fs.writeFileSync('langchain.html',"<p>"+rest_txt[0]["text"]+"</p>",'utf8',(err)=>{
            if(err){
              console.log(err);
            }
          })
          headertable+="</tr>";
          rowsdata+=`</tr>`;
          htmlres=htmlres+headertable+rowsdata+"</table>";
          let ftxtres='';
          for(var i=0;i<headers1.length;i++) {
            ftxtres+=`${headers1[i]} : ${rows1[i]} == ${rows1[i].length}\n`;
          }
          const headersstr=headers1.join(",");
          const rowsstr=rows1.join(",");
          fs.writeFileSync(`empdata${ftxtres.length}.txt`,ftxtres,'utf8',(err)=>{
            if(err) {
              console.log(err);
            }
          });
          fs.writeFileSync(`transcribe${ftxtres.length}.html`,htmlres,'utf8',(err)=>{
            if(err){
              console.log(err);
            }
          });
          rankdata+="</ul>"
          fs.writeFileSync('rank.html',rankdata,'utf8',(err)=>{
            if(err){
              console.log(err);
            }
          });
          let csvrows=`${headersstr}\n${rowsstr}`;
          fs.writeFileSync(`transcript${ftxtres.length}.csv`,csvrows,'utf8',(err)=>{
            if(err) {
              console.log(err);
            }
          });

        }
        }

          
          
          //var content_type='text/csv';
          //var csvfile=new Blob([csvrows],{type:content_type});

          console.log("CSV file ready");
        
        })()
      }
      })
      .catch(function (error) {
        console.log(error);
        //resp.status(500).send(error);
      });
    })();
    console.log(flag);

  }
});
            }
    }
  }).catch(err=>console.log(err));
       })();
      }).catch(err=>console.log(err));
     


          
          resp.status(200).send(`Done`);
        

});

app.get("/table",(req,resp)=>{
  console.log("table");
  resp.status(200).sendFile(path.join(__dirname,'./transcribe..html'));
});

app.get("/user",async (req,resp)=>{
  const name=req.query.name;
  resp.status(200).send(await getdata(name));
});




app.get('/midpage',async (req,resp)=>{

  const name=req.query.name.replace(/%20/g,' ');
  console.log(JSON.stringify(req.body));
    
   


  resp.status(200).redirect(`/dashboard?name=${name}`);
});


app.get('/logout',async(req,resp)=>{

});

app.get("/dashboard", async (req,resp)=>{
  
  if(!(fs.existsSync('./empdata.txt'))) {
      resp.status(200).redirect('/login');
  }
  fs.readFile('./empdata.txt','utf8',(err,data)=>{
    if(err) {
      console.log(err);
    }  else {
      //console.log(data);
      let scores=[];
      const dataarr=data.split("\n");
      for(var i=0;i<Math.min(3,dataarr.length);i++) {
        const line=dataarr[i].split(":");
        //console.log(line);
        if(line.length==1) 
        {
          continue;
        }
        const lineres=line[1].split("==");
        const name=line[0];
       
        const text=lineres[0].trim();
        //console.log(text);
        scores.push([name,text]);
      }
      scores.sort((a,b)=>{
        return a[1].length>b[1].length;
      });
      console.log(`...${scores}`)
      const styles=["work","play","study"];
      resp.status(200).render('dashboard.ejs',{
        scores:scores,
        styles: styles
      });
    }
  });
  
    
});

app.get("/login",async (req,resp)=>{
  (async()=>{
    //await main(name);
    await axios.get("http://127.0.0.1:8098/index-path").then(data=>console.log(data)).catch(err=>console.log(err));
 })();
  resp.status(200).sendFile(path.join(__dirname,"./login.html"));
});

app.get("/page",(req,resp)=>{
  axios.get("http://127.0.0.1:8098/index-path").then(data=>console.log(data)).catch(err=>console.log(err));
  resp.status(200).sendFile(path.join(__dirname,'./index..html'));
});

app.get("/rank-data",(req,resp)=>{
  resp.status(200).sendFile(path.join(__dirname,'./rank..html'));
});

app.get("/langchain",(req,resp)=>{
  resp.status(200).sendFile(path.join(__dirname,'./langchain..html'));
});

app.get("/val", async (req,resp)=>{
 const redis=new redislab();
  const results=[];
  console.log(results.length);
  const user_data=new Map();
  (async()=>{results.forEach(async(val)=>{
    val=val.replace(/ /g,"");
    console.log(`....${val}`);
    const data=await redis.get(val).then(resp=>{console.log(resp);user_data.set(val,resp);}).catch(err=>console.log(err));
      
    
      
  });})().then(data=>{
  let scores=[];
  let tsum=0;
  console.log("hjjjjjjj");
  for(let [k,v] of user_data) {
    console.log(`....${k},${v}`);
    scores.push([k,v]);
    tsum+=v;
  }
  scores.sort((a,b)=>{
    return a[1]>b[1];
  });
  let rtext="<ul>";
  console.log(tsum);
  for(var i=0;i<scores.length;i++) {
    console.log(scores[i][1]);  
    const perc=parseFloat(scores[i][1]*100/tsum).toFixed(2);
    rtext+=`<li>${scores[i][0]} contributed ${perc}% in the meet</li>`;
  }
  rtext+="</ul>"
  setTimeout(()=>{
  resp.status(200).send(rtext);
  },22000);
}).catch(err=>resp.status(500).send(err));

});



app.get("/names",(req,resp)=>{
  const names=req.query.name.replace(/%20/g," ");
(async ()=>{
  await main(names);
})();
resp.status(200).send("Name registered");
});

const isthere=async(name)=>{
const namelist=[];
console.log(namelist.length)
namelist.forEach(val=>{
  if(val==name) {
    return false;
  }
});
return true;
};
app.listen(8098,(err)=>{
});
