<?php 
	  include "config.php"; 
	  include "controller/controller.php"; 
?>
<!DOCTYPE html>
<html lang="en">
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" href="css/bootstrapf.min.css">
<link rel="stylesheet" href="css/jasny-bootstrapf.min.css">
<link rel="stylesheet" href="css/font-awesomef.css">
<link rel="stylesheet" href="css/stylef.css">

		<?php 
			  include "header.php"; ?>
<body>
	<main>
		
<div class="page-wrap">
	<div class="gr-d">
		<img src="img/base/green_dot.png" alt="">
	    <h1 style="font-size: 21px;">Регистрация в компании MBI</h1>
	    <hr style="margin-top: -20px;">
	</div>
	
<div class="my-container">

<div class="page-section">

<div class="page-section-2 rega-form-block">
			<form onsubmit="JavaScript:/*this.subbut.disabled=true;
this.subbut.value='Подождите, пожалуйста!';*/ viewDiv();" id="rega-form" name="rega-form" action="/registration.php" method="POST" accept-charset="UTF-8">
				
			<div class="rega-form-wrap flex">

				<div class="rega-form-left">

					<div class="form-group">
				
						<div class="rega-form-right">
							<div class="rega-form-footer" style="margin-top: -60px;">
								<div class="rega-form-checkbox-wrap">
									<div class="rega-form-checkbox" style="width: 100%; padding-top: 10px;">
										<input type="checkbox" id="check1" name="check" required="required"  />
										<label for="check1">Я согласен получать уведомления по почте &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</label>
										<hr style="margin-top: 20px;">
									</div>

									<div class="rega-form-checkbox" style="width: 100%;">
										<input type="checkbox" id="check2" name="check2" required="required" />
										<label for="check2"><a href="docs/terms-and-conditions.pdf" target="_blank">Я согласен на условия торговли</a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</label>
										<hr>
									</div>

									<div class="rega-form-checkbox" style="width: 100%;">
										<input type="checkbox" id="check3" name="check3" required="required" />
										<label  for="check3">Даю своё согласие на автоматизированную обработку персональных данных</label>
										<hr>
									</div>

									<div class="rega-form-checkbox" style="width: 100%;">
										<label style="padding-top: 30px;">Данные счета</label>
										<label style="font-style: italic;">Введите ваши Имя и Фамилию как указано в вашем паспорте.</label>
										<hr>
									</div>
							    </div>
							</div>
							<div class="form-group">
								<label for="first_name">Имя:	</label>
								<input style="width: 100%;" type="text" class="form-control" id="first_name" name="first_name" placeholder="Имя" required="required" >
							</div>

							<div class="form-group">
								<label for="second_name">Фамилия: </label>
								<input style="width: 100%;" type="text" class="form-control" id="second_name" name="second_name" placeholder="Фамилия" required="required" >
							</div>

							<div class="form-group">
								<label for="phone">Номер телефона:	</label>
								<input style="width: 100%;" type="text" class="form-control" id="phone" name="phone" placeholder="Номер телефона" required="required" >
							</div>

							<div class="form-group">
							
								<label for="country">Страна:</label>
								<select style="width: 100%;" class="form-controlesle" name="country" id="country" required="required">
								<option value="">Страна</option>
								<option value="AU">Австралия</option>
								<option value="AT">Австрия</option>
								<option value="AZ">Азербайджан</option>
								<option value="AX">Аландские острова</option>
								<option value="AL">Албания</option>
								<option value="DZ">Алжир</option>
								<option value="VI">Американские Виргинские острова</option>
								<option value="AS">Американское Самоа</option>
								<option value="AI">Ангилья</option>
								<option value="AO">Ангола</option>
								<option value="AD">Андорра</option>
								<option value="AG">Антигуа и Барбуда</option>
								<option value="AR">Аргентина</option>
								<option value="AM">Армения</option>
								<option value="AW">Аруба</option>
								<option value="AF">Афганистан</option>
								<option value="BS">Багамы</option>
								<option value="BD">Бангладеш</option>
								<option value="BB">Барбадос</option>
								<option value="BH">Бахрейн</option>
								<option value="BY">Беларусь</option>
								<option value="BZ">Белиз</option>
								<option value="BE">Бельгия</option>
								<option value="BJ">Бенин</option>
								<option value="BM">Бермуды</option>
								<option value="BG">Болгария</option>
								<option value="BO">Боливия</option>
								<option value="BQ">Бонэйр, Синт-Эстатиус и Саба</option>
								<option value="BA">Босния и Герцеговина</option>
								<option value="BW">Ботсвана</option>
								<option value="BR">Бразилия</option>
								<option value="IO">Британская территория в Индийском океане</option>
								<option value="VG">Британские Виргинские острова</option>
								<option value="BN">Бруней</option>
								<option value="BF">Буркина-Фасо</option>
								<option value="BI">Бурунди</option>
								<option value="BT">Бутан</option>
								<option value="VU">Вануату</option>
								<option value="VA">Ватикан</option>
								<option value="GB">Великобритания</option>
								<option value="HU">Венгрия</option>
								<option value="VE">Венесуэла</option>
								<option value="UM">Внешние малые острова США</option>
								<option value="TL">Восточный Тимор</option>
								<option value="VN">Вьетнам</option>
								<option value="GA">Габон</option>
								<option value="HT">Гаити</option>
								<option value="GY">Гайана</option>
								<option value="GM">Гамбия</option>
								<option value="GH">Гана</option>
								<option value="GP">Гваделупа</option>
								<option value="GT">Гватемала</option>
								<option value="GN">Гвинея</option>
								<option value="GW">Гвинея-Бисау</option>
								<option value="DE">Германия</option>
								<option value="GG">Гернси</option>
								<option value="GI">Гибралтар</option>
								<option value="GB">Гондурас</option>
								<option value="HK">Гонконг</option>
								<option value="GD">Гренада</option>
								<option value="GL">Гренландия</option>
								<option value="GR">Греция</option>
								<option value="GE">Грузия</option>
								<option value="GU">Гуам</option>
								<option value="DK">Дания</option>
								<option value="CD">Демократическая Республика Конгос</option>
								<option value="JE">Джерси</option>
								<option value="DJ">Джибути</option>
								<option value="DM">Доминика</option>
								<option value="DO">Доминиканская Республика</option>
								<option value="EG">Египет</option>
								<option value="ZM">Замбия</option>
								<option value="ZW">Зимбабве</option>
								<option value="IN">Индия</option>
								<option value="ID">Индонезия</option>
								<option value="JO">Иордания</option>
								<option value="IQ">Ирак</option>
								<option value="IR">Иран</option>
								<option value="IE">Ирландия</option>
								<option value="IS">Исландия</option>
								<option value="ES">Испания</option>
								<option value="IT">Италия</option>
								<option value="YE">Йемен</option>
								<option value="CV">Кабо-Верде</option>
								<option value="KZ">Казахстан</option>
								<option value="KH">Камбоджа</option>
								<option value="CM">Камерун</option>
								<option value="CA">Канада</option>
								<option value="QA">Катар</option>
								<option value="KE">Кения</option>
								<option value="CY">Кипр</option>
								<option value="KI">Кирибати</option>
								<option value="CN">Китай</option>
								<option value="CC">Кокосовые острова</option>
								<option value="CO">Колумбия</option>
								<option value="KM">Коморы</option>
								<option value="KP">Корейская Народно-Демократическая Республика</option>
								<option value="CR">Коста-Рика</option>
								<option value="CI">Кот-д'Ивуар</option>
								<option value="CU">Куба</option>
								<option value="KW">Кувейт</option>
								<option value="KG">Кыргызстан</option>
								<option value="CW">Кюрасао</option>
								<option value="LA">Лаос</option>
								<option value="LV">Латвия</option>
								<option value="LS">Лесото</option>
								<option value="LR">Либерия</option>
								<option value="LB">Ливан</option>
								<option value="LY">Ливия</option>
								<option value="LT">Литва</option>
								<option value="LI">Лихтенштейн</option>
								<option value="LU">Люксембург</option>
								<option value="MU">Маврикий</option>
								<option value="MR">Мавритания</option>
								<option value="MG">Мадагаскар</option>
								<option value="YT">Майотта</option>
								<option value="MO">Макао</option>
								<option value="MK">Македония</option>
								<option value="MW">Малави</option>
								<option value="MY">Малайзия</option>
								<option value="ML">Мали</option>
								<option value="MV">Мальдивы</option>
								<option value="MT">Мальта</option>
								<option value="MA">Марокко</option>
								<option value="MQ">Мартиника</option>
								<option value="MH">Маршалловы острова</option>
								<option value="MX">Мексика</option>
								<option value="MZ">Мозамбик</option>
								<option value="MD">Молдавия</option>
								<option value="MC">Монако</option>
								<option value="MN">Монголия</option>
								<option value="MS">Монтсеррат</option>
								<option value="MM">Мьянма</option>
								<option value="NA">Намибия</option>
								<option value="NR">Науру</option>
								<option value="NP">Непал</option>
								<option value="NE">Нигер</option>
								<option value="NG">Нигерия</option>
								<option value="NL">Нидерланды</option>
								<option value="NI">Никарагуа</option>
								<option value="NU">Ниуэ</option>
								<option value="NZ">Новая Зеландия</option>
								<option value="NC">Новая Каледония</option>
								<option value="NO">Норвегия</option>
								<option value="AE">Объединенные Арабские Эмираты</option>
								<option value="OM">Оман</option>
								<option value="BV">Остров Буве</option>
								<option value="IM">Остров Мэн</option>
								<option value="NF">Остров Норфолк</option>
								<option value="CX">Остров Рождества</option>
								<option value="HM">Остров Херд и острова Макдональд</option>
								<option value="KY">Острова Кайман</option>
								<option value="CK">Острова Кука</option>
								<option value="CX">Острова Питкэрн</option>
								<option value="SH">Острова Святой Елены, Вознесения и Тристан-да-Кунья</option>
								<option value="TC">Острова Теркс и Кайкос</option>
								<option value="PK">Пакистан</option>
								<option value="PW">Палау</option>
								<option value="PS">Палестина</option>
								<option value="PA">Панама</option>
								<option value="PG">Папуа-Новая Гвинея</option>
								<option value="PY">Парагвай</option>
								<option value="PE">Перу</option>
								<option value="PL">Польша</option>
								<option value="PT">Португалия</option>
								<option value="PR">Пуэрто-Рико</option>
								<option value="CG">Республика Конго</option>
								<option value="RE">Реюньон</option>
								<option value="RU">Россия</option>
								<option value="RW">Руанда</option>
								<option value="RO">Румыния</option>
								<option value="SV">Сальвадор</option>
								<option value="WS">Самоа</option>
								<option value="SM">Сан-Марино</option>
								<option value="ST">Сан-Томе и Принсипи</option>
								<option value="SA">Саудовская Аравия</option>
								<option value="MP">Северные Марианские Острова</option>
								<option value="SC">Сейшелы</option>
								<option value="BL">Сен-Бартелеми</option>
								<option value="SN">Сенегал</option>
								<option value="MF">Сен-Мартен</option>
								<option value="PM">Сен-Пьер и Микелон</option>
								<option value="VC">Сент-Винсент и Гренадины</option>
								<option value="KN">Сент-Китс и Невис</option>
								<option value="LC">Сент-Люсия</option>
								<option value="RS">Сербия</option>
								<option value="SG">Сингапур</option>
								<option value="SX">Синт-Мартен</option>
								<option value="SY">Сирия</option>
								<option value="SK">Словакия</option>
								<option value="SI">Словения</option>
								<option value="US">Соединённые Штаты Америки</option>
								<option value="SB">Соломоновы острова</option>
								<option value="SO">Сомали</option>
								<option value="SD">Судан</option>
								<option value="SR">Суринам</option>
								<option value="SL">Сьерра-Леоне</option>
								<option value="TJ">Таджикистан</option>
								<option value="TH">Таиланд</option>
								<option value="TW">Тайвань</option>
								<option value="TZ">Танзания</option>
								<option value="TG">Того</option>
								<option value="TK">Токелау</option>
								<option value="TO">Тонга</option>
								<option value="TT">Тринидад и Тобаго</option>
								<option value="TV">Тувалу</option>
								<option value="TN">Тунис</option>
								<option value="TM">Туркменистан</option>
								<option value="TR">Турция</option>
								<option value="UG">Уганда</option>
								<option value="UZ">Узбекистан</option>
								<option value="WF">Уоллис и Футуна</option>
								<option value="UY">Уругвай</option>
								<option value="FO">Фарерские острова</option>
								<option value="FM">Федеративные Штаты Микронезии</option>
								<option value="FJ">Фиджи</option>
								<option value="PH">Филиппины</option>
								<option value="FI">Финляндия</option>
								<option value="PF">Фолклендские острова</option>
								<option value="FR">Франция</option>
								<option value="GF">Французская Гвиана</option>
								<option value="PF">Французская Полинезия</option>
								<option value="TF">Французские Южные и Антарктические Территории</option>
								<option value="HR">Хорватия</option>
								<option value="CF">Центральноафриканская Республика</option>
								<option value="TD">Чад</option>
								<option value="ME">Черногория</option>
								<option value="CZ">Чехия</option>
								<option value="CL">Чили</option>
								<option value="CH">Швейцария</option>
								<option value="SE">Швеция</option>
								<option value="SJ">Шпицберген и Ян-Майен</option>
								<option value="LK">Шри-Ланка</option>
								<option value="EC">Эквадор</option>
								<option value="GQ">Экваториальная Гвинея</option>
								<option value="ER">Эритрея</option>
								<option value="SZ">Эсватини</option>
								<option value="EE">Эстония</option>
								<option value="ET">Эфиопия</option>
								<option value="ZA">Южная Африка</option>
								<option value="GS">Южная Георгия и Южные Сандвичевы острова</option>
								<option value="KR">Южная Корея</option>
								<option value="SS">Южный Судан</option>
								<option value="JM">Ямайка</option>
								<option value="JP">Япония</option>
								</select>
							</div>
						</div>


						<label for="email">Логин (ваша Эл.почта):</label>
						<input style="width: 100%;" type="email" class="form-control" id="email" name="email" placeholder="Email" required="required">
					</div>


					<div class="form-group">
						<label style="font-style: italic;" for="password">Придумайте пароль (пароль должен состоять не менее чем из 8 символов и содержать латинские буквы в верхнем и нижнем регистре, а также хотя бы 1 цифру):	</label>
						<input style="width: 100%;" type="password" class="form-controlesle" id="password" name="password" placeholder="Пароль только на английском" required="required" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
						>
					</div>

					<div class="form-group">
						<label for="password_repeat">Введите пароль еще раз:</label>
						<input style="width: 100%;" type="password" class="form-controlesle" id="password_repeat" name="password_repeat" placeholder="Пароль ещё раз" required="required" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
						>
					</div>

					

					<input class="input" type="hidden" name="affiliate_id" id="affiliate_id" value="<?php if(isset($_GET['aff_id']) && !empty($_GET['aff_id']))
						             echo $_GET['aff_id'];
						             else echo 'selfreg'; ?>"> 
				<div class="recapt">
					<div style="display: flex; justify-content: center; transform:scale(0.97); transform-origin:1;"  required="" class="g-recaptcha" data-sitekey="6LfNRAAVAAAAADnLKkkU2PlfvLY2Ll8kJ7Qvmjjx" style=""></div>
				</div>
					
				

					<div class="rega-form-error"></div>

				</div>
				

				


			</div>


			<div class="rega-btn-block">
				<button  name="subbut" type="submit" class="regal-btn">Продолжить</button>
			</div>
					
			    </form>
			    <div id="p_prldr"><div class="contpre"><span class="svg_anm"></span></div></div>
			    <style>
			    	#p_prldr{
			    		position: fixed;
			    		left: 0;
			    		top: 0;
			    		right:0;
			    		bottom:0;
			    		background: rgba(0,0,0,0.5);
			    		z-index: 30;
			    		display: none;
			    	}

			    	.contpre small{font-size:25px;}

			    	.contpre{
			    		width: 250px;
			    		height: 100px;
			    		position: absolute;
			    		left: 50%;top: 48%;
			    		margin-left:-125px;
			    		margin-top:-75px;
			    		color:black;
			    		font-size:40px;
			    		letter-spacing:-2px;
			    		text-align:center;
			    		line-height:35px;}

			    		#p_prldr .svg_anm {
			    			position: absolute;
			    			width: 41px;
			    			height: 41px;
			    			background: url(img/base/loading.gif) center center no-repeat;
			    			background-size:41px;    
			    			margin: -16px 0 0 -16px;}
			    		</style>
			    <script>
			    	function viewDiv(){
			    		document.getElementById("p_prldr").style.display = "block";
			    	};
			    </script>
		    </div>
		</div>
	</div>
