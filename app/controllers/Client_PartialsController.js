
$(document).ready(function(){

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

        },
    error:function(jqXHR,textStatus,errorThrown){
      console.log("error of check_login");
      console.log(textStatus);
      console.log(errorThrown);
    }

  });



    $("#button_submit").click(function(e){

                e.preventDefault();
                var data = {};
      					data.email =$("#email").val();
      					data.password =$("#password").val();
                data.user_name=$("#user_name").val();
                data.phone=$("#phone").val();

                if(data.email==""||data.password==""||data.user_name==""||data.phone=="")
                {
                  alert("Vui long dien day du thong tin");
                }
                else{
      					$.ajax({
      						type: 'POST',
                  data: JSON.stringify(data),
				          contentType: 'application/json',
                  url: '/register',
                  success: function(data) {
                        //console.log('success');
                        alert(data);
                      },
                  error:function(jqXHR,textStatus,errorThrown){
                    console.log("fail register");
                    console.log(textStatus);
                    console.log(errorThrown);
                  }

                          });
                        }
                        $("#email").text("");
                        $("#password").text("");
                        $("#user_name").text("");
                        $("#phone").text("");
                        $("#myModal").modal('hide');
    });

      $("#form_login").submit(function(e){
                $("#Modal_login").modal('hide');
                login=true;
                e.preventDefault();
                var data = {};
      					data.email =$("#email_login").val();
      					data.password =$("#password_login").val();
                if(data.email==""||data.password==""){
                alert("vui long dien day du email va password de dang nhap")
                }
                else{
      					$.ajax({
      						type: 'POST',
                  data: JSON.stringify(data),
				          contentType: 'application/json',
                  url: '/login',
                  success: function(data) {

                        console.log('success');
                        if(data=="1"){
                          window.location='/messages';


                        }
                        else{
                          alert("dang nhap that bai");
                        }
                      },
                  error:function(jqXHR,textStatus,errorThrown){
                    console.log("error login");
                    console.log(textStatus);
                    console.log(errorThrown);
                  }

                          });
                        }
    });

    $("#register_a").click(function(){
      $("#myModal").modal('show');
    });
    $("#login_a").click(function(){
      $("#Modal_login").modal('show');
    });
  //
  $("#logout_a").click(function(){
    $.ajax({
      type: 'GET',
      url: '/logout',
      success: function(data) {

            console.log(data);



              $("#logout_li").hide();
              $("#login_li").show();
              $("#user_li").hide();
              window.location="/home";



          },
      error:function(jqXHR,textStatus,errorThrown){
        console.log("error logout");
        console.log(textStatus);
        console.log(errorThrown);
      }

              });

  });


    });
