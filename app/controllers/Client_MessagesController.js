$(document).ready(function(){
  $("#form_send").hide();
  var user;
$.ajax({
  type: 'POST',
  url: '/load_messages',
  success: function(data) {
        if(data=="0"){
          alert("Please login!");
          user="0";
        }
        else{
        //user=data.split(",");
      var a=JSON.parse(data);
      ////////////////////////////////
      $("#new_messages").click(function(){
        $('#modal_sendmessages').modal('show');
      //  $("#form_send").show();
        for(var i=0;i<a.friend.length;i++){
          var str="<option>"+a.friend[i]+"</option>";
          $("#select_user").append(str);
        }
        //////////////////////////////////////////////////////

        /////////////////////////////////////////////////////
      });
      //////////////////////////////
      //var a=[["hoa","an com chua","17:00 15/05/2017","","1"],["lieu","lam j do t khong biet m la ai nhung hay de t yen","18:00 16/05/2017","19:05 16/05/2017","0"],["hoa","thuong em","20:34 18/05/2017","","1"]];
    for(var i=0;i<a.receive.length;i++){
      var str="<div class='layout' id="+i+"><div class='from'>From:"+a.user_receive[i]+"</div><div class='timereceived'>time received:"+a.receive[i][1]+"</div><div class='timeseen' id='time_seen'>time seen:"+a.receive[i][2]+"</div></div>";
      //console.log(str);
      $(".divvv").append(str);
      var x="#"+i;
      if(a.receive[i][2]==""){
        $(x).css('background-color', '#66ccff');
      }
      $(x).click(function(){
        var j=$(this).attr('id');
    $('#myModal_receive').modal('show');
    $("#content").text(a.receive[j][0]);
    var y="#"+j;
    if(a.receive[j][2]==""){

        $(y).css('background-color', ' green');
        ///////////////////////////////////////
        var mydata={};
        var time=new Date();
        var str=time.getHours()+":"+time.getMinutes()+" "+time.getDate()+"/"+(time.getMonth()+1)+"/"+time.getFullYear();
        mydata.user=a.user_receive[j];
        mydata.data=a.receive[j][0];
        mydata.time1=a.receive[j][1];
        mydata.time2=str;
        mydata.status="0";
        console.log(mydata);
        var str1="time seen:"+str;
        $("#time_seen").text(str1);

        $.ajax({
          type: 'POST',
          data: JSON.stringify(mydata),
          contentType: 'application/json',
          url: '/update_message',
          success: function(data) {
              if(data=="1"){
                console.log("sucess");
              }
              },
          error:function(jqXHR,textStatus,errorThrown){
          //  console.log("error");
            console.log(textStatus);
            console.log(errorThrown);
          }

                  });
        ///////////////////////////////////////
    }

      });
    }
    //  for(var i=0;i<x.user.length;i++){
      //  console.log("data "+x.user[i]);
    //  }
      }//alert(data);
      },
  error:function(jqXHR,textStatus,errorThrown){
  //  console.log("error");
    console.log(textStatus);
    console.log(errorThrown);
  }

});
if(user!="0"){

}
$("#send_message").click(function(){
  var mydata={};
  var conceptName = $('#select_user').find(":selected").text();
  mydata.user=conceptName;
  mydata.data=$("#content_send").val();
  //console.log(data_send);
  //////////////////////////////////////////////////////
  //var mydata={};
  var time=new Date();
  var str=time.getHours()+":"+time.getMinutes()+" "+time.getDate()+"/"+(time.getMonth()+1)+"/"+time.getFullYear();
  mydata.time=str;
  console.log(mydata);
  $.ajax({
    type: 'POST',
    data: JSON.stringify(mydata),
    contentType: 'application/json',
    url: '/send_messages',
    success: function(data) {
        if(data=="1"){
          console.log("sucess");
        }
        },
    error:function(jqXHR,textStatus,errorThrown){
    //  console.log("error");
      console.log(textStatus);
      console.log(errorThrown);
    }

            });
  //////////////////////////////////////////////////////
    $('#modal_sendmessages').modal('hide');
});
});
