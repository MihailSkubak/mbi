<?php 


// выход из ЛК
if(isset($_POST['logout']))
{
   setcookie('auth_token', '', time()+3600*24*30, "/", "");
   setcookie('email', '', time()+3600*24*30, "/", "");
}



// вход в ЛК
if(isset($_POST['login']))
{

   $email = trim($_POST['loginUser']);
   $password = trim($_POST['loginPassword']);

  // Авторизация - получения токена bz9HaafYjC  
  $data = http_build_query(array(
  'key' => UTIP_KEY,
  'rand_param' => UTIP_RAND_PARAM,
  'user_email' => $email, //'abykovbroker@gmail.com',
  'password'=> $password //'bz9HaafYjC'
  ));
  if ($curl = curl_init()) {
  curl_setopt($curl, CURLOPT_URL, 'https://my.strade24.com/api/v_2/page/Login');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  $out = json_decode(curl_exec($curl), true);
  curl_close($curl);
  }
  

  if($out["result"] == "failed"){
    echo "Ошибка доступа. Не правильный логин или пароль";
  }

  else{
      
      $auth_token = $out["values"]["auth_token"];
      
      setcookie('auth_token', $auth_token, time()+3600*24*30, "/", "");
      setcookie('email', $email, time()+3600*24*30, "/", "");

      echo 1;

  }

  exit;

}



