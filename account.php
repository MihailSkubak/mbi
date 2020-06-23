<?php  
include ('config.php');
include ('controller/controller.php'); 

include 'header_account.php';

 // print_r($_COOKIE);

if($_COOKIE['auth_token'] && $_COOKIE['email']){

$auth_token = $_COOKIE['auth_token'];
$email = $_COOKIE['email'];

 /* GetAccountInfo - получение user_id */
 $out2 = json_decode(file_get_contents('https://my.strade24.com/api/v_2/page/GetAccountInfo?key=' . UTIP_KEY . '&rand_param=' . UTIP_RAND_PARAM . '&user_email='.$email.'&auth_token='.$auth_token.''), true);

 $user_id = $out2["values"]["id"];

 //echo $user_id;

 /* === Получение списка торговых счетов пользователя  == */
 $GetTradeAccountByUser = json_decode(file_get_contents('https://my.strade24.com/api/v_2/trading/GetTradeAccountByUser?key='. UTIP_KEY .'&rand_param=' . UTIP_RAND_PARAM . '&user_id='.$user_id.'&auth_token='.$auth_token.''), true);


//print_r($GetTradeAccountByUser);

$server_accounts = [];
foreach ($GetTradeAccountByUser['values'] as $key => $account) {
	
	$server_accounts[] = $account['server_account'];
}

 //print_r($server_accounts);


 /* === Информация о торговом счете пользователя  == */
$user_accounts_info = [];

foreach($server_accounts as $server_account) {
	
	$out = json_decode(file_get_contents('https://my.strade24.com/api/v_2/trading/GetTradeAccountInfo?key=' . UTIP_KEY . '&rand_param=' . UTIP_RAND_PARAM . '&server_account='.$server_account.'&auth_token='.$auth_token.''), true);

	$user_accounts_info[] = $out['values'];
}



 /* ===  Получение списка депозитных операций по счетам пользователя  == */

$out2 = json_decode(file_get_contents('https://my.strade24.com/api/v_2/trading/GetDepositsByUser?key=' . UTIP_KEY . '&rand_param=' . UTIP_RAND_PARAM . '&user_id='.$user_id.'&auth_token='.$auth_token.''), true);

$deposits = $out2['values'];




$out3 = json_decode(file_get_contents('https://my.strade24.com/api/v_2/payments/GetUsersClaims?key=' . UTIP_KEY . '&rand_param=' . UTIP_RAND_PARAM . '&user_id='.$user_id.'&auth_token='.$auth_token.''), true);

$claims = array_reverse($out3['values']);

/*
echo "<pre>";
print_r($claims);
echo "</pre>";
*/

/*
echo "<pre>";
print_r($user_accounts_info);
echo "</pre>";
*/
}
 ?>


 <section id="Acc">

 	<?php  if($_COOKIE['auth_token'] && $_COOKIE['email']): ?>
		<div class="container">
			<h2 style="display: flex; justify-content: center; margin-top: 40px;">Welcome to MBI</h2>
				<div style="margin-top: 20px; margin-bottom: -20px;">
	
		<h2 style="font-size: 18px;">Account Summary</h2>
		<p>
			Below is a summary of your account. Please note that the Account Balance does not include floating balances on open positions. Please log into your Trading Session for your real time equity balance.
		</p>
	</div>
			<div class="MyAcc">
				<table>
					<tr class="title">
						<td>Номер счёта (логин в торговый терминал)</td>
						<td>Доступно к выводу</td>
						<td>Средства</td>
						<td>Баланс</td>
						<td>Уровень</td>
					</tr>
					<?php foreach ($user_accounts_info as $key => $account_info): 

						if($account_info["balance"] != 0 && $account_info["margin"] != 0) {

							$level = number_format($account_info["balance"] / $account_info["margin"] * 100, 2, ',', ' ');
							if($account_info["balance"] / $account_info["margin"] * 100 < 100) $td_class = 'td-red';
							else $td_class = 'td-green';
						}
						else {
							$level = '-';
							$td_class = 'td-red';
						}

						
						?>
					<tr >
						<td><?=$account_info["server_account"]?></td>
						<td><?=number_format($account_info["freeBalance"], 2, ',', ' ');?></td>
						<td><?=number_format($account_info["balance"], 2, ',', ' ')?></td>
						<td><?=number_format($account_info["balance"] - $account_info["actives"], 2, ',', ' ')?></td>
						<td class="<?=$td_class?>"><?=$level?></td>
					</tr>
					<?php endforeach; ?>
				</table>
			</div>
			<div class="btns">
				<div class="replenish">
					<a href="">Пополнить счет</a>
				</div>
				<div class="replenish2">
					<a href="<?=PATH?>withdrawal.php">Вывод средств</a>
				</div>
			</div>
			
		</div>


		<div class="container">
			
			<div id="deposits-wrap">
				


				<div class="claims">
					
					
					<?php if($claims): ?>
					<h2>Заявки на пополнение и выводы средств</h2>
					<table>
						<tr class="title">
							<td>Дата</td>
							<td>Номер счёта</td>
							<td>Сумма</td>
							<td>Тип</td>
							<td>Статус</td>
							<td>Платёжная система</td>
							
						</tr>

						<?php $t = 1; foreach ($claims as $claim): 
							if($claim["payment_type"] == "in"){
								$type = "Ввод";
								$td_class = 'td-green';
							} 
							 if($claim["payment_type"] == "out"){
							 	$td_class = 'td-red';
							 	$type = "Вывод";
							 } 


							 if($claim["success_date"])
							 	$data = date("d.m.Y H:i",  $claim["success_date"]);
							 else $data = date("d.m.Y H:i",  $claim["creation_date"]);
						?>
							<tr>
								<td><?=$data?></td>
								<td><?=$claim["server_account"]?></td>
								<td><?=$claim["account_value"]?> $</td>
								<td class="<?=$td_class?>">
									<?=$type?>
								</td>
								<td> <?php  if($claim["status_id"] == 0) echo "В ожидании";
										    if($claim["status_id"] == 1) echo "Выполнена";
											if($claim["status_id"] == 2) echo "Удалена";
											if($claim["status_id"] == 3) echo "Отменена";
											if($claim["status_id"] == 4) echo "На проверке";
									?>
									
								</td>
								<td><?=$claim["payment_system"]?></td>
								
							</tr>
						<?php $t++; endforeach; ?>

					</table>

					<?php else: ?>

						<h2>У вас нет заявок на пополнения или выводы</h2>

					<?php endif; ?>

				</div>