</div>
</main>


<style>
	body{
		font-family: 'Open Sans', sans-serif;
	}
	.page-title{
		padding-top: 80px;
	}
	.page-wrap{
		background: #F6F7F8;
		margin: 0 auto;
		padding-top: 0px;
	}
	.page-section-2{
		background: #F6F7F8;
	}
	.form-group label{
		font-family: 'Open Sans', sans-serif;
		font-weight: lighter;
		font-size: 15px;
	}
	input[type=checkbox]+label:before {
		content: "\2714";
		color: transparent;
		z-index: 4;
		margin-right: 10px;
		border-radius: 0px;
		display: inline-block;
		border: 1px solid #000;
		font-size: 18px;
		line-height: 20px;
		height: 20px;
		width: 25px;
		width: 2px;
		width: 20px;
		cursor: pointer;
		text-align: center;
		vertical-align: middle;
		transition: color ease .3s;
	}
	.page-section-2{
		background: #fff;
		border: 1px solid #B2BFD0;
		border-radius: 0px;
		width: 80%;
	}
	.rega-form-wrap{
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.reg-error{
    padding: 10px;
    font-size: 14px;
    background: #C62D1D;
    color: #fff;
    font-family: Open Sans;
    margin: 25px auto 50px auto;
	}

	.rega-form-error{

	padding: 10px;
    font-size: 14px;
    background: #C62D1D;
    color: #fff;
    font-family: Open Sans;
    display: none;
    margin: 25px auto 0 auto;

	}
	.gr-d{
		padding-top: 20px;
		text-align: center;
		padding-bottom: -20px;
	}
	.rega-form-right{
	width: 100%;
    }
    .rega-form-checkbox{
    	margin-top: -20px;
    	margin-bottom: 0px;
    }





	.regal-btn {
    font-family: Open Sans;
    font-size: 18px;
    background: #01ABB5;
    color: #fff;
    width: 35%;
    padding: 15px 10px;
    margin: 0 auto;
    margin-top: 40px;
}
.recapt{
  	padding-left: 5%;
  }
@media screen and (max-width: 900px) {
  .regal-btn {
    width: 100%;
  }
  .page-section-2{
  	width: 100%;
  }
  .recapt{
  	padding-left: 0px;
  }
}
.regal-btn:hover {
    background: #283545;
    color: #F4AD03;
}

	.form-controlesle{
		display: block;
		width: 100%;
		height: 45px;
		padding: 6px 12px;
		font-size: 14px;
		line-height: 1.42857143;
		color: #555;
		background-color: #fff;
		background-image: none;
		border: 1px solid #ccc;
		-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
		-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
	}
	@media screen and (max-width: 768px){
		.form-controlesle{
			max-width: 400px;
		}
		@media screen and (max-width: 500px){
		.form-controlesle{
			width: 100%;
		}
	}
</style>



	<script src='https://www.google.com/recaptcha/api.js'></script>
</body>
<?php include "footer.php"; ?>
</html>