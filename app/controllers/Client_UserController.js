$(document).ready(function(){
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
         arr=data.split(",");
        for(var i=0;i<arr.length;i++){
          var str="<div class='wrap'><div class='decorate'>"+arr[i]+"</div><div class='wrap_button'><button class='btn-primary' id="+ i+">addfriend"+"</button></div></div>";
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
            ///////////////////////////////////////////////////
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
              //  console.log("error");
                console.log(textStatus);
                console.log(errorThrown);
              }

                      });
            ///////////////////////////////////////////////////


        }
        else{
          var data={};
          data.user=arr[id];
          ///////////////////////////////////////////////////
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
            //  console.log("error");
              console.log(textStatus);
              console.log(errorThrown);
            }

                    });
        }
          //alert(x);
        })
      }
      }//alert(data);
      },
  error:function(jqXHR,textStatus,errorThrown){
  //  console.log("error");
    console.log(textStatus);
    console.log(errorThrown);
  }

});
/*alert(arr);
if(arr!="0"){

  //var arr=["meo con","thong xin","xin beo","meo bach","hoa nguyen","khong ten","my hoa"];
  for(var i=0;i<arr.length;i++){
    var str="<div class='wrap'><div class='decorate'>"+arr[i]+"</div><div class='wrap_button'><button class='btn-primary' id="+ i+">add friend"+"</button></div></div>";
      $(".divv").append(str);
  }
for(var i=0;i<arr.length;i++){
  var x="#"+i;
  $(x).click(function(){
    console.log($(this).attr('id'));
    if($(this).html()=="add friend"){
    $(this).html('unfriend');
  }
  else{
    $(this).html('add friend');
  }
    //alert(x);
  })
}
}
*/
});