// регистрация в ЛК
if(isset($_POST['registration']))
{

  $errors = '';

  // post data
  $email = $_POST['email'];
  $login = random_int(100000000, 999999999);
  $first_name = $_POST['second_name'];
  $second_name = $_POST['first_name'];
  $phone = preg_replace("/[^0-9]/", '', $_POST['phone']); // только цифры
  $country = $_POST['country'];
  $password = $_POST['password'];
  $password_repeat = $_POST['password_repeat'];

  $data = http_build_query(array(
    'key' => UTIP_KEY,
    'rand_param' => UTIP_RAND_PARAM,
    'login' => $login,
    'password' => $password,
    'password_repeat' => $password_repeat,
    'second_name' => $second_name,
    'first_name' => $first_name,
    'email' => $email,
    'phone' => $phone,
    'country' => $country,
    'desk_id' => $_POST['desk_id'],
    'affiliate_id' => $_POST['affiliate_id'],
    'tag_1' => $_POST['tag_1'],
    'captcha' => $_POST["recaptcha"]
  ));
  if ($curl = curl_init() ) {
    curl_setopt($curl, CURLOPT_URL, 'https://my.strade24.com/api/v_2/page/RegisterUser');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    $api = json_decode(curl_exec($curl), true);
    curl_close($curl);
  }
  $data = array();
  if ($api['result'] == 'success') {
    foreach ($api['values'] as $k => $row) {
    $data[$k] = $row;
    }
  }

 // print_r($api);


  // =====================  Если запрос на регистацию не успешен    ======================================== ///
 if (!empty($api['result']) && $api['result'] == 'failed') {

      foreach ($api['errors'] as $key => $value) {
         if ($key == 'email') {
          $value[0] = str_replace('E-Mail ', 'Данная почта ', $value[0]);
          $value[0] = str_replace(' is already taken', ' уже используется в нашей системе. Проверьте вашу почту, где была выслана информация с данными входа или зарегистрируйтесь на другой электронный адрес.', $value[0]);
         }
         if ($key == 'login') {
          $value[0] = str_replace('Login ', 'Данный логин ', $value[0]);
          $value[0] = str_replace(' already taken', ' уже испульзуется в нашей системе. Проверьте вашу почту, где была выслана информация с данными входа или зарегистрируйтесь на другой электронный адрес.', $value[0]);
         }
         $errors .= '<div>' . $value[0] . '</div>';

         echo $errors;
         exit;
      }
  }

  // =====================     1.1) Если запрос на регистацию успешен    ======================================== ///
    elseif ($api['result'] == 'success' && !empty($api['values'])) {


      $activation_key = $api['values']['activation_key'];
      $user_email = $api['values']['user_email'];
      $activation_type = $api['values']['activation_type'];


// =====================     2) Активация регистрации    ======================================== ///
      $url2 = "https://my.strade24.com/api/v_2/page/Activation?key=". UTIP_KEY ."&rand_param=". UTIP_RAND_PARAM ."&activation_key={$activation_key}&activation_type={$activation_type}";

      $api2 = json_decode(file_get_contents($url2), true);

/*
      print "<pre>Activation(регистрации) ";
      print_r($api2);
      print "</pre>";
*/

// =====================     2.1) Если активация регистрации успешна    ======================================== ///
      if ($api2['result'] == 'success') {

        $notice .= '<div>' . $api2['description'] . '</div>';
        $group_id = 1;
        $leverage = 100;
        $password_acc = 'Rr'.rand(100000, 999999);
        


$data = http_build_query(array(
'key' => UTIP_KEY,
'rand_param' => UTIP_RAND_PARAM,
'user_email' => $email,
'password'=> $password,
));

// ==========================  получаем auth_token пользователя ========================================  //
if ($curl = curl_init()) {
curl_setopt($curl, CURLOPT_URL, 'https://my.strade24.com/api/v_2/page/Login');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
$api20 = json_decode(curl_exec($curl), true);
curl_close($curl);
}

/*
echo "<pre>";
echo "auth_token - ".$api20["values"]["auth_token"];
echo "</pre>";
*/

$auth_token = $api20["values"]["auth_token"];


// =====================    3) Регистрация торгового счета     ======================================== ///


$data = http_build_query(array(
'key' => UTIP_KEY,
'rand_param' => UTIP_RAND_PARAM,
'auth_token' => $auth_token,
'user_login' => $login,
'group_id' => $group_id,
'leverage' => $leverage,
'password'=> $password_acc,
));
if ($curl = curl_init()) {
curl_setopt($curl, CURLOPT_URL, 'https://my.strade24.com/api/v_2/trading/RegisterTradeAccount');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
$api3 = json_decode(curl_exec($curl), true);
curl_close($curl);
}

/*
        print "<pre>RegisterTradeAccount: ";
        print_r($api3);
        print "</pre>";
*/
 
 // ====================Если регистрация торгового счета не успешна    ======================================   //    
        if ($api3['result'] == 'failed' && !empty($api3['description'])) {
          foreach ($api3['errors'] as $key => $value) {
            $errors .= '<div>' . $value[0] . '</div>';
            echo $errors;
            exit;
          }
        }

// =====================   3) Если регистрация торгового счета успешна    ======================================== ///
        if ($api3['result'] == 'success') {
          $activation_key2 = $api3['values']['activation_key'];
          $user_email2 = $api3['values']['user_email'];
          $activation_type2 = $api3['values']['activation_type'];


// =====================   4) Активация торгового счёта    ======================================== ///          
$api4 = json_decode(file_get_contents('https://my.strade24.com/api/v_2/page/Activation?key=' . UTIP_KEY . '&rand_param=' . UTIP_RAND_PARAM . '&activation_key=' . $activation_key2 . '&activation_type=' . $activation_type2), true);

/*
          print "<pre>Activation(торгового счёта)";
          print_r($api4);
          print "</pre>";
*/

// =====================   4) Если активация торгового счета успешна    ======================================== //
  if ($api4['result'] == 'success') {

  $notice = $api4['description'];
  $site_url = PATH;
  $site_account = PATH."account.php";
  $message = include('./reg_email.php');
  $subject = $api4['description'];

  $data = http_build_query(
    array(
      'key' => UTIP_KEY,
      'rand_param' => UTIP_RAND_PARAM,
      'email' => $email,
      'subject' => $subject,
      'message' => $message
    )
  );

// ============================       Отправляем письмо ========================================== //
  if($curl = curl_init()) {
    curl_setopt($curl, CURLOPT_URL, 'https://my.strade24.com/api/v_2/page/SendEmail');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    $api5 = json_decode(curl_exec($curl));
    curl_close($curl);
  }

if($api5->result == "success"){


  // авторизация
  setcookie('auth_token', $auth_token, time()+3600*24*30, "/", "");
  setcookie('email', $email, time()+3600*24*30, "/", "");

 // header('Location: /?view=account');

  echo 1;
  exit;
}
else{
  echo "Ошибка при отправке письма";
  exit;
}

/*
          print "<pre>Sendmail(Отправка почты)";
          print_r($api5);
          print "</pre>";
*/

           }// 4) Если активация торгового счета успешна  //
        } // 3) Если егистрация торгового счета успешна  //
    }  //   2.1) Если активация регистрации успешна  // 
  }   //    1.1) Если запрос на регистацию успешен  //


  exit;

}
   


?>