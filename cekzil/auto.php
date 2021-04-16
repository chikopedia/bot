<?php
function request($url, $data = null, $headers = null, $showheader = null)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    if($data):
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    endif;
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    if($headers):
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    endif;
    if($showheader):
        curl_setopt($ch, CURLOPT_HEADER, 1);

    endif;

    curl_setopt($ch, CURLOPT_ENCODING, "GZIP");
    return curl_exec($ch);

}

function kirim_telegram($message)
{
    $token = "1661435420:AAEDpf2d_onDKbERVykxh51jXUN66Kql9bs"; // Isi secret tokennya
    $chatIds = "1594215969"; // Isi id telegramnya
    $url = "https://api.telegram.org/bot" . $token . "/sendMessage?chat_id=" . $chatIds;
    $url = $url . "&text=" . urlencode($message);
    $ch = curl_init();
    $optArray = array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true
    );
    curl_setopt_array($ch, $optArray);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}


awal:
$file = file_get_contents("wallet.txt");
$lines  = file('wallet.txt');
$dataa = explode("\n",$file);
$baris = count($dataa);
$jumlah= 0; $live=0; $mati=0; $timeout=0;
for($a=0;$a<$baris;$a++){
	$jumlah+=1;
    $data1 = explode('\n',$dataa[$a]);
    $address = $data1[0];
$url = "https://api.viewblock.io/zilliqa/addresses/$address/txs?page=1&network=mainnet&type=tokens";
$headers = array();
$headers[] = "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0";
$headers[] = "Accept: application/json";
$headers[] = "Accept-Language: id,en-US;q=0.7,en;q=0.3";
$headers[] = "Accept-Encoding: gzip, deflate";
$headers[] = "Content-Type: application/json";
$headers[] = "Origin: https://viewblock.io";
$headers[] = "Connection: close";
$check = request($url, null, $headers);
if(strpos($check, 'PORT')!==false)
{
    echo "Landing\n";
    kirim_telegram("Landing $address");
    $result = '';
foreach($lines as $line) {
    if(stripos($line, $address) === false) {
        $result .= $line;
    }
}
file_put_contents('wallet.txt', $result);
}
else
{
    echo "Blom landing\n";
}
}
sleep(18000);
goto awal;
