<?php

return <<<EOF
<!DOCTYPE html >
<html lang="en">
 <head>
 	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic" rel="stylesheet">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title> FXCManor</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
  <body style="margin: 0; padding: 0; color: #1D67B8; font-family: 'Open Sans', sans-serif; background: #D0DEF0;">
 <table style="width: 100%; max-width: 600px;" align="center" cellpadding="0" cellspacing="0" bgcolor="#1D67B8">
 <tr>
  <td style="padding: 20px 20px 10px 20px;">
  	<div style="width: 200px;"><?xml version="1.0" encoding="utf-8"?>
		<img src="{$site_url}assets/images/white-fxcm-logo-200-yr.png" width="200" alt="">
</div>
  	<hr style="margin-top: 40px;">
  </td>
 </tr>
 <tr>
  <td style="padding-bottom: 10px;">
   <p style="padding: 0px 20px; text-align: center; text-transform: uppercase; color: #fff;">Мир финансов с FXCManor - мир возможностей</p>
  </td>
 </tr>
 <tr style="background: #fff;">
  <td style="padding-bottom: 10px;">
   <p style="padding: 0px 20px;">Имя благодарим за регистрацию в компании FXCManor! Ваши данные для входа в торговые платформы и личный кабинет указаны ниже:</p>
   <hr>
  </td>
 </tr>
 <tr style="background: #fff;">
  <td style="padding-bottom: 10px;">
   <p style="margin-top: 5px; padding: 0px 20px; font-size: 21px;">Личный кабинет</p>
   <p style="padding: 0px 20px;">Ваш логин: {$email}</p>
   <p style="padding: 0px 20px;">Ваш пароль: {$password}</p>
   <a style="margin-left: 15px; border: 2px solid white; font-size: 21px; color: white; text-decoration: none; padding: 5px; background: #1D67B8;" href="{$site_account}" target="_blank">Войти в личный кабинет</a>
   <hr style="margin-top: 20px;">
  </td>
 </tr>
 <tr style="background: #fff;">
  <td>
  	<style>
  		@media screen and (max-width: 900px){
  			.Btns-TS{
  				display: flex;
  				flex-direction: column;
  		}
  		.lineUp{
  			display: none;
  		}
  		}
  	</style>
   <p style="margin-top: 5px; padding: 0px 20px; font-size: 21px;">Торговые платформы TS2</p>
   <p class="Btns-TS" style="padding: 0px 20px;"><a style=" border: 2px solid white; font-size: 14px; color: white; text-decoration: none; padding: 5px; background: #1D67B8; text-align: center;" href="empty.php" target="_blank">Установить платформу TSDesktop</a> <span class="lineUp">|</span> <a style=" border: 2px solid white; font-size: 14px; color: white; text-decoration: none; padding: 5px; background: #1D67B8; text-align: center;" href="empty.php" target="_blank">Войти в вебплатформу TSWeb</a></p>
   <p style="padding: 0px 20px;">Ваш логин: {$api4['values']['server_account']}</p>
   <p style="padding: 0px 20px;">Ваш пароль: {$api4['values']['account_password']}</p>
   <hr>
  </td>
 </tr>
 <tr style="background: #fff;">
  <td style="padding-bottom: 40px;">
   <p style="padding: 0px 20px;">Внимание! Не приступайте к торговле самостоятельно, более 70% трейдеров при самостоятельной торговле валютой, CFD, индексами и акциями несут убытки рано или поздно. Обязательно дождитесь звонка своего ведущего брокера. Пройдите обучение для начала торговли и определитесь с начальным капиталом. Как правило, счета с крупной начальной инвестицией намного быстрее выходят в солидный положительный баланс и управляется более прибыльными брокерами, а так же получают намного выгоднее условия торговли, сделки и управление рисками!</p>
   <hr>
  </td>
 </tr>
 <tr style="background: #fff;">
  <td style="text-align: center; padding-bottom: 50px;">
   <a style="border: 2px solid white; font-size: 21px; color: white; text-decoration: none; padding: 20px; background: #1D67B8;" href="{$site_url}" target="_blank">Перейти на сайт</a>
  </td>
 </tr>
 <tr style="background: #1D67B8;">
  <td>
   <p style="padding: 0px 20px; color: #fff; font-size: 10px;">
   	Компания имеет несколько департаментов и офисов менеджмента для торговли на финансовых рынках <br>

Европа - London(LSE) Main department: <br>

10 Paternoster Row - 24 часа в сутки 5 дней в неделю <br>

Tel: +441440400025, +442080681922<br>

Компания FXCManor ( FXCManor LSE Бренд компании, юридическое - St Manor Ltd ) надежный финансовый провайдер. Международные транзакции и сохранность инвестиционных средств проверяются и регулируются международным регулятором FCA (Financial Conduct Authority). St Manor Ltd (Reference number: 407577).<br>

Весь мир - Китайский департамент FXCManor SHANGHAI SSE проверен и регулируется международным регулятором CHINA SECURITIES REGULATORY COMMISSION (CSRC - reg.ST24UP9337645s)<br>

Европа и Азия (Manor Department) - 99 Holdenhurst Road Bournemouth Dorset BH8 8DY UNITED KINGDOM - 24 часа в сутки 5 дней в неделю<br>

Австралия и Океания - Republic of Vanuatu, Shfa, Port-Vila P.O. Box 34456<br>

Уведомление о рисках<br>

Торговля валютами и контрактами на разницу цен несет высокий риск убытков в связи с тем, что такая торговля осуществляется за счет кредитования, что может привести к полной потере вами своего капитала. Такая торговля подходит не всем категориям инвесторов. Нажмите здесь, чтобы ознакомиться с полным текстом нашего предупреждения о рисках, и до того, как продолжить, удостоверьтесь в том, что вы осознаете имеющиеся риски, принимая во внимание свой опыт в данной сфере. При необходимости обратитесь к независимому консультанту. Информация, содержащаяся на данном веб-сайте и в опубликованном на нем документах, имеет общий характер и не учитывает ваши личные обстоятельства, финансовое положение или потребности. Для того чтобы оценить, подходит ли вам торговля такими финансовыми продуктами, вы должны внимательно ознакомиться с нашими Условиями торговли и получить независимую консультацию.</p>
  </td>
 </tr>
</table>
</body>
</html>";
EOF;



?>