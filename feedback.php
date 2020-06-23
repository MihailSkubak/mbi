<!DOCTYPE html>
<html lang="en">

    <style>
    	body{
    		font-family: 'Open Sans', sans-serif;
    	}
	    .container{
			width: 100%;
			max-width: 1170px;
			margin: 0 auto;
		}
		.cont2{
			display: flex;
			justify-content: space-between;
			padding-top: 40px;
		}
		@media screen and (max-width: 900px) {
			.cont2{
				display: flex;
				flex-direction: column-reverse;
				padding-top: 0px;
			}
			.cont2_item{
			width: 100%;
		}
		.cont2_item{
			text-align: center;
		}
			.container{
			padding: 0px 20px;
		}
		}
	</style>
	<?php include "header.php"; ?>
<body>
	
	<main>
		<div class="container">
			<h1 style="text-align: center; padding-top: 40px;">Обратная связь</h1>
			<div class="cont2">
				
				<div class="cont2_item">
			    <p>Вы всегда можете связаться с нами по любым интересующим вас вопросов 24/7</p>
			    <p>Тел: +441440400025, +442080681922</p>
			    <p>Почта: <a href="mailto:support@fxmanor.com">support@mbi.work</a></p>
				</div>
				<div class="cont2_item">
					<img src="img/base/support.png" alt="FXCM">
				</div>
			</div>
		</div>
	</main>
	
</body>
<?php include "footer.php"; ?>
</html>