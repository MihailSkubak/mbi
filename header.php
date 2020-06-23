<head>
	 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title> MBI</title>
<link rel="shortcut icon" href="img/base/favicon.ico" />
<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height">

<!-- / Yoast SEO plugin. -->

 <!--<link rel='stylesheet' id='wp-block-library-css'  href='it/wp-includes/css/dist/block-library/style.min.css?ver=5.3.2' type='text/css' media='all' />-->



<link rel='stylesheet' id='boilerplate-normalize-css'  href='css/normalize.css' type='text/css' media='all' />
<link rel='stylesheet' id='boilerplate-main-css'  href='css/mainven.css' type='text/css' media='all' />
<link rel='stylesheet' id='lightcase-css'  href='css/lightcase-no-breakpoint.css' type='text/css' media='all' />
<link rel='stylesheet' id='vendor-flag-css'  href='css/flag-icon.min.css' type='text/css' media='all' />
<link rel='stylesheet' id='google-fonts-css'  href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed%3A300%2C700%7COpen+Sans%3A300%2C400%2C600%2C700&#038;display=swap&#038;subset=greek%2Cgreek-ext%2Clatin-ext&#038;ver=1.0' type='text/css' media='all' />
<link rel='stylesheet' id='theme-parent-styles-css'  href='css/styleBase.css' type='text/css' media='all' />
<!--<link rel='stylesheet' id='theme-child-styles-css'  href='css/styleIT.css' type='text/css' media='all' />-->
<link rel='stylesheet' id='main-styles-css'  href='css/mainAsC.css' type='text/css' media='all' />
<link rel='stylesheet' id='module-stylesheet-home-css'  href='css/home.min.css' type='text/css' media='all' />
<link rel='stylesheet' id='module-stylesheet-financial-markets-moving-fast-css'  href='css/financial-markets-moving-fast.min.css' type='text/css' data-rel="default-journey" media='all' />
<!-- <script  src='//redirect.fxcm.com/geo.js?ver=1.0'></script> -->

<script  src='js/modernizr.min.js'></script>
<link rel="preload" href="jquery/jquery-3.2.1.min.js" as="script">

<!-- <link rel="preload" href="//media.fxcm.com/script/fxcm_lib.js?package=fxpress&ver=1.3.279" as="script"> -->

<!--<link rel="preload" href="js/site.js" as="script">-->
<link rel="preload" href="css/mainAsC.css" as="style">

</head>


<script>
/*global fxcm_gtm*/

(function ( w, d, s, l, i ) {
w[ l ] = w[ l ] || [];
w[ l ].push( {
'gtm.start' : new Date().getTime(), event : 'gtm.js'
} );
var f = d.getElementsByTagName( s )[ 0 ],
j = d.createElement( s ),
dl = l != 'dataLayer' ? '&l=' + l : '';
j.async = true;
j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
f.parentNode.insertBefore( j, f );
})
/*( window, document, 'script', 'dataLayer', fxcm_gtm.container_id );*/
</script>

<body class="home page-template-default page page-id-5 site-it alias-home flush-top" >



<!-- [ HEADER ] -->
<header id="global-header">
<!-- [ ESMA/TOP-LEVEL DISCLAIMER ] -->

<style>
	.anniversary{
		padding-bottom: 10px;
	}
</style>
<div class="header-inner">
<div class="header-pre-canvas">
<section class="header-persistent-wrapper clearfix">
<div class="grid-container">
<div class="row">
<div class="grid-100">
	<div class="header-persistent-inner">
		<div id="fxcm-logo" class="anniversary">
			<a href="/"><img src="img/base/mbi-white-logo.svg" alt="International Company"></a>
		</div>
		<nav id="omni-nav">
			<ul class="reset1">
				<li class="omni-trading-station-free-demo">
					<a href="registration.php" target="_self">Скачать терминал</a>
				</li>
				<li class="omni-trading-station-free-demo">
					<a href="registration.php" target="_self">Войти в WEB-Trader</a>
				</li>
				<li class="omni-trading-station-html5">
					<?php /*$account = 'login'; if($_COOKIE['email'] && !empty($_COOKIE['email'])) $account = 'account'; */ ?>
					<!--<a href="<?=$account?>.php" target="_self">Личный кабинет</a>-->
					<a href="login.php" target="_self">Личный кабинет</a>
				</li>
				<li class="omni-open-account">
					<a href="registration.php" target="_self">Регистрация</a>
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
        <?php include "languages.php"; ?>
		<div id="main-nav-mobile-toggle" class="desktop-hide">
			<a href="#navOpen" data-mobile-nav-trigger>
				<i class="ico ico-main-nav-hamburger"></i>
			</a>
		</div>
	</div>
