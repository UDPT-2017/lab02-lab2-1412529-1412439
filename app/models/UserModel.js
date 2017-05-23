const pg=require("./connectDB");

var userModel={
  count:0,
  user_name:[],
  register:function(req,res){
    var result1="";


    var flag=true;

    pg.connect(function(err, client,done) {
      if(err){
        flag=false;
        result1="khong ket noi duoc database";
         console.log(err);
       }
       else{

        console.log("connect to postgres");

        var query="INSERT INTO USERS VALUES('"+req.body.email+"','"+req.body.password+"','"+req.body.user_name+"','"+req.body.phone+"');";
        console.log(query);
        client.query(query, function (err, result) {
            done();
            if (err) {

              result1="dang ky that bai";
              flag=false;

            }
            else{
              result1="dang ky thanh cong";
              flag=false;

            }

        });


}

     });

       while(flag) {require('deasync').sleep(10);}
       res.end(result1);





  },
  login:function(req,res){
        var result1=0;


        var flag=true;

        pg.connect( function(err, client,done) {
          if(err){
            flag=false;
             console.log(err);
           }
           else{

            console.log("connect to postgres");

            var query="select * from users where email='"+req.body.email+"' and password='"+req.body.password+"'";
            console.log(query);
            client.query(query, function (err, result) {
                done();
                if (err) {

                  result1=0;
                  flag=false;

                }
                else{
                  if(result.rows[0]==undefined){

                    result1=0;
                    flag=false;
                  }
                  else{

                  req.session.user=req.body.email;
                  result1=1;
                  flag=false;
                }

                }

            });


    }

         });

           while(flag) {require('deasync').sleep(10);}
           res.end(result1.toString());
           console.log(flag);

  },
  load_user:function(req,res){
    var count=0;
    var flag1=true,flag2=true;
    var data_final={};
    var data2=[];
    var data=[];
    if(req.session.user){
      pg.connect( function(err, client,done) {
        if(err){
          flag1=false;

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
          //console.log(query1);
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
    pg.connect( function(err, client,done) {
      if(err){
        flag1=false;
        //flag2=false;
         console.log(err);
       }
       else{
        //res.send(JSON.stringify(req.body));
        console.log("connect to postgres");
      var  query="insert into friend(user1,user2) values('"+req.session.user+"','"+req.body.user+"')";

        client.query(query, function (err, result) {
          done();
    if(err){
      flag1=false;

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
    pg.connect( function(err, client,done) {
      if(err){
        flag1=false;

         console.log(err);
       }
       else{

        console.log("connect to postgres");
      var query="delete from friend where (user1='"+req.session.user+"' and user2='"+req.body.user+"') or (user1='"+req.body.user+"' and user2='"+req.session.user+"')";
        console.log(query);

        client.query(query, function (err, result) {
          done();
    if(err){
      flag1=false;

      console.log(err);
    }
    else{
      flag1=false;
      count=count+1;
      console.log("sucess");
    }


        });


        var query="delete from messages where (user1='"+req.session.user+"' and user2='"+req.body.user+"') or (user1='"+req.body.user+"' and user2='"+req.session.user+"')";
          console.log(query);

          client.query(query, function (err, result) {
            done();
      if(err){
        flag2=false;

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



     while(flag1) {require('deasync').sleep(10);}

     if(count==2){

     res.end("1");
   }
   else{
     res.end("0");
   }
 },

}
module.exports=userModel;
