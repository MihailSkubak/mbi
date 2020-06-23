<?php 

include ('config.php');
include ('controller/controller.php'); 

include 'header_account.php'; 


if($_COOKIE['email'] && !empty($_COOKIE['email'])) :

$auth_token = $_COOKIE['auth_token'];

/* GetAccountInfo - получение user_id */
              $out2 = json_decode(file_get_contents('https://my.strade24.com/api/v_2/page/GetAccountInfo?key=' . UTIP_KEY . '&rand_param=' . UTIP_RAND_PARAM . '&user_email='.$_COOKIE['email'].'&auth_token='.$auth_token.''), true);

$user_id = $out2["values"]["id"];

$GetTradeAccountByUser = json_decode(file_get_contents('https://my.strade24.com/api/v_2/trading/GetTradeAccountByUser?key='.UTIP_KEY.'&rand_param=' .UTIP_RAND_PARAM. '&user_id='.$user_id.'&auth_token='.$auth_token.''), true);
              

  /*echo "<pre>";
  print_r($GetTradeAccountByUser);
  echo "</pre>";
*/

$server_accounts = [];
foreach ($GetTradeAccountByUser['values'] as $key => $account) {
	
	$server_accounts[] = $account['server_account'];
}


$user_accounts_info = [];

foreach($server_accounts as $server_account) {
	
	$out = json_decode(file_get_contents('https://my.strade24.com/api/v_2/trading/GetTradeAccountInfo?key=' . UTIP_KEY . '&rand_param=' . UTIP_RAND_PARAM . '&server_account='.$server_account.'&auth_token='.$auth_token.''), true);

	$user_accounts_info[] = $out['values'];
}


//print_r($user_accounts_info);
              

$account_id = key($GetTradeAccountByUser["values"]);


// сделать вывод
if($_POST['visa']){


$data = http_build_query(array(
'key' => UTIP_KEY,
'rand_param' => UTIP_RAND_PARAM,
'auth_token' => $auth_token,
'merchant_id' => '25',
'account_id' => $account_id,
'status' => '0',
'currency_id' => '1',
'value' => 777
));

if ($curl = curl_init()) {
              curl_setopt($curl, CURLOPT_URL, 'https://my.strade24.com/api/v_2/payments/CreateClaim');
              curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
              curl_setopt($curl, CURLOPT_POST, true);
              curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
              $out4 = json_decode(curl_exec($curl), true);
              curl_close($curl);
}
var_dump($out4);

}



?>


 <section id="withdrawal-visa">

	<div class="container">
		
		<h2>Вывод средств с помощью Visa/MasterCard</h2>


		
		<form action="">

			<div class="form-group">
				<label for="first_name">Счёт:	</label>
				<select type="text" class="form-control" id="card-type" name="card-type" placeholder="Тип карты" required="required">
					<?php foreach ($user_accounts_info as $user_account):?>
					<option><?=$user_account['server_account']?> - <?=$user_account['freeBalance']?>$</option>
					<?php endforeach;?>
				</select>
			</div>

			<div class="form-group">
				<label for="first_name">Сумма:	</label>
				<input type="text" class="form-control" id="sum" name="sum" placeholder="Сумма" required="required">
			</div>
			
			<div class="form-group">
				<label for="first_name">Тип карты:	</label>
				<select type="text" class="form-control" id="card-type" name="card-type" placeholder="Тип карты" required="required">
					<option>Visa</option>
					<option>MasterCard</option>
				</select>
			</div>

			<div class="form-group">
				<label for="first_name">Номер карты:	</label>
				<input type="text" class="form-control" id="card-number" name="card-number" placeholder="Номер карты" required="required">
			</div>

			<div class="form-group">
				<label for="first_name">ФИО (как на карте):	</label>
				<input type="text" class="form-control" id="fio" name="fio" placeholder="ФИО" required="required">
			</div>

			<div class="form-group">
				<label for="first_name">Срок действия (формат ММГГ):	</label>
				<input type="text" class="form-control" id="card-date" name="card-date" placeholder="Срок действия" required="required">
			</div>

			<div class="form-group">
				<button class="rega-btn">Отправить</button>
			</div>
			
			
		

		</form>


	</div>

</section>


<style>
	
	#withdrawal-visa{
		margin: 25px auto 75px auto;
	}

	#withdrawal-visa h2{
		text-align: center;
	}

	#withdrawal-visa form{
		 max-width: 400px;
    	margin: 35px auto;
	}
	
	#withdrawal-visa form .rega-btn{
		font-family: Verdana, sans-serif;
	    font-size: 18px;
	    background: #01ABB5;
	    color: #fff;
	    padding: 10px 10px;
	    margin: 25px auto 0 auto;
	    border: none;
	    border-radius: 0;
	    width: 250px;
	}

	#withdrawal-visa form input,
	#withdrawal-visa form select{
		outline: none;
		padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    height: 40px;
	}
	
	   

</style>


<?php else : ?>

<div style="margin: 100px auto; text-align: center;">
	<h2>Войдите в Личный Кабинет</h2>
</div>


<?php endif; ?>


<?php include('footer.php'); ?>