<div class="deposits">
					
					<?php if($deposits): ?>
					<h2>Пополнение и выводы средств</h2>
					<table>
						<tr class="title">
							<td>Дата</td>
							<td>Номер счёта</td>
							<td>Сумма</td>
							<td>Тип</td>
							<td>Статус</td>
							
						</tr>
						<?php $t = 1; foreach ($deposits as $deposit):

								if($deposit["EQUITY"] > 0){
									$td_class = 'td-green';
									$type = "Ввод";
								}
								else{
									$td_class = 'td-red';
									$type = "Вывод";
								}


						 ?>
							<tr>
								<td><?=date("d.m.Y H:i",  $deposit["OPERATION_DATE"])?></td>
								<td><?=$deposit["SERVER_ACCOUNT"]?></td>
								<td><?=number_format($deposit["EQUITY"], 2, '.', ' ');?> $</td>
								<td class="<?php echo $td_class; ?>"><?php echo $type; ?></td>
								<td>
									<?php 
										  if($deposit["STATUS"] == 1) echo "Ввод/вывод";
										  if($deposit["STATUS"] == 2) echo "Перевод на другой счёт";
										  if($deposit["STATUS"] == 3) echo "Бонус";	
									?>
									
								</td>
								
							</tr>
						<?php $t++; endforeach; ?>
						
					</table>

					<?php else: ?>

						<h2>У вас нет пополнений или выводов</h2>

					<?php endif; ?>
				</div>



			</div>
		</div>

	<?php else:?>

		<div class="container" style="margin: 0 auto 50px auto; padding-top: 50px;">
			<h2>Войдите в аккаунт, чтобы получить доступ к Личному кабинету</h2>
		</div>


	<?php endif;?>

	


</section>


<style>
	
	#deposits-wrap{
		
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
#deposits-wrap h2{
	font-size: 18px;
	}


	
	#deposits-wrap table{
		max-width: 1170px;
	    overflow-x: scroll;
	}

	.replenish{
		border: 2px solid #BDBDBD;
		background: #3F4C5C;
	}
	.replenish2{
		border: 2px solid #BDBDBD;
		background: #3F4C5C;
	}

	#Acc .replenish2 a {
    	padding: 10px 65px;
    	margin: 0 auto;
    	line-height: 26px;
	}

	#Acc .replenish a {
    	padding: 10px 65px;
   	    margin: 0 auto;
	}
	table{
		border: 1px solid #BDBDBD;
		border-spacing: 0px;
	}
	table td{
		border-right: 1px solid #BDBDBD;
		border-top: 1px solid #BDBDBD;
	}
	
	.MyAcc table tr.title td,
	 #deposits-wrap table tr.title td{
		text-align: center;
		background: #3F4C5C;
		color: #fff;
	}

	.MyAcc table tr td{
		text-align: center;
	}

	 table tr td.td-green{
		background: #93C47D!important;
	}

	 table tr td.td-red{
		background: #E06666!important;
	}
	


	.claims{
		/*width: 50%;*/
		margin-top: 50px;
	}

	.deposits{
		/*width: 50%;*/
		margin-top: 50px;
	}


	#deposits-wrap table td{
		background: #fff;
	    padding: 8px 10px;
	    text-align: center;
	    font-size: 11px;
	    line-height: 16px;
	}


	footer {
  color: white;
  background-color: #121d2b;
}

footer ul {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}

footer ul li {
  padding-left: 0;
  margin-left: 0;
}

footer ul li::before {
  content: none;
}

