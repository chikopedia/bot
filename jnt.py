#!/bin/bash


banner

merah='\e[91m'
cyan='\e[96m'
kuning='\e[93m'
oren='\033[0;33m' 
margenta='\e[95m'
biru='\e[94m'
ijo="\e[92m"
putih="\e[97m"
normal='\033[0m'
bold='\e[1m'
labelmerah='\e[41m'
labelijo='\e[42m'
labelkuning='\e[43m'
labelpp='\e[45m'
pp=0
cat << "thanks"
         Thanks : Extreme Crew - ccoocoot ccoocot
                  XAYNET - SGBTeam - Rumah Sakit Jiwa
                  
                  
thanks


	
port80(){
    time=$(date +%d_%m_%y)
    token="1484431884:AAFhAY9rh8O_qmgM5l3xoY8mggDW13Baick"
    chatid="782664019"
    empas="${biru}${1}/${2}"
    stats="${margenta}[$(date +"%T")]"
    rand1=$(cat /dev/urandom | tr -dc '0-9' | fold -w 10 | head -n 1)
      no=$(echo "JP$rand1")
          gass=$(curl -s "https://api.cariresi.id/cariresi/" -X POST \
          -H "user-agent: Mozilla/5.0 (Linux; Android 10; Redmi Note 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Mobile Safari/537.36" \
          -H "content-type: application/json;charset=UTF-8" \
          -H "referer: https://cariresi.id/" \
          -H "token-key: o6Z8VBuLlS19NuRMO9gMg2jncnV61zif" \
          -H "referer: https://login.siteground.com/password" \
          -H "accept: application/json, text/plain, */*" \
          -d "{\"awb\":\"$no\",\"courier\":\"jnt\"}")
          status=$(echo "$gass" | grep -Po '(?<="code":)[^"]*')
          if [[ $status =~ "200" ]]; then
          date=$(echo "$gass" | grep -Po '(?<="date":")[^"]*' | head -n 1)
          name=$(echo "$gass" | grep -Po '(?<="receiver_name":)[^"]*' | head -n 1)
          deliv=$(echo "$gass" | grep -Po '(?<="status":")[^"]*' | head -n 1)
          echo -e "$no | Tanggal: $date | $deliv\n"
          echo -e "$no | Tanggal: $date | $deliv" >> resi_jnt.txt
          else
          echo -e "$no | $status"
          fi
    
    
		
	
}




printf "${white}[+] Mau berapa : "; read limit
printf "${white} '-> Jumlahnya ${bgreen} $limit ${cbg}\n"
printf "${white}[+] Threads          : "; read THREADS
printf "${white} '-> Set Threads To ${bgreen} $THREADS ${cbg}\n"
for (( i = 0; i < $limit; i++ )); do
  index=$((itung++))
    username="${mailist[$i]}"
    IFS=':' read -r -a array <<< "$username"
    email=${array[0]}
    password=${array[1]}
   tt=$(expr $pp % $THREADS)
   if [[ $tt == 0 && $pp > 0 ]]; then
   sleep 5
   fi
   let pp++
   jam=$(date '+%H')
   menit=$(date '+%M')
   detik=$(date '+%S')
   

	port80 "${email}" "${password}" "${index}" &
	
	
	
	
done
wait
