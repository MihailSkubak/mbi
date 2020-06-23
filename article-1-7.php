<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" href="css/articles.css">
	<?php include "header.php"; ?>
<body>
	
	<main>
		<div class="container">
			<div class="cont100">
				<h2 style=" font-size: 30px;  text-align: center; padding-bottom: 20px;">Как зафиксировать прибыль и ограничить убытки? </h2>
				<p>По понятным причинам мы не можем постоянно следить за движением курса валют. Для того, чтобы открытые позиции не оставались без контроля, используются специальные инструменты — ордера. Ордер — это четко сформулированный приказ дилинговому центру на совершение определенной сделки (покупки или продажи) в определенном количестве и по конкретной валютной паре, как только цена (валютный курс) вырастет или упадет до обозначенного трейдером значения. Это очень удобно, так как мы можем использовать ордера как для своевременного входа в рынок (открытия позиции), так и для своевременного выхода из него (закрытия позиции).</p>
				<h2>В ситуации, когда мы используем ордер для выхода из рынка (закрытия позиции), принято выделять два вида ордеров:</h2>
				<ul>
					<li>стоп-лосс (Stop-Loss, S-L) — дословно переводится «остановить убытки». Этот ордер предназначен для минимизации потерь, в том случае, если цена начала двигаться в убыточном направлении. Если валютный курс достигнет этого значения (обозначенного на графике), позиция закроется автоматически;</li>
					<li>тэйк-профит (Take-Profit, T-P) — дословно переводится «взять прибыль». Тэйк-профит предназначен для получения прибыли при достижении валютным курсом прогнозируемого уровня (обозначенного на графике). Исполнение данного ордера приводит к закрытию позиции.</li>
				</ul>
				<p>Рассмотрим пример. Предположим, что мы совершили покупку объемом в 10 000 USD (долларов США) за CHF (швейцарские франки) по цене 1.2049. При этом в данной сделке мы не хотим получить убытки больше чем $20. И в случае правильности нашего прогноза хотим зафиксировать прибыль не меньше чем 60 USD. Для этого мы используем ордера Стоп-лосс и Тэйк-профит. Из предыдущей части мы знаем как рассчитать стоимость одного пункта.</p>
				<h2>Валютная пара: USD/CHF; лот: 10 000; текущий курс USD/CHF = 1.2049
Стоимость пункта = (10 000*0.0001) / 1.2049 = $0.82.
</h2>
				<h2>Расчет местоположения ордера Stop Loss: 20 / 0.82 = 24 пункта => 
Stop Loss = 1.2049 – 0.0024 = 1.2025.
</h2>
				<h2>Расчет местоположения ордера Take Profit: 60 / 0.82 = 73 пункта => 
Take Profit = 1.2049 + 0.0073 = 1.2122.
</h2>
<p>Для валютных пар, где котируемой валютой является доллар США (EUR/USD, GBP/USD, NZD/USD, AUD/USD), курс валюты котировки к доллару США равен 1, поэтому стоимость пункта не зависит от размеров лота и всегда равна 1 USD. Пример:</p>
<h2>Валютная пара: GBP/USD; лот: 10 000; USD/USD = 1;
стоимость пункта = (10 000*0.0001) / 1 = $1. 
</h2>
<p>При расчете стоимости пункта для кросс-курсов надо брать именно курс котировки к USD, а не к базовой валюте пары. При этом на кросс-курсы, в которых котируемой валютой является GBP или EUR, курс валюты котировки к USD — это прямые курсы пар USD/GBP и USD/EUR. Соответственно USD/GBP = 1/(курс GBP/USD).</p>
<h2>Валютная пара: EUR/JPY; лот: 100 000; курс USD/JPY = 132.58; 
стоимость пункта = (100 000 *0.01) / 132.58 = $7.54. 
</h2>
<h2>Валютная пара: EUR/GBP; лот: 20 000; курс GBP/USD = 1.4228; курс USD/GBP = 1 / (Курс GBP/USD) = 1 / 1.4228 = 0.7028; 
стоимость пункта = (20 000 *0.0001) / 0.7028 = $2.85.
</h2>
<h2>Вывод: с помощью ордеров Stop Loss и Take Profit всегда можно зафиксировать прибыль или установить размер возможных убытков. 
</h2>
<p>Это ордера немедленного исполнения. В случае, если мы не хотим ждать, когда цена дойдет до определенной отметки, а хотим, чтобы сделка открылась автоматически, мы будем устанавливать отложенные ордера. Или отложенные приказы.</p>
<h2>Различают четыре отложенных ордера: Buy Stop, Buy Limit, Sell Stop, Sell Limit.</h2>
<p>Давайте по порядку. </p>
<p>
	Если мы будем покупать, то используем ордера Buy, если продавать — Sell.
