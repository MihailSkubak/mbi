<!DOCTYPE html>
<html lang="en">

<style type="text/css">
#frame{
    overflow: hidden;
    width:100%;
}
@media screen and (max-width: 900px) {
	iframe{
		height: 1530px;
	}
}
</style>
<script type="text/javascript">
    function loadFrame(){
        document.getElementById('frame').scrollTop = 310;
        document.getElementById('frame').scrollLeft = 40;
    }
</script>
 <?php include "header.php"; ?>
<body onload="loadFrame()">
 
<div id="frame">
<iframe  src="https://st24invest.com/lentapage" width="100%" height="1505" scrolling="no" style="margin-top: -180px; margin-bottom: 40px;"></iframe>
</div>

	
</body>
<?php include "footer.php"; ?>
</html>