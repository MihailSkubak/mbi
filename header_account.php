<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Аккаунт</title>
	<link rel="shortcut icon" href="img/base/favicon.ico" />
	<link rel="stylesheet" href="<?=PATH?>assets/css/bootstrapf.min.css">
	<link rel="stylesheet" href="<?=PATH?>assets/css/jasny-bootstrapf.min.css">
	<link rel="stylesheet" href="<?=PATH?>assets/css/font-awesomef.css">
	<link rel="stylesheet" href="<?=PATH?>assets/css/stylef.css">
	<link rel="stylesheet" href="<?=PATH?>assets/css/Styles.css">
	<link rel="stylesheet" href="<?=PATH?>assets/css/font-awesome.min.css">
	<link rel='stylesheet' id='main-styles-css'  href='<?=PATH?>css/mainAsC.css' type='text/css' media='all' />
	<link rel='stylesheet' id='main-styles-css'  href='<?=PATH?>css/mainven.css' type='text/css' media='all' />

</head>
<body>


	<header>

		<div class="container">

			<div class="content">

				<div class="left">
					<a href="<?=PATH?>">
						<img src="<?=PATH?>img/base/mbi-white-logo.svg" alt="International Company">
					</a>
				</div>

				<div class="right">
					<nav id="omni-nav">
						<ul class="reset1">
							<li class="omni-trading-station-free-demo first">
								<a href="#" target="_self">Скачать терминал</a>
							</li>
							<li class="omni-trading-station-free-demo">
								<a href="#" target="_self">Войти в WEB-Trader</a>
							</li>
							<li class="omni-trading-station-html5">
								<?php $account = 'login'; if($_COOKIE['email'] && !empty($_COOKIE['email'])) $account = 'account';  ?>
								<a href="<?PATH?><?=$account?>.php" target="_self">Личный кабинет</a>
							</li>
							<li class="omni-trading-station-html5">
								<a href="#" id="logout">Выход <i class="fa fa-sign-out" aria-hidden="true"></i></a>
							</li>
						
							<style type="text/css">
								@media screen and (max-width: 1100px){
								.reset1{
									display: none;
								}
							    }
							</style>
						</ul>
					</nav>
				</div><!-- .right -->
				
			</div>

		</div>

	</header>


	<style>
		 /* header */
	

	header{
		background: #283545;
		padding: 15px 0;
	}

	header .left img{
		width: 200px!important
	}

	header .content{
		justify-content: space-between;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	#omni-nav {
    display: block;
    position: relative;
    flex: 1 0 auto;
    padding: 0;
	}

	#omni-nav ul {
    overflow: hidden;
    margin: 0;
    font-size: 0;
    line-height: 0;
    text-transform: uppercase;
    text-align: right;
	}

	#omni-nav ul li {
    display: inline-block;
    position: relative;
    padding: 0 15px 0 15px;
    font-size: 0.8125rem;
    line-height: 1.5rem;
}

#omni-nav ul li a {
    color: white;
    text-decoration: none;
    display: block;
    font-weight: 400;
        font-size: 12px;
}

#omni-nav ul li:not(.first)::before {
    content: '';
    display: block;
    position: absolute;
    background-color: white;
    left: 0;
    top: 4px;
    bottom: 3px;
    width: 1px;
}


/* header */

	</style>