</div>
</div>
</div>
</section>

</div>

<div class="header-canvas">
<!--<section id="header-background">
<ul class="reset main-nav-backgrounds">
<li data-nav-rel="trading" id="nav-bg-trading" class="nav-bg">
<div class="nav-group-bg-img">
	<img src="fxpress/fxcmcom/base/components/main_nav/trading.jpg?fit=crop&auto=webp&width=1200&height=600" class="fxp-image" alt="Trading" />
</div>
</li>
<li data-nav-rel="markets" id="nav-bg-markets" class="nav-bg">
<div class="nav-group-bg-img">
	<img src="fxpress/fxcmcom/base/components/main_nav/markets.jpg?fit=crop&auto=webp&width=1200&height=600" class="fxp-image" alt="Mercati" />
</div>
</li>
<li data-nav-rel="knowledge" id="nav-bg-knowledge" class="nav-bg">
<div class="nav-group-bg-img">
	<img src="fxpress/fxcmcom/base/components/main_nav/knowledge.jpg?fit=crop&auto=webp&width=1200&height=600" class="fxp-image" alt="Formazione" />
</div>
</li>
<li data-nav-rel="clients" id="nav-bg-clients" class="nav-bg">
<div class="nav-group-bg-img">
	<img src="fxpress/fxcmcom/base/components/main_nav/clients.jpg?fit=crop&auto=webp&width=1200&height=600" class="fxp-image" alt="Clienti" />
</div>
</li>
<li data-nav-rel="about" id="nav-bg-about" class="nav-bg">
<div class="nav-group-bg-img">
	<img src="fxpress/fxcmcom/base/components/main_nav/about-us.jpg?fit=crop&auto=webp&width=1200&height=600" class="fxp-image" alt="Riguardo a FXCM" />
</div>
</li>
</ul>
</section> -->
<div class="otstup">	
<section id="header-foreground">
<div class="grid-container">
<div class="row">
<div class="grid-80">
	<style>	
		.otstup{
			width: 100%;
			max-width: 1230px;
			margin: 0 auto;
			display: flex;
		}
		.fnt{
			font-weight: bold;
		}
		#header-foreground{
			width: 95%;
		}
		#main-nav ul li {
        display: block;
        position: relative;
        padding: 0;
}
	</style>
	<nav id="main-nav" data-main-nav-list>
		<ul class="reset">
			<li data-nav-rel="page-contact-client-support" class="menu-item-contact-client-support menu-item-type-page">
				<a data-main-nav-link href="registration.php" target="_self"><span data-nav-pointer-target="page-contact-client-support" class="fnt">Скачать терминал</span></a>
			</li>
			<li data-nav-rel="page-contact-client-support" class="menu-item-contact-client-support menu-item-type-page">
				<a data-main-nav-link href="registration.php" target="_self"><span data-nav-pointer-target="page-contact-client-support" class="fnt">Войти в WEB-Trader</span></a>
			</li>
			<li data-nav-rel="page-contact-client-support" class="menu-item-contact-client-support menu-item-type-page">
				<a data-main-nav-link href="login.php" target="_self"><span data-nav-pointer-target="page-contact-client-support" class="fnt">Личный кабинет</span></a>
			</li>
			<li data-nav-rel="page-contact-client-support" class="menu-item-contact-client-support menu-item-type-page">
				<a data-main-nav-link href="registration.php" target="_self"><span data-nav-pointer-target="page-contact-client-support" class="fnt">Регистрация</span>
				<hr></a>
			</li>
			<li data-nav-rel="trading" class="">
				<a href="tools-and-terms.php" target="_self">Инструменты/Условия</a>
			</li>
			<li data-nav-rel="markets" class="">
				<a href="platforms.php" target="_self">Торговые платформы</a>
			</li>
			<li data-nav-rel="knowledge" class="">
				<a href="education.php" target="_self">Обучение</a>
			</li>
			<li data-nav-rel="clients" class="">
				<a href="about-us.php" target="_self">О нас</a>
			</li>
			<li data-nav-rel="bookmark-fxcm-pro" class="menu-item-fxcm-pro menu-item-type-bookmark">
				<a href="news.php" target="_self">Новости</a>
			</li>	
			<li data-nav-rel="about" class="">
				<a href="info.php" target="_self">Информация</a>
			</li>
		</ul>
	</nav>
</div>
</div>
</div></section></div>	
</div></div></header>
</body>