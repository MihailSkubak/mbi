$(function(){

    const sitename = location.protocol + "//" + location.hostname;


/*
    $("#rega-form").submit(function(){

        let password = $("#password").val();
        let password_repeat = $("#password_repeat").val();
        let second_name = $("#second_name").val();
        let first_name = $("#first_name").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let country = $("#country").val();

        let error = "";

        $(".rega-form-error").hide();

        if(password != password_repeat){
            $(".rega-form-error").show();
            $(".rega-form-error").html("Пароли не совпадают");
            grecaptcha.reset();
            error += "Пароли не совпадают";
        }
        

        
        console.log('country: ' + country + ' phone: ' + phone + ' email: ' + email + ' first_name: ' + first_name
            + ' second_name: ' + second_name + ' password_repeat: ' + password_repeat + ' password: ' + password);


        if(error === ""){

                $.ajax({
                    url: './',
                    type: 'POST',
                    data: { registration: 1, password: password, password_repeat: password_repeat, second_name: second_name, 
                        first_name: first_name, email: email, phone: phone, country: country,
                        recaptcha: grecaptcha.getResponse()
                    },
                    success: function(res){

                        console.log(res);

                        if(res == 1){
                           location.href = sitename + "/account.php";
                        }
                        else{
                            grecaptcha.reset();
                            $(".rega-form-error").show();
                            $(".rega-form-error").html(res);
                        }

                    },
                    error: function(){
                        alert("Error!");
                    }
                });
        }
            
            
        return false;

    });

    */
    

    $('#auth-form').submit(function(){

        let loginUser = $("#LoginUser").val();
        let loginPassword = $("#LoginPassword").val();

        $(".group-hidden").html('');
        $(".group-hidden").hide();

        console.log('LoginPassword: ' + loginPassword + ' LoginUser: ' + loginUser);
        
         $.ajax({
                url: './',
                type: 'POST',
                data: { loginPassword: loginPassword, loginUser: loginUser, login: 1
                },
                success: function(res){
                     
                     if(res == 1){
                         location.href = sitename + "/account.php";
                     }
                     else{
                        $(".group-hidden").html(res);
                        $(".group-hidden").show();
                     }
                    
                    // location.href = "?view=cart-succcess&order-id=" + order_id;
                   // window.location.replace(sitename + "/cart-succcess/" + order_id);

                },
                error: function(){
                    alert("Error!");
                }
            });
            
        return false;
    });


    $('#logout').click(function(){

         $.ajax({
                url: './',
                type: 'POST',
                data: { logout: 1
                },
                success: function(res){
                     
                    location.href = "";
                     
                },
                error: function(){
                    alert("Error!");
                }
            });
        
      return false;
    });

})