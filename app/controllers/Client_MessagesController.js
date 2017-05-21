$(document).ready(function(){
  var user;
$.ajax({
  type: 'POST',
  url: '/load_user',
  success: function(data) {
        if(data=="0"){
          alert("Please login!");
          user="0";
        }
        else{
        user=data.split(",");
        console.log(user);
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

});
