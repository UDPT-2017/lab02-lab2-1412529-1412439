$(document).ready(function(){
  $("#nav_users").css('background-color', '#996633');
  var arr=[];
$.ajax({
  type: 'POST',
  url: '/load_user',
  success: function(data) {
        if(data=="0"){
          alert("Please login!");
          arr="0";
        }
        else{

          var x=JSON.parse(data);
          for(var i=0;i<x.user.length;i++){
            console.log("data "+x.user[i]);
          }
          arr=x.user.slice();
          var friend=x.friend.slice();

        for(var i=0;i<arr.length;i++){
          var flag=false;
          var str="";

          for(var j=0;j<friend.length;j++){
            if(arr[i]==friend[j]){
              flag=true;
            }
          }
          if(flag==true){
            str="unfriend";
          }
          else{
            str="addfriend";
          }

          var str="<div class='wrap'><div class='decorate'>"+arr[i]+"</div><div class='wrap_button'><button class='btn-primary' id="+ i+">"+str+"</button></div></div>";
            $(".divv").append(str);
        }
      for(var i=0;i<arr.length;i++){
        var x="#"+i;
        $(x).click(function(){
          var id=$(this).attr('id');
          console.log(arr[id]);
          if($(this).html()=="addfriend"){
            var data={};
            data.user=arr[id];

            $.ajax({
              type: 'POST',
              data: JSON.stringify(data),
              contentType: 'application/json',
              url: '/add_friend',
              success: function(data) {
                    console.log('success');
                    if(data=="1"){
                      var idd="#"+id;
                        $(idd).html('unfriend');
                    }
                    else{
                      alert("can't add friend");
                    }
                  },
              error:function(jqXHR,textStatus,errorThrown){
                console.log("error add_friend");
                console.log(textStatus);
                console.log(errorThrown);
              }

                      });



        }
        else{
          var data={};
          data.user=arr[id];

          $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/un_friend',
            success: function(data) {
                  console.log('success');
                  if(data=="1"){
                    var idd="#"+id;
                      $(idd).html('addfriend');
                  }
                  else{
                    alert("can't unfriend");
                  }
                },
            error:function(jqXHR,textStatus,errorThrown){
              console.log("error un_friend");
              console.log(textStatus);
              console.log(errorThrown);
            }

                    });
        }

        })
      }
      }
      },
  error:function(jqXHR,textStatus,errorThrown){
    console.log("error load_user");
    console.log(textStatus);
    console.log(errorThrown);
  }

});

});
