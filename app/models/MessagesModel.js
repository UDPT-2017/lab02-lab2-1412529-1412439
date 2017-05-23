const pg=require("./connectDB");

var messagesModel={
  load_messages: function(req,res){
      var count=0;
      var flag1=true,flag2=true,flag3=true;
      var data_final={};
      var data2=[];
      var data=[];
      var user_send=[],user_receive=[];
      var send_receive=[];
        var send=[],receive=[];
      if(req.session.user){
        pg.connect(function(err, client,done) {
          if(err){
            flag1=false;
            flag2=false;
            flag3=false;

             console.log(err);
           }
           else{

            console.log("connect to postgres");
            var query="select * from users";
            client.query(query, function (err, result) {
              done();
              if(err){
                console.log(err);
                flag1=false;
              }
              else{
              for(var i=0;i<result.rows.length;i++){
                if(result.rows[i].email!=req.session.user){
                data.push(result.rows[i].email);
              }

              }
              data_final.user=data;
              flag1=false;
              count=count+1;
            }


            });
          var query1="select * from friend where user1='"+req.session.user+"'or user2='"+req.session.user+"'";
            client.query(query1, function (err, result) {
              done();
              if(err){
                console.log(err);
                flag2=false;
              }
              else{
                console.log("sucess");
              for(var i=0;i<result.rows.length;i++){
                if(result.rows[i].user1==req.session.user){
                  data2.push(result.rows[i].user2)
                }
                else{
                  data2.push(result.rows[i].user1);
                }
                data_final.friend=data2;
              }
              data_final.friend=data2;
              flag2=false;
              count=count+1;
            }
          });
        var query2="select * from messages where user1='"+req.session.user+"'or user2='"+req.session.user+"'";
        client.query(query2, function (err, result) {
          done();
          if(err){
            console.log(err);
            flag3=false;
          }
          else{
            console.log("sucess");

          for(var i=0;i<result.rows.length;i++){
            if(result.rows[i].user1==req.session.user){
              user_send.push(result.rows[i].user2)
              send.push(result.rows[i].message)
            }
            else{
              user_receive.push(result.rows[i].user1);
              receive.push(result.rows[i].message);
            }

            data_final.send=send;
            data_final.receive=receive;
            data_final.user_send=user_send;
            data_final.user_receive=user_receive;

          }

          data_final.send=send;
          data_final.receive=receive;
          data_final.user_send=user_send;
          data_final.user_receive=user_receive;

          flag3=false;
          count=count+1;
        }


      });



    }

         });
         while(flag1||flag2||flag3) {require('deasync').sleep(10);}
         console.log(data_final);
         if(count==3){
         res.end(JSON.stringify(data_final));
       }
       else{
         res.end("1");
       }
      }
      else{
        res.end("0");
      }


  },
  update_messages: function(req,res){
    var check=false;
    var flag=true;
    pg.connect(function(err, client,done) {
      if(err){
        flag=false;
         console.log(err);
       }
       else{
        console.log("connect to postgres");
        var query="update messages set message='{"+'"'+req.body.data+'","'+req.body.time1+'","'+req.body.time2+'","'+req.body.status+'"'+"}'"+" where user1='"+req.body.user+"' and user2='"+req.session.user+"' and message[2]='"+req.body.time1+"'";
        console.log(query);
          client.query(query, function (err, result) {
            done();
          if(err){
            flag=false;
            console.log(err);


          }
          else{
            flag=false;
            console.log("sucess");
            check=true;
          }
        });


    }

     });
     while(flag) {require('deasync').sleep(10);}
     if(check==true){
       res.end("1");

     }
     else{
       res.end("0");
     }
  },
  send_messages:function(req,res){
    var check=false;
    var flag=true;
    pg.connect(function(err, client,done) {
      if(err){
        flag=false;
         console.log(err);
       }
       else{
        console.log("connect to postgres");
        var query="insert into messages values('"+req.session.user+"','"+req.body.user+"','"+"{"+'"'+req.body.data+'","'+req.body.time+'","","1"}'+"')";
        console.log(query);
          client.query(query, function (err, result) {
            done();
          if(err){
            flag=false;
            console.log(err);


          }
          else{
            flag=false;
            console.log("sucess");
            check=true;
          }
        });


    }

     });
     while(flag) {require('deasync').sleep(10);}
     if(check==true){
       res.end("1");

     }
     else{
       res.end("0");
     }
  },
}
module.exports=messagesModel;