</p>
 <p>
Дальше — еще проще. 
</p>
<p>Ордер Buy Stop</p>
<img src="img/articles/Graphic_08.png" alt="08">
<p>Мы прогнозируем рост курса, но мы не хотим ждать, когда цена дойдет до указанной отметки. Ставим ордер Buy Stop, и наша сделка откроется автоматически при достижении указанного нами уровня цены.</p>
<p>Ордер Buy Limit</p>

<img src="img/articles/Graphic_09.png" alt="09">
<p>Мы также прогнозируем рост, но в данном случае предполагаем, что цена сначала пойдет в обратном направлении. Ставим ордер Buy Limit. Как только цена повернется в нужную нам сторону, откроется сделка, и мы заработаем больше, чем, если бы ждали прихода цены в прежнюю точку отсчета. </p>
<p>
Точно также с ордерами Sell.
</p>
<p>Ордер Sell Stop</p>
<img src="img/articles/Graphic_10.png" alt="10">
<p>Мы прогнозируем понижение цены до определенного уровня, после которого цена начнет понижаться. Ставим ордер Sell Stop. И наш приказ срабатывает на продажу, когда цена доходит до указанной нами точки.</p>
<p>Ордер Sell Limit.</p>
<img src="img/articles/Graphic_11.png" alt="11">
<p>В данном случае мы прогнозируем падение после роста. Чтобы не ждать, когда это произойдет, мы поставим ордер Sell Limit. Когда цена развернется и начнет движение в нужном нам направлении, откроется короткая позиция.</p>
<p>Вывод: теперь мы знаем, как не теряя времени, открыть позиции с помощью отложенных ордеров. В случае, если мы захотим оставить открытую позицию на сутки или более, нужно познакомиться с термином своп (swap). Давайте разберемся, что он означает.</p>
<p>Своп — это перенос брокером открытой позиции на следующий день (смена даты валютирования, открытой позиции), для того, чтобы трейдер мог избежать реальной поставки валюты покупателю или продавцу. Перенос происходит в 00.00 по времени сервера брокера. Так как валютная пара состоит из двух валют (две страны с разными процентными ставками), и какая-то из них будет обладать большей инвестиционной привлекательностью (если у нее ставка выше) по отношению к другой, за этот перенос брокер либо списывает, либо начисляет на открытую позицию определенную сумму. Если трейдер покупает валюту, у которой ставка выше, чем у той, за которую он ее покупает, то своп будет положительным, если меньше — то отрицательным. </p>
<p>
	Например, если трейдер купил EUR за USD: ставка ЕЦБ (Европейского Центробанка) 3.5%; ставка ФРС (Федеральной Резервной Системы) 5.25%.
</p>
 <p>
Так как трейдер купил валюту, у которой ставка меньше, чем у второй валюты, своп будет отрицательным. Точную величину свопа определяет брокерская компания. В данном случае 0.67 пункта будет списано с результата открытой позиции за каждый день переноса. В случае, если трейдер торгует на понижение по этой валютной паре, своп будет положительным и составит 0.44 пункта.
</p>
<h2>Ну как, разобрались? Отлично.</h2>
<p>Своп на каждую валютную пару можно посмотреть в терминале.</p>
			</div>
		</div>
	</main>
	
</body>
<?php include "footer.php"; ?>
</html>