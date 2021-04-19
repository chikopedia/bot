<?php
error_reporting(0);

function get_between($string, $start, $end) 
    {
        $string = " ".$string;
        $ini = strpos($string,$start);
        if ($ini == 0) return "";
        $ini += strlen($start);
        $len = strpos($string,$end,$ini) - $ini;
        return substr($string,$ini,$len);
    }

function random($length,$a) 
	{
		$str = "";
		if ($a == 0) {
			$characters = array_merge(range('0','9'));
		}elseif ($a == 1) {
			$characters = array_merge(range('0','9'),range('a','z'));
		}
		$max = count($characters) - 1;
		for ($i = 0; $i < $length; $i++) {
			$rand = mt_rand(0, $max);
			$str .= $characters[$rand];
		}
		return $str;
	}
	
while(1){

$imeix = 'LP19'.random(7,0).'SG';

header('Content-Type: text/plain; charset=utf-8');

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "https://www.tracking.my/singpost/$imeix");
curl_setopt($curl, CURLOPT_TIMEOUT, 10);
curl_setopt($curl, CURLOPT_POST, 0);
curl_setopt($curl, CURLOPT_HEADER, 1);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
$headersxx = array();
$headersxx[] = 'Authority: www.tracking.my';
$headersxx[] = 'Upgrade-Insecure-Requests: 1';
$headersxx[] = 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Mobile Safari/537.36 Edg/89.0.774.68';
$headersxx[] = 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9';
$headersxx[] = 'Sec-Fetch-Site: none';
$headersxx[] = 'Sec-Fetch-Mode: navigate';
$headersxx[] = 'Sec-Fetch-User: ?1';
$headersxx[] = 'Sec-Fetch-Dest: document';
$headersxx[] = 'Accept-Language: en-US,en;q=0.9';
curl_setopt($curl, CURLOPT_HTTPHEADER, $headersxx);
$out = curl_exec($curl);
curl_close ($curl);

$out = preg_split('/(\r?\n){2}/', $out, 2);
$headers = $out[0];
$headersArray = preg_split('/\r?\n/', $headers);
$headersArray = array_map(function($h) {
    return preg_split('/:\s{1,}/', $h, 2);
}, $headersArray);

$tmp = [];
foreach($headersArray as $h) {
    $tmp[strtolower($h[0])] = isset($h[1]) ? $h[1] : $h[0];
}
$headersArray = $tmp; $tmp = null;
// $headersArray contains your headers
$head = json_encode($headersArray);
$cookie = get_between($out[1], 'tracking: "', '",');
$hash = get_between($out[1], 'hash: "', '"');
$timestamp = get_between($out[1], 'timestamp: ', ',');

$url = "https://www.tracking.my/api/tracking";

$curlx = curl_init($url);
curl_setopt($curlx, CURLOPT_URL, $url);
curl_setopt($curlx, CURLOPT_POST, true);
curl_setopt($curlx, CURLOPT_RETURNTRANSFER, true);

$headers = array(
   "authority: www.tracking.my",
   "accept: application/json, text/javascript, */*; q=0.01",
   "x-requested-with: XMLHttpRequest",
   "user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Mobile Safari/537.36 Edg/89.0.774.68",
   "content-type: application/x-www-form-urlencoded; charset=UTF-8",
   "origin: https://www.tracking.my",
   "sec-fetch-site: same-origin",
   "sec-fetch-mode: cors",
   "sec-fetch-dest: empty",
   "referer: https://www.tracking.my/singpost/LP192333146SG",
   "accept-language: en-US,en;q=0.9",
   "cookie: XSRF-TOKEN=eyJpdiI6IndIc1RiWGJSalNIb2k4Zm5RcWg1XC9BPT0iLCJ2YWx1ZSI6ImVFVjE4bmxhSWVoMzdzWUllQ2lTK2w3dFhRZUthb2tDWmI1ZUJYWEw2b0JhWjZ3UTZhUkFkOXowRlwvclR1RFRNIiwibWFjIjoiNmM3Mjk2ZWZjNWM4YzkyYWIyOWQzMmE5ZmM0ZmJkODgzOWUwMWFiZGJmNGMzZWE1YmUxMjZmODhhN2YwMTIwNSJ9; trackingmy_session=eyJpdiI6ImRsWkU4aVpqWTJyRTQ4V2pta1pwR1E9PSIsInZhbHVlIjoia2ZDR1pFVUhzRW4wU1ZxUDU3K1dsR1RlOFp3UW9GWEpobG84eHZLTjlzalVLZlVPTWZqVlJNK2Vpdlh3ektUWCIsIm1hYyI6ImJiNGViNWNjMmU1YWQwM2UwZTdkNGZkNGQ3NDU2Mjk0NmVhYzEzOWI3ODIxMmI3NzhjYjIwZTY2Y2Y3YTI3OWMifQ%3D%3D; ats_referrer_history=%5B%22%22%5D; _pbjs_userid_consent_data=3524755945110770",
);
curl_setopt($curlx, CURLOPT_HTTPHEADER, $headers);

$data = "tracking=$cookie&timestamp=$timestamp&hash=$hash";

curl_setopt($curlx, CURLOPT_POSTFIELDS, $data);

//for debug only!
curl_setopt($curlx, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curlx, CURLOPT_SSL_VERIFYPEER, false);

$resp = curl_exec($curlx);
curl_close($curlx);


if (strpos($resp, 'in_transit')) {
$datax = json_decode($resp);
$latest = $datax->latest_status;
$date = $datax->result[0]->date;
$content = $datax->result[0]->content;
$resultnya = "$imeix - $date - $latest - $content";

            $log='logresi.txt';
            if(!file_exists( $log )) {
	        fopen($log,'a');
            }
	$alllog = "logresi.txt";
	$log_data2 = file($alllog, FILE_IGNORE_NEW_LINES);
	if(in_array($imeix, $log_data2)) {
	
	echo 'SKIPPED [has been saved]'.PHP_EOL;
	
	} else {
	
	file_put_contents($alllog, $imeix . "\n", FILE_APPEND);
    file_put_contents("hasilnya.txt", $resultnya.PHP_EOL, FILE_APPEND);
    echo $resultnya.PHP_EOL;
    
	}
} else {
	//echo 'RESI invalid'.PHP_EOL;
}
}

?>
