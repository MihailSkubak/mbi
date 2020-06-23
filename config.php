<?php

// домен
/*define('PATH', 'https://mbi.work/');*/

// UTIP_RAND_PARAM
define('UTIP_RAND_PARAM', rand(1000000, 99999999));

// UTIP_KEY
define('UTIP_KEY', md5('skjw7346s@d' . UTIP_RAND_PARAM));




/*
// сервер БД
define('HOST', 'localhost');

// пользователь
define('USER', 'root');

// пароль
define('PASS', '');

// БД
define('DB', 'st24investnew');

// название магазина - title
define('TITLE', 'invest');

// email администратора
define('ADMIN_EMAIL', 'admin@ishop.com');

// количество товаров на страницу
define('PERPAGE', 9);

$link = mysqli_connect(HOST, USER, PASS, DB);
if(!$link){
	printf("Неверное подключение к базе данных. Код ошибки: %s \n", mysqli_connect_erorr());
	exit();
}

mysqli_set_charset($link, "utf8") or die("Не установлена кодировка");
*/


?>