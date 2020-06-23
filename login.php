<?php 
		include ('config.php');
		include ('controller/controller.php'); 

 ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> MBI</title>
	<link rel="shortcut icon" href="img/base/favicon.ico" />
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic" rel="stylesheet">
	<meta name="viewport" content=" initial-scale=0.7, maximum-scale=0.7, minimum-scale=0.7, width=device-width, height=device-height">
</head>
<body>
	<main>
		<div class="cont">
			<div class="page-section-2 rega-form-block">
				<div class="logoFXManor">
					<div class="logos">
						<a href="index.php"><img src="img/base/mbi-blue-logo.svg" alt="International Company"></a>
					</div>
					<div class="LangRU">
						<div class="dropdown">
						  <button class="dropbtn">RU</button>
						  <div class="dropdown-content">
						    <a href="https://www.fxcm.com/uk/" target="_blank">English</a>
						    <div class="ForB"></div>
						    <a href="https://www.fxcm.com/fr/" target="_blank">Français</a>
						    <div class="ForB"></div>
						    <a href="https://fxcm.com/de/" target="_blank">Deutsche</a>
						    <div class="ForB"></div>
						    <a href="https://fxcm-arabic.com/" target="_blank"> عرب    </a>
						    <div class="ForB"></div>
						    <a href="https://fuhuiyazhou.com/" target="_blank">中文 </a>
						    <div class="ForB"></div>
						    <a href="https://www.fxcm.com/it/" target="_blank">Italiano </a>
						    <div class="ForB"></div>
						    <a href="https://www.fxcm.com/gr/" target="_blank">Ελληνικά </a>
						    <div class="ForB"></div>
						    <a href="https://www.fxcm.com/es/" target="_blank">Español </a>
						    <div class="ForB"></div>
						    <a href="https://www.fxcm.com/my/" target="_blank">Bahasa Melayu </a>
						    <div class="ForB"></div>
						    <a href="https://www.fxcm.com/vn/" target="_blank">Tiếng Việt </a>
						  </div>
						</div>
					</div>
				</div>
		

			<h2 class="login-title">Личный счет</h2>
				<form id="auth-form" name="auth-form" action="" method="POST" accept-charset="UTF-8">
					<div class="form-group">
						<input type="email"  name="LoginUser" id="LoginUser" placeholder="Email" required="required">
					</div>
					<div class="form-group">
						<input type="password" class="form-controlesle" name="LoginPassword" id="LoginPassword" placeholder="Пароль" required="required">
					</div>

					<div class="form-group group-hidden"> </div>

					<div class="auth-form-checkbox" style="color: #7D7D7D;">
						<input type="checkbox" id="check1" name="check1" />
						<label for="check1">Запомнить</label>
					</div>
				<div class="auth-btn-block">
					<button id="auth-btn">Войти</button>
				</div>
				<div class="auth-footer" >
					<div class="auth-footer_item">
						<a href="feedback.php" target="_self" class="link-btn" style="color: #7D7D7D;">
						Забыли пароль?
					</a>
					</div>
					<div class="auth-footer_item">
						<a href="registration.php" target="_self" class="link-btn" style="color: #7D7D7D;">
						Открыть счет
					</a>
					</div>
				</div>
				</div>
			</form>
		</div>
	</div>
	
    </main>
    <footer>
    	<p class="MBIData">&#169; MBI Inc 1999-<?php echo date("Y") ?></p>
    </footer>

    <style>
    	html{
    		position: relative;
  min-height: 100%;
    	}
    	footer{
    		padding-left: 20%;
    		position: absolute;
    		bottom: 0;
    		width: 30%;
    		height: 60px;
    	}
    	.MBIData{
    		font-size: 12px;
    	}
    	
	body{
		font-family: 'Open Sans', sans-serif;
	}
	main{
		width: 100%;
		max-width: 1170px;
		padding: 0px;
		margin: 0 auto;
	}
	

	#auth-form .form-group input {
	    width: 95%;
	    margin-bottom: 20px;
	    border-radius: 4px;
	    border: 1px solid #ccc;
	    padding: 8px 10px;
	}
  


	.cont{
		margin-left: 32%;
		display: flex;
		justify-content: center;
		width: 100%;
		max-width: 450px;
		margin-top: 130px;
		border: 1px solid #BDBDBD;
		box-shadow: 7px 7px 5px rgba(0,0,0,0.2);
	}
	.logoFXManor{
		display: flex;
		justify-content: space-between;
		padding-top: 20px;
	}
	.logos{
		width: 80%;
		max-width: 200px;
	}
	.dropbtn {
		background: #fff;
    color: black;
    padding: 10px;
    font-size: 16px;
    border: none;
}

.dropdown {
	position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: fixed;
    background-color: #536A8A;
    min-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.login-title{
	color: #1D67B8;display: block;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

.dropdown-content a {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: center;
}
.ForB{
	width: 110px;
	border-bottom: 1px solid white;
	margin-left: 10%;
	margin-right: 10%;
}
@media screen and (max-width: 900px) {
  .ForB {
    width: 90px;
  }
  .cont{
			margin-left: 5%;
		}
}
.dropdown-content a:hover {background-color: #01ABB5;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: #F0F0F0;}

.auth-btn-block{
	padding: 10px 0px;
}
#auth-btn{
	padding: 10px 158px;
	background: #1D67B8;
	color: #fff;
	font-size: 21px;
	border-radius: 5px;
	border: 0px;
}
#auth-btn:hover{
	background: #283545;
	color: #F3AB10;
}
.auth-footer{
	display: flex;
	justify-content: space-between;
	padding: 20px 0px;
}
.auth-footer_item{
	padding-bottom: 10px
}
.link-btn{
	width: 40%;
	border: 1px solid #BDBDBD;
	text-align: center;
	border-radius: 5px;
	text-decoration: none;
	color: black;
	padding: 10px 20px;
}
.link-btn:hover{
	background: #E6E6E6;
}

.group-hidden{
		display: none;
	    padding: 10px;
    font-size: 14px;
    background: #C62D1D;
    color: #fff;
    font-family: Open Sans;
    border-radius: 6px;
    margin: 0 auto 20px auto;
    }
</style>

<script  src='jquery/jquery-3.2.1.min.js'></script>
<script src='<?=PATH?>assets/js/myscripts.js'></script>

</body>
</html>