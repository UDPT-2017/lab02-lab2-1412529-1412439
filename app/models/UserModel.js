var pg=require("pg");
//var controllers1=require("../controllers");
////////////////////////////////////////////
pg.defaults.ssl = true;
var controllers=require("../controllers")
var url="postgres://rwqofhotvaiztw:189237b5372f6aa2d15585cd06b0a0224d86c2cd3bef54e048ca2b55c2f60a6b@ec2-23-23-111-171.compute-1.amazonaws.com:5432/d8orgaldunjm6c";
////////////////////////////////////////////
var userModel={
  count:0,
  user_name:[],
  register:function(req,res){
    var result1="";
    //res.send("12313");

    var flag=true;
    console.log(req.body);
    var url="postgres://rwqofhotvaiztw:189237b5372f6aa2d15585cd06b0a0224d86c2cd3bef54e048ca2b55c2f60a6b@ec2-23-23-111-171.compute-1.amazonaws.com:5432/d8orgaldunjm6c";
   //res.send(req.body);
  // res.send(req.body.email);
    pg.connect(url, function(err, client) {
      if(err){
         console.log(err);
       }
       else{
        //res.send(JSON.stringify(req.body));
        console.log("connect to postgres");
      //s  console.log(flag);
        var query="INSERT INTO USERS VALUES('"+req.body.email+"','"+req.body.password+"','"+req.body.user_name+"','"+req.body.phone+"');";
        console.log(query);
        client.query(query, function (err, result) {
          //  done();
            if (err) {
              //res.send("meo meo");
              result1="dang ky that bai";
              flag=false;
              //console.log(result);
            }
            else{
              result1="dang ky thanh cong";
              flag=false;
              //console.log("thong");
            }

        });


}

     });

       while(flag) {require('deasync').sleep(10);}
       res.end(result1);
      // console.log(flag);
       //console.log(result1);




  },
  login:function(req,res){
  //userModel.count=userModel.count+1;
    //console.log("number login"+userModel.count);
    //console.log(controllers.home);
        var result1=0;
        //res.send("12313");

        var flag=true;
        //console.log(req.body);
        //var url="postgres://rwqofhotvaiztw:189237b5372f6aa2d15585cd06b0a0224d86c2cd3bef54e048ca2b55c2f60a6b@ec2-23-23-111-171.compute-1.amazonaws.com:5432/d8orgaldunjm6c";
       //res.send(req.body);
      // res.send(req.body.email);
        pg.connect(url, function(err, client) {
          if(err){
             console.log(err);
           }
           else{
            //res.send(JSON.stringify(req.body));
            console.log("connect to postgres");
          //s  console.log(flag);
          //  var query="INSERT INTO USERS VALUES('"+req.body.email+"','"+req.body.password+"','"+req.body.user_name+"','"+req.body.phone+"');";
            var query="select * from users where email='"+req.body.email+"' and password='"+req.body.password+"'";
            console.log(query);
            client.query(query, function (err, result) {
              //  done();
                if (err) {
                  //res.send("meo meo");
                  result1=0;
                  flag=false;
                  //console.log(result);
                }
                else{
                  if(result.rows[0]==undefined){

                    result1=0;
                    flag=false;
                  }
                  else{
                    //controllers.home.login=true;
                  req.session.user=req.body.email;
                  result1=1;
                  flag=false;
                }
                  //console.log("thong");
                }

            });


    }

         });

           while(flag) {require('deasync').sleep(10);}
           res.end(result1.toString());
           console.log(flag);
           //console.log(result1.toString());
  },
  load_user:function(req,res){
    var count=0;
    var flag1=true,flag2=true;
    var data_final={};
    var data2=[];
    var data=[];
    if(req.session.user){
      pg.connect(url, function(err, client) {
        if(err){
          flag1=false;
        //  flag2=false;
          res.end();
           console.log(err);
         }
         else{
          //res.send(JSON.stringify(req.body));
          console.log("connect to postgres");
        //s  console.log(flag);
        //  var query="INSERT INTO USERS VALUES('"+req.body.email+"','"+req.body.password+"','"+req.body.user_name+"','"+req.body.phone+"');";
          var query="select * from users";
        //  console.log(query);
          client.query(query, function (err, result) {
            if(err){
              console.log(err);
              flag1=false;
              res.end();
            }
            else{
            for(var i=0;i<result.rows.length;i++){
              //console.log(result.rows[i].email);
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
          //console.log(query1);
          client.query(query1, function (err, result) {
            if(err){
              console.log(err);
              flag2=false;
              res.end();
            }
            else{
              console.log("sucess");

            //  console.log(result.rows.length);
            for(var i=0;i<result.rows.length;i++){
              if(result.rows[i].user1==req.session.user){
                data2.push(result.rows[i].user2)
              }
              else{
                data2.push(result.rows[i].user1);
              }

            //  console.log(result.rows[i].user1);

              //console.log(result.rows[i].user2);
              //data.push(result.rows[i].email);
            }
            data_final.friend=data2;
            //data_final.list_friend=data2;
            //console.log(data_final);
            flag2=false;
            count=count+1;
          }


        });


  }

       });
       while(flag1||flag2) {require('deasync').sleep(10);}
       console.log(data_final);
       if(count==2){
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
  add_friend:function(req,res){
    var count=0;
    var flag1=true,flag2=true;
    pg.connect(url, function(err, client) {
      if(err){
        flag1=false;
        //flag2=false;
         console.log(err);
       }
       else{
        //res.send(JSON.stringify(req.body));
        console.log("connect to postgres");
      //s  console.log(flag);
      //  var query="INSERT INTO USERS VALUES('"+req.body.email+"','"+req.body.password+"','"+req.body.user_name+"','"+req.body.phone+"');";
        //var query="create table messages (user1 text,user2 text,message text[][],primary key(user1,user2))";
      //  var query="insert into messages values('thong','beo','{{"+'"we","12:05"},'+'{"mai di hoc","15:00"}'+"}')";
      var  query="insert into friend(user1,user2) values('"+req.session.user+"','"+req.body.user+"')";
        console.log(query);
      //  console.log(query);
        client.query(query, function (err, result) {

    if(err){
      flag1=false;
    //  flag2=false;
      console.log(err);
    }
    else{
      flag1=false;
      count=count+1;
      console.log("sucess");
    }


        });



    }

     });
     while(flag1) {require('deasync').sleep(10);}
     console.log(count);
     if(count==1){
     res.end("1");
   }
   else{
     res.end("0");
   }
 },
  un_friend:function(req,res){
    var count=0;
    var flag1=true,flag2=true;
    pg.connect(url, function(err, client) {
      if(err){
        flag1=false;
        flag2=false;
         console.log(err);
       }
       else{
        //res.send(JSON.stringify(req.body));
        console.log("connect to postgres");
      //s  console.log(flag);
      //  var query="INSERT INTO USERS VALUES('"+req.body.email+"','"+req.body.password+"','"+req.body.user_name+"','"+req.body.phone+"');";
        //var query="create table messages (user1 text,user2 text,message text[][],primary key(user1,user2))";
      //  var query="insert into messages values('thong','beo','{{"+'"we","12:05"},'+'{"mai di hoc","15:00"}'+"}')";
      //var  query="insert into messages(user1,user2) values('"+req.session.user+"','"+req.body.user+"')";
      var query="delete from friend where (user1='"+req.session.user+"' and user2='"+req.body.user+"') or (user1='"+req.body.user+"' and user2='"+req.session.user+"')";
        console.log(query);
      //  console.log(query);
        client.query(query, function (err, result) {

    if(err){
      flag1=false;
      //flag2=false;
      console.log(err);
    }
    else{
      flag1=false;
      count=count+1;
      console.log("sucess");
    }


        });
        //////////////////////////////////////////////////////////////////////////////////////
        var query="delete from messages where (user1='"+req.session.user+"' and user2='"+req.body.user+"') or (user1='"+req.body.user+"' and user2='"+req.session.user+"')";
          console.log(query);
        //  console.log(query);
          client.query(query, function (err, result) {

      if(err){
        flag2=false;
        //flag2=false;
        console.log(err);
      }
      else{
        flag2=false;
        count=count+1;
        console.log("sucess");
      }


          });



    }

     });
     while(flag1||flag2) {require('deasync').sleep(10);}
    // console.log(count);
     if(count==2){
     res.end("1");
   }
   else{
     res.end("0");
   }
 },

}
module.exports=userModel;
