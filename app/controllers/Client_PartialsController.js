
$(document).ready(function(){
  //////////////////////////////////////////
  $.ajax({
    type: 'POST',
    url: '/check_login',
    success: function(data) {
          console.log('success');
          if(data=="1"){
            $("#login_li").hide();
            $("#logout_li").show();
            $("#user_li").show();
          }
          //alert(data);
        },
    error:function(jqXHR,textStatus,errorThrown){
    //  console.log("error");
      console.log(textStatus);
      console.log(errorThrown);
    }

  });
  //////////////////////////////////////////


    $("#form_register").submit(function(e){



                var data = {};
      					data.email =$("#email").val();
      					data.password =$("#password").val();
                data.user_name=$("#user_name").val();
                data.phone=$("#phone").val();


      					$.ajax({
      						type: 'POST',
                  async:false,
                  data: JSON.stringify(data),
				          contentType: 'application/json',
                  url: '/register',
                  success: function(data) {
                        console.log('success');
                        alert(data);
                      },
                  error:function(jqXHR,textStatus,errorThrown){
                  //  console.log("error");
                    console.log(textStatus);
                    console.log(errorThrown);
                  }

                          });
    });
    /////////////////////////////////////////////////
    $("#form_login").submit(function(e){
      //alert("12333");
      $("#Modal_login").modal('hide');
    //  $("#loader").show();
    //  $('#loader').css('visibility', 'visible');
    login=true;
        e.preventDefault();


                var data = {};
      					data.email =$("#email_login").val();
      					data.password =$("#password_login").val();


      					$.ajax({
      						type: 'POST',
                  //async:false,
                  data: JSON.stringify(data),
				          contentType: 'application/json',
                  url: '/login',
                  success: function(data) {
                        //window.login=true;

                        console.log('success');
                        if(data=="1"){
                          window.location='/messages';
                          //alert("1233");

                        }
                        else{
                          alert("dang nhap that bai");
                        }
                      },
                  error:function(jqXHR,textStatus,errorThrown){
                  //  console.log("error");
                    console.log(textStatus);
                    console.log(errorThrown);
                  }

                          });
    });
    //////////////////////////////////////////////////
    $("#register_a").click(function(){
      $("#myModal").modal('show');
    });
    $("#login_a").click(function(){
      $("#Modal_login").modal('show');
    });
  //
  $("#logout_a").click(function(){
    $("#logout_li").hide();
    $("#login_li").show();
    $("#user_li").hide();
  });
    });
