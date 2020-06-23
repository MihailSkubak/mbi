<!DOCTYPE html>
<html lang="en">

    <style>
    	body{
    		font-family: 'Open Sans', sans-serif;
    	}
    	#TradingStation{
    		background: #F6F7F8;
    	}
    	#TradingStation2{
    		background: #F6F7F8;
    	}
	    .container{
			width: 100%;
			max-width: 1170px;
			margin: 0 auto;
		}
		.cont1{
			padding-top: 80px;
			padding-bottom: 40px;
		}
		.cont2{
			display: flex;
			justify-content: space-between;
			padding-top: 40px;
			padding-bottom: 40px;
		}
		.contt2{
			display: flex;
			justify-content: space-between;
			padding-top: 40px;
			padding-bottom: 40px;
		}
		.cont2_item{
			width: 50%;
		}
		.conteted{
			text-align: center;
			margin-top: 80px;
		}
		.cont3{
			display: flex;
		}
		@media screen and (max-width: 900px) {
			.cont2{
				display: flex;
				flex-direction: column-reverse;
			}
			.contt2{
				display: flex;
				flex-direction: column;
			}
			.cont2_item{
			width: 100%;
		}
		.container{
			padding: 0px 20px;
		}
		}
		.rega-btn-block{
			text-align: right;
			margin-top: -30px;
			margin-bottom: 50px;
		}
		.regal-btn {
    font-size: 18px;
    background: #01ABB5;
    color: #fff;
    width: 35%;
    padding: 15px 10%;
    margin: 0 auto;
    margin-top: 40px;
    text-decoration: none;
}
@media screen and (max-width: 900px) {
  .regal-btn {
    width: 100%;
  }
  .rega-btn-block{
  	text-align: center;
  }
}
.regal-btn:hover {
    background: #283545;
    color: #F4AD03;
}

	</style>
	<?php include "header.php"; ?>
<body>
	
	<section id="TradingStation">
		<div class="container">
			<div class="cont1">
				<h2>Trading Station 2, торговая платформа от компании MBI</h2>
				<p>Торговая платформа Trading Station 2 - уникальная разработка компании MBI, существующая в трех разновидностях: как web-платформа, как приложение для стационарных компьютеров и как приложение для мобильных устройств (смартфонов). 

					Котировки поступают на платформу Тrading Station 2 напрямую с рынка и меняются в режиме реального времени, без посредничества дилеров. 

					В Trading Station предусмотрена возможность LAMM и PAMM управления. PAMM (Percentage Allocation Management Module) представляет собой модуль процентного распределения. LAMM (Lot Allocation Management Module) – это модуль распределения лотов. До недавнего времени LAMM использовался только на западном финансовом рынке, однако некоторыми биржевыми площадками было принято решение о введении LAMM на российский рынок услуг.

					Вы имеете возможность получать подтверждения о совершении сделок и следить за историей Ваших сделок. Кроме осуществления перечисленных выше сделок, Trading Station 2 предоставляет пользователю возможность в реальном времени получать актуальную информацию о процентных ставках и валютных курсах.

				Еще одна важная опция платформы: посредством Trading Station 2 Вы получаете доступ к электронным вариантам анализов макроэкономики и валютных рынков, составляемых аналитиками группы SEB.</p>
			</div>
		</div>
	</section>
	<section>
		<div class="container">
			<h2 style="text-align: left; padding-top: 40px;">Преимущества платформы :</h2>
			<div class="cont2">
				<div class="cont2_item">
					
					<ul>
						<li>Отсутсвие реквот</li>
						<li>Возможность открытия сделки внутри спреда </li>
						<li>Установка скользящего стоп-ордера</li>
						<li>Мониторгинг маржинального залога и ролловера</li>
						<li>Возможность хеджирования</li>
						<li>Открытия сделки одни кликом</li>
						<li>Круглосуточный доступ к информации о сделках</li>
					</ul>
				</div>
				<div class="cont2_item">
					<img src="img/platforms/web-platform-logo.png" alt="FXCM">
				</div>
			</div>
			
		</div>
	</section>
	<section id="TradingStation2">
		<div class="container">
			<h2 style="text-align: center; padding-top: 40px;">Trading Station 2 стационарная платформа </h2>
			<div class="contt2">

				<div class="cont2_item">
					<img src="img/platforms/downloaded-platform-logo.png" alt="FXCM">
				</div>
				<div class="cont2_item">
					
					<ul>
						<li>Большой выбор индикаторов</li>
						<li>Расширенный бек-тестинг </li>
						<li>Большой выбор советников и инструментов для анализа рынка  </li>
					</ul>
					<div class="conteted">
						<div class="rega-btn-block">
							<a href="registration.php" class="regal-btn">Скачать платформу</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section>
		<div class="container">
			<h2 style="text-align: center; padding-top: 40px;">Trading Station веб-платформа </h2>
			<div class="contt2">

				<div class="cont2_item">
					<img  src="img/platforms/web-platform-2-logo.png" alt="logos">
				</div>
				<div class="cont2_item">
					
					<p>Веб-платформа Trading Station позволяет легко и быстро получить точную информацию на валютном рынке и обеспечивает удобную торговлю на рынке Форекс из любой точки мира .</p>

					<div class="conteted">
						<div class="rega-btn-block">
	              <a href="registration.php" class="regal-btn">Запустить платформу</a>
               </div>
					</div>
				</div>
			</div>
		</div>
	</section>
	
</body>
<?php include "footer.php"; ?>
</html>