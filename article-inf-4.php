<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" href="css/articles.css">
	<?php include "header.php"; ?>
<body>
	
	<main>
		<div class="container">
			<div class="cont100">
				<h1 style=" text-align: center; padding-bottom: 20px;">Расчет фондовых индексов</h1>
				<div style="display: flex; justify-content: center;">
					<img src="img/information/4.png" alt="1" style="
				width: 100%; max-width: 300px;">
				</div>
				<p>4 метода вычисления индексов</p>
				<ul>
					<li>Одним из старейших способов расчета индексов является метод среднего арифметического. У подобного метода есть плюсы, главными из которых являются простота расчета и скорость реакции на сильные колебания цен акций, которые происходят, к примеру, во время выхода важных экономических новостей или кризисов. <br> Минусом же является отсутствие взвешивания. Наибольшее влияние на индекс оказывают самые дорогие акции, а изменение цен самых дешевых почти не отражается на его значении. При этом цена самих акций не влияет напрямую на капитализацию компании. Так, у компании, одна акция которой стоит дорого, капитализация может быть меньше, чем у эмитента более дешевой акции. По такой схеме рассчитываются, например, индекс Dow Jones и японский индекс Nikkei.</li>
					<li>Другим способом расчета является метод вычисления взвешенного среднего арифметического с использованием различных способов взвешивания. Такая методика -взвешивание по рыночной капитализации используется для вычисления индекса рейтингового агентства Standard & Poor’s (S&P 500) и охватывает примерно 80% общей капитализации компаний, торгуемых на Нью-Йоркской фондовой бирже. Капитализация компаний в выборке составляет от $ 73 миллионов до $ 75 миллиардов.</li>
					<li>Встречается метод вычисления невзвешенного среднего геометрического, он нужен, если стоимость самих акций сильно отличается и при этом их очень много в конкретном индексе. При среднем геометрическом, динамика двух акций, одна из которых стоит $ 10 и выросла на доллар и вторая, которая $100 и выросла на два доллара, будет меньше и значит более объективна, чем при усреднении среднем арифметическом, которая покажет динамику индекса больше. По этому методу рассчитывается старейший фондовый индекс Великобритании ФТ-30 (FT-30 Share Index, Financial Times Industrial Ordinary Index).</li>
					<li>Ещё один метод, это вычисления взвешенного среднего геометрического. Эта формула применяется для расчета композитного индекса Value Line Composite Average, используемого на фондовом рынке США.</li>
				</ul>
			</div>
		</div>
	</main>
	
</body>
<?php include "footer.php"; ?>
</html>