<?php

define( 'DOING_CRON', true );

$date = new DateTime('now');
$date = (clone $date)->format('d-m-Y H:i:s');

$fp = fopen(__DIR__.'/cron.txt', 'w');
fwrite($fp, 'yes we can :: '.$date.' -- ');
fclose($fp);