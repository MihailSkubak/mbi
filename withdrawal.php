<?php 

include ('config.php');
include ('controller/controller.php'); 

include 'header_account.php'; 
?>


 <section id="withdrawal">
<?php if($_COOKIE['email'] && !empty($_COOKIE['email'])): ?>
	<div class="container">
		
		<h2>Вывод средств</h2>


		<table id="withdrawal-tbl">
			<tr class="title">
				<td>Способ оплаты</td>
				<td>Валюта</td>
				<td>Комиссия</td>
				<td>Срок перевода</td>
				<td>Вывод средств</td>
			</tr>
			<tr>
				<td>Bank transfer</td>
				<td>USD, RUB, EUR</td>
				<td>3%</td>
				<td>7-14 working days</td>
				<td>
					<button>Вывести средства</button>
				</td>
			</tr>
			<tr>
				<td>Visa/MasterCard</td>
				<td>USD</td>
				<td>0-2%</td>
				<td>3-5 working days</td>
				<td>
					<a href="<?=PATH?>visa.php">
						<button>Вывести средства</button>
					</a>
				</td>
			</tr>
		</table>
	</div>

	<?php else: ?>
<div class="container">
	<h2>Войдите в Личный кабинет</h2>
	<?php endif; ?>
</div>
</section>



<style>
	
	#withdrawal{
		margin: 25px auto 75px auto;
	}

	#withdrawal h2{
		text-align: center;
	}

	#withdrawal-tbl td{
		text-align: center;
	}

	#withdrawal-tbl tr.title td{
		text-align: center;
	    background: #3D4957;
	    color: #fff;
	}
	
	#withdrawal-tbl button{
		width: 170px;
    height: 35px;
    margin: 5px auto;
    background: #01ACB6;
    border: 2px solid black;
    color: #fff;
	}
	
</style>


<?php include('footer.php'); ?>