footer a,
footer a:visited {
  color: white;
}

/* Sitemap
   ========================================================================== */
.footer-sitemap {
  background: #1d2937;
  border-bottom: 1px solid #03080e;
  padding: 18px 0 12px;
  font-family: Open Sans, Arial, Helvetica, Verdana, sans-serif;
  font-weight: 600;
  font-size: 0.81rem;
  color: #abc0e3;
}

.footer-sitemap > .unit {
  padding-right: 40px;
}

.footer-sitemap * {
  font-size: 13px;
  font-size: 0.81rem;
}

.footer-sitemap h3 {
  margin-top: 11px;
  font-weight: 600;
  color: #abc0e3;
  position: relative;
  margin-bottom: 12px;
}

.footer-sitemap h3::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background-color: #020508;
  border-bottom: 1px solid #3e4c5e;
}

.footer-sitemap li {
  margin-bottom: 3px;
  padding-bottom: 0;
}

.footer-sitemap li a {
  text-decoration: none;
  display: block;
  padding: 4px 10px;
  margin-left: -10px;
  margin-right: -10px;
  transition: background-color .2s ease 0s;
}

.footer-sitemap li .no-link {
  padding-bottom: 3px;
  padding-top: 2px;
  display: block;
}

.footer-sitemap li a:hover {
  background-color: #283545;
}

.footer-sitemap li.no-link > a {
  text-decoration: none;
  color: inherit;
  cursor: default;
}

.footer-sitemap li.no-link > a:hover {
  background: none;
}

.footer-sitemap li.menu-item-country-select #country-select {
  background: white;
  padding: 8px 10px;
  height: 38px;
  width: 99%;
  margin-top: 7px;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  font-size: 0.8125rem;
  font-weight: 400;
  position: relative;
}

.footer-sitemap li.menu-item-country-select #country-select option[selected] {
  font-size: 0.8125rem;
  font-weight: 700;
}

.footer-sitemap li.menu-item-country-select #country-select::-ms-expand {
  display: none;
}

.footer-sitemap li.menu-item-country-select::before {
  content: "";
  position: absolute;
  top: 23px;
  right: 12px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #1d2937 transparent transparent transparent;
  z-index: 100;
}

.footer-sitemap .footer-social li {
  display: inline-block;
  margin: 5px 20px 5px 0;
}

.footer-sitemap .footer-social li > a {
  display: inline-block;
  margin: 0;
  padding: 0;
}

.footer-sitemap .footer-social li > a .ico svg {
  transition: fill .2s ease 0s;
}

.footer-sitemap .footer-social li > a .ico::after {
  transition: background-color .2s ease 0s;
}

.footer-sitemap .footer-social li > a .ico-facebook svg {
  -webkit-transform: translate(0, 0.5%);
          transform: translate(0, 0.5%);
}

.footer-sitemap .footer-social li > a .ico-twitter svg {
  -webkit-transform: translate(2%, 1%);
          transform: translate(2%, 1%);
}

.footer-sitemap .footer-social li > a .ico-google-plus svg {
  -webkit-transform: translate(2%, 2%);
          transform: translate(2%, 2%);
}

.footer-sitemap .footer-social li > a .ico-youtube svg {
  -webkit-transform: translate(0, 0);
          transform: translate(0, 0);
}

.footer-sitemap .footer-social li > a:hover {
  background-color: transparent;
}

.footer-sitemap .footer-social li > a:hover .ico svg {
  fill: white;
}

.footer-sitemap .footer-social li > a:hover .ico-facebook::after {
  background-color: #3b5998;
}

.footer-sitemap .footer-social li > a:hover .ico-twitter::after {
  background-color: #00aced;
}

.footer-sitemap .footer-social li > a:hover .ico-google-plus::after {
  background-color: #dd4b39;
}

.footer-sitemap .footer-social li > a:hover .ico-youtube::after {
  background-color: #ff0000;
}

.footer-sitemap .footer-social li > a:hover .ico-instagram::after {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
}

/* Disclaimer
   ========================================================================== */
.disclaimer-wrapper * {
  font-size: 11px;
  font-size: 0.68rem;
}

.footer-legal {
  padding: 40px 0 10px;
  border-top: 1px solid #303a46;
}

/* Copyright
   ========================================================================== */
.copyright {
  padding: 10px 0;
  border-top: 1px solid white;
}

.copyright p {
  margin-bottom: 0;
}

.copyright ul {
  list-style: none;
  display: inline;
}

.copyright li {
  padding-right: 5px;
  display: inline;
}

.address {
  padding-bottom: 30px;
}

.default-risk-disclaimer {
  background-color: white;
}

/* ==========================================================================
   Responsive Styles
   ========================================================================== */
/* ------- [ MOBILE-SPECIFIC STYLES ] ------- */

/* ------- [ PRINT-SPECIFIC STYLES ] ------- */

/* ==========================================================================
   layout/_search.scss
   ========================================================================== */
/* form */
	
</style>

<?php include('footer.php'); ?>






