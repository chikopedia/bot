const fetch = require('node-fetch');
const readline = require('readline-sync')
const {gzip, ungzip} = require('node-gzip');
const { v4: uuidv4 } = require('uuid');
var random = require('random-name');
const cheerio = require("cheerio")
var randomize = require('randomatic');
const crypto = require('crypto');
const moment = require('moment')
const chalk = require('chalk');
var jwt = require('jsonwebtoken');
var { SocksProxyAgent } = require('socks-proxy-agent'); 
const fs = require('fs-extra')

const functionGetDomain = () => new Promise((resolve, reject) => {

    fetch('https://www.1secmail.com/api/v1/?action=getDomainList', { 
        method: 'GET',
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetId = (abc, cab) => new Promise((resolve, reject) => {

    fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${abc}&domain=${cab}`, { 
        method: 'GET',
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionSendOtp = (email, hreq) => new Promise((resolve, reject) => {
    const bodys = {
        SignInRequest: "EmailBased",
        email: email
    }

    fetch('https://deals.hopper.com/api/v2/auth/sign_in', { 
        method: 'PUT',
        body: JSON.stringify(bodys),
        headers: {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'content-length': 69,
            'content-type': 'application/json',
            'h-request': hreq,
            'origin': 'https://deals.hopper.com',
            'referer': 'https://deals.hopper.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionVerifOtp = (email, otp, token, hreq) => new Promise((resolve, reject) => {
    const bodys = {
        VerifyCodeRequest: "EmailBased",
        code: otp,
        email: email,
        token: token
    }

    fetch('https://deals.hopper.com/api/v2/auth/check_verification_code', { 
        method: 'PUT',
        body: JSON.stringify(bodys),
        headers: {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'content-length': 69,
            'content-type': 'application/json',
            'h-request': hreq,
            'origin': 'https://deals.hopper.com',
            'referer': 'https://deals.hopper.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionFinalize = (tokenVerif, nomor, hreq) => new Promise((resolve, reject) => {
    const bodys = {
        FinalizeRequest: "Phone",
        firstName: random.first(),
        lastName: random.last(),
        phoneNumber: nomor,
        token: tokenVerif
    }

    fetch('https://deals.hopper.com/api/v2/auth/finalize', { 
        method: 'PUT',
        body: JSON.stringify(bodys),
        headers: {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'content-length': 69,
            'content-type': 'application/json',
            'h-request': hreq,
            'origin': 'https://deals.hopper.com',
            'referer': 'https://deals.hopper.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionInputReff = (request, userId, reffCode) => new Promise((resolve, reject) => {
    const bodys = {
        "referralCode": reffCode,
        "entryScreen": {
            "value": "FRIENDS_ENTRY_SCREEN_REFERRAL_CODE_INPUT"
        }
    }

    fetch(`https://mobile-api.hopper.com/api/v2/friends`, { 
        method: 'PUT',
        body: JSON.stringify(bodys),
        headers: {
            'Host': 'mobile-api.hopper.com',
            'x-user-id': userId,
            'x-build-number': '117384',
            'x-locale': 'en_US',
            'x-currency': 'USD',
            'x-timezone': 'America/Chicago',
            'h-request': request,
            'content-type': 'application/json; charset=UTF-8',
            'content-length': 34,
            'accept-encoding': 'gzip',
            'user-agent': 'okhttp/4.9.3',
            'accept-language': 'en-US;q=1.0, id-ID;q=0.9',
            'x-client-request-id': uuidv4()
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetLink = (abc, cab, id) => new Promise((resolve, reject) => {
    fetch(`https://www.1secmail.com/mailbox/?action=readMessageFull&id=${id}&login=${abc}&domain=${cab}`, {
           method: "get"
       })
    .then(res => res.text())
    .then(text => {
        const $ = cheerio.load(text);
        const src = $("#templateContainer > tbody > tr > td > table.mcnTextBlock > tbody > tr > td > table > tbody > tr > td > div:nth-child(3) > span > span").text()
        resolve(src);
    })
    .catch(err => reject(err));
});

const functioClaim = (userId, request, reffCode) => new Promise((resolve, reject) => {
    const bodys = {
        "entryScreen": {
            "value": "FRIENDS_ENTRY_SCREEN_VIEW_FRIENDS"
          },
          "confirmRewardReferralCode": reffCode,
          "recaptchaToken": "03ANYolqtulBsNU78_zb1cYiZXCPnlQAViHGIa_Za7oPbvGGbe2pABbFHq8Abk1p5XZ_KMc2fTgTFj5iLV0d6fkQV3IiHterE_uzOlV3D6D0dtsKOZQC101CFBSkEAFT1mZTqctvtcBWG_M0swpRxVDMVQpo9Jcp5R2r4d68TfwAG6t7XKWsQ5pYS2hkyR9agN2y_e6csx0XPrbAG2dzaBzHwiwn2APiIH98X9rBnNOFj5OefCoqHJxRcLEEdmKP6HyxwnFYL3iUrfFJFAu9F2rbjIHphexDmEi4tPTWbSc0Vbxfle1Ui30Z0XMUd3fEVEvcBLGahDiAiKK9RMG67kSDnZgHyjNYzcTBNPnDT6BV1J4ctgrScb4oPjWgYYDkf2qe89U2ZUe9XDwU9pf-66sDn6Df_2lXuOPeLWOFls2di6rbSs7O6-7xENwLjqHxKY0KPWrpFQqggy4dyZoJIB5rdtpE_UF6P-1vzTcwP5C3bpnArg9P2d3f-hJHBUQTLyIvHUm5UI0TC-SaEcpO8n4CF7a38BG9xnc0qGkOBLKK0D4K8Voi7x2mYuS1ftirNK_1W_LT8zqVIClyPTV-CgrKi7TT6rIs95BKms7xyOzQDP5HtApyab85C4kMdKUOgkNhZGjQGKF_6dKJabPEU88bHAE2yCK88VoGASUa9ZXqd6xrZWZRWQhuxOAVcZMiopgHRkuAQ_3dmd_W5yL5o7c0iiEqepLItLjfkuMQpkSrfk_R078dQk5w1AyhZH3X-DZqXuN1a89rxyEhzibqFSz5BIgUr0eNHR14b8PXTiVw3MNDIzp_b-z3B_7uF8As5btxBpEF7WGU4k56TT1oaUB-sLoPzkodVTLuhv3J31rbfssQNSXeHmS6IZOiNsW6cy3nU5h5pK46Wf48dMTFnY4ZILoUfgf4yuidx4VRifRm_pWDgtg0T7Pgejq6XrmDpk015xFjz547r2-XO9j1u1CMU_droTlRMfVqCeDGq7olZCAp45shdr_eNGPc47wp0C8t9B1-9S26C2gkNt6ChFNXlqFj28Ehry_N1_O-beCzzMqTVUc8BI_-nZ2M0HeGDtVkNjiG7rqcYgrtGEATynoUpZk7mYU0Xsb3vwcAFqYmQnZVmk6TTZI7fimoduhHDSFl7ORG6F6JJ4F_xxTWnpSAnuHNmS7Iy0iIvqD5Ggd3PHgkh1AQsOA2lNolfubVjzSZqQJ3uT2BPGowxRIUqHPV8spbfoduHjdBH9fWTTiS7tsDeZSFzCtEOgOsyz0cB3zSqtJTx8_zwgs-GcbSb5mAKevVADbINz5gP05gy586YbXwR6_DaSfo9nGYXHILCKAT1Gl-N44KDL"
    }
    fetch(`https://mobile-api.hopper.com/api/v2/friends`, { 
        method: 'PUT', 
        body: JSON.stringify(bodys),
        headers: {
            
            'Host': 'mobile-api.hopper.com',
            'x-user-id': userId,
            'x-build-number': '117384',
            'x-locale': 'en_US',
            'x-currency': 'USD',
            'x-timezone': 'America/Chicago',
            'h-request': request,
            'content-type': 'application/json; charset=UTF-8',
            'content-length': 34,
            'accept-encoding': 'gzip',
            'user-agent': 'okhttp/4.9.3',
            'accept-language': 'en-US;q=1.0, id-ID;q=0.9',
            'x-client-request-id': uuidv4()
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionKepo = (userId, request, newEmail) => new Promise((resolve, reject) => {
    const bodys = {
        "newEmail":newEmail
    }
    fetch(`https://mobile-api.hopper.com/api/v2/users`, { 
        method: 'PUT', 
        body: JSON.stringify(bodys),
        headers: {
            
            'Host': 'mobile-api.hopper.com',
            'x-user-id': userId,
            'x-build-number': '117384',
            'x-locale': 'en_US',
            'x-currency': 'USD',
            'x-timezone': 'America/Chicago',
            'h-request': request,
            'content-type': 'application/json; charset=UTF-8',
            'content-length': 34,
            'accept-encoding': 'gzip',
            'user-agent': 'okhttp/4.9.3',
            'accept-language': 'en-US;q=1.0, id-ID;q=0.9',
            'x-client-request-id': uuidv4()
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionState1 = (state1, userIdSementara) => new Promise((resolve, reject) => {
    const bodys = {
        "timeZone": "America/Chicago",
        "locale": "en_US",
        "launchState": {
            "firstLaunch": true
        }
    }
  
    fetch(`https://mobile-api.hopper.com/api/v2/appState`, { 
        method: 'POST',
        body: JSON.stringify(bodys),
        headers: {
            
            'Host': 'mobile-api.hopper.com',
            'x-user-id': userIdSementara,
            'x-build-number': 117384,
            'x-locale': 'en_US',
            'x-currency': 'USD',
            'x-timezone': 'America/Chicago',
            'h-request': state1,
            'content-type': 'application/json; charset=UTF-8',
            'content-length': 34,
            'accept-encoding': 'gzip',
            'user-agent': 'okhttp/4.9.3',
            'accept-language': 'en-US;q=1.0, id-ID;q=0.9',
            'x-client-request-id': uuidv4()
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
  });

  const functionState2 = (state2, userIdSementara) => new Promise((resolve, reject) => {
    const bodys = {
        "timeZone": "America/Chicago",
        "locale": "en_US",
        "pushSettings": {
            "appId": "com.hopper.mountainview.play",
            "kind": "gcm",
            "registrationId": `${randomize("Aa0", 22)}:APA91bEl_0g-${randomize("Aa0", 59)}-${randomize("Aa0", 68)}`
        },
        "launchState": {
            "firstLaunch": false
        }
    }
  
    fetch(`https://mobile-api.hopper.com/api/v2/appState`, { 
        method: 'POST',
        body: JSON.stringify(bodys),
        headers: {
            
            'Host': 'mobile-api.hopper.com',
            'x-user-id': userIdSementara,
            'x-build-number': 117384,
            'x-locale': 'en_US',
            'x-currency': 'USD',
            'x-timezone': 'America/Chicago',
            'h-request': state2,
            'content-type': 'application/json; charset=UTF-8',
            'content-length': 34,
            'accept-encoding': 'gzip',
            'user-agent': 'okhttp/4.9.3',
            'accept-language': 'en-US;q=1.0, id-ID;q=0.9',
            'x-client-request-id': uuidv4()
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
  });

(async () => {

    let data = []

    let jmlReffBerhasil = 0;

    const reffCode = readline.question(`[ ${moment().format("HH:mm:ss")} ] ${chalk.yellow('Reff code: ')}`)
    const jmlReff = readline.question(`[ ${moment().format("HH:mm:ss")} ] ${chalk.yellow('Jumlah reff: ')}`)
    
    console.log("")

    do {
        try {

            const getDomain = await functionGetDomain()

            var domain = getDomain[Math.floor(Math.random()*getDomain.length)]

            const email = `${random.first()}${randomize('0', 5)}@${domain}`.toLowerCase()
            const nomor = `+1913${randomize('0', 7)}`
    
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.yellow(`Mendaftar dengan ${email} | ${nomor}`));

            const payload = {
                "identity": {
                  "userId": uuidv4(),
                  "deviceId": uuidv4(),
                  "version": {
                    "value": "BUILD",
                    "buildNumber": 0
                  },
                  "appId": "com.hopper.champaign.production"
                },
                "preferences": {
                  "locale": "en_US",
                  "currency": "USD",
                  "timeZone": "America/Chicago",
                  "countryCode": "US"
                },
                "requestId": uuidv4(),
                "trackingContextId": uuidv4()
            };

            const secretKey = 'SPPOJ92HZ92VAN9E5WF1811M3B5DHWTW0EKGC4LE';

            const hreq = jwt.sign(payload, secretKey, {
                algorithm: 'HS256',
            });
            
            const sendOtp = await functionSendOtp(email, hreq)

            if(sendOtp.SignInResponse == 'Success'){
    
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(`OTP berhasil dikirim`));
    
                const token = sendOtp.token
    
                const abc = `${email.split('@')[0]}`
                const cab = `${email.split('@')[1]}`

                do {
                    var getId = await functionGetId(abc, cab)
                } while(!getId[0])

                const id = getId[0].id
        
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.yellow(`Sedang menunggu link verify`));
    
                let countGetOtp = 0;
                let statusOtp = false;
    
                do {
                    countGetOtp++
                    var getOtp = await functionGetLink(abc, cab, id)
                    if(getOtp){
                        statusOtp = true;
                    }
                } while(!getOtp && countGetOtp <= 200)
    
                if(statusOtp == true){
    
                    const otp = getOtp.match(/\d+/)[0]
    
                    const otpTipuan = uuidv4()
                    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(`Link veryf didapatkan ${otpTipuan}`));
                  
                    const verifOtp = await functionVerifOtp(email, otp, token, hreq)
                    
                    if(verifOtp.VerifyCodeResponse == 'Success'){
                        console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(`Verifikasi berhasil`));
                        const tokenVerif = verifOtp.token
                        const finalize = await functionFinalize(tokenVerif, nomor, hreq)
                        if(finalize.FinalizeResponse == 'Success'){
    
                            const accessToken = finalize.authenticationTokens.accessToken
                            const userId = finalize.authenticationTokens.userId
                            var deviceId = crypto.randomBytes(8).toString('hex');
    
                            console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(`Berhasil mengisi profile`));
    
                            const dataReff = await gzip(`{"deviceInfo":{"notifications":true,"osVersion":"28","paymentEnabled":false,"screenHeight":0,"screenScale":2.0,"screenWidth":0},"experiments":"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\u003d\u003d","identity":{"appId":"com.hopper.mountainview.play","authToken":"${accessToken}","deviceId":"${deviceId}","userId":"${userId}","version":{"buildNumber":117384,"value":"5.18.0"}},"preferences":{"currency":"USD","locale":"en_US","timeZone":"Asia/Bangkok"},"savedItems":[{"savedItem":"Carriers","state":{"tag":{"timestamp":"2022-06-30T19:03:56.032+07:00"},"SavedItemState":"MostRecent"}},{"savedItem":"Regions","state":{"tag":{"timestamp":"2022-06-20T19:42:10.221+07:00"},"SavedItemState":"MostRecent"}},{"savedItem":"DefaultLinks","state":{"tag":{"timestamp":"2021-08-20T07:00:00.000+07:00"},"SavedItemState":"MostRecent"}}]}`)
                                                
                            const request = Buffer.from(dataReff).toString('base64')
    
                            const inputReff = await functionInputReff(request, userId, reffCode)

                            const cekStatusInputReff = inputReff.response.action.find(o => o.variable == 'toastText')

                            if(cekStatusInputReff){

                                if(cekStatusInputReff.value.includes('added')){

                                    const randFile = randomize("a0", 5)

                                    jmlReffBerhasil++
                                    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(`Reff berhasil ${jmlReffBerhasil} | ${cekStatusInputReff.value}`));
                                    console.log("")
                                    
                                    data.push(
                                        {
                                            index: jmlReffBerhasil,
                                            noHp: nomor,
                                            email: email
                                        }
                                    )

                                    let realData = ''
                                    
                                    if(jmlReffBerhasil == jmlReff){

                                        for (var jmlData = 0; jmlData < data.length; jmlData++){
                                            realData = realData + `<tr>
                                            <td>${data[jmlData].index}</td>
                                            <td>${data[jmlData].noHp}</td>
                                            <td> <a href="http://20.169.46.135:8080/getCode=${data[jmlData].email}" target="_blank">Get Code</a></td>
                                          </tr>`
                                        }

                                        const template = `<!DOCTYPE html>
                                        <html>
                                        <style>
                                        table, th, td {
                                          border:1px solid black;
                                        }
                                        </style>
                                        <body>
                                        
                                        <h2>Hopper Account</h2>
                                        
                                        <table style="width:100%">
                                          <tr>
                                            <th>Index</th>
                                            <th>Nomor HP</th>
                                            <th>Email Akses</th>
                                          </tr>
                                          ${realData}
                                        </table>
                                        
                                        </body>
                                        </html>
                                        
                                        `

                                        console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(`Saved on ${randFile}.html`));

                                        await fs.appendFile(`${randFile}.html`,`${template}`+'\r\n', err => {
                                            if (err) throw err;
                                        })
                                    }
                                } else {
                                    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`Reff gagal | ${cekStatusInputReff.value}\n`));
                                    if(cekStatusInputReff.value == 'Unrecognized referral code'){
                                        break;
                                    }
                                }
                            } else {
                                console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`Reff gagal | ${cekStatusInputReff.value}\n`))
                            }
    
                        } else {
                            console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`Gagal mengisi profile\n`));
                        }
                    } else {
                        console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`Verifikasi gagal\n`));
                    }
                } else {
                    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`Link token gagal diverifikasi\n`));
                }
            } else {
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`OTP gagal dikirim\n`));
            }
        } catch(error){
            console.log(error)
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`Upps ada yang error\n`));
        }
    } while(jmlReff != jmlReffBerhasil)
})();