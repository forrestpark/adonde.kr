const { default: axios } = require('axios');
const { Router } = require('express');
const qs = require('qs')

// const { route } = require('../../app');
const router = Router();

const kakaoLogin = async(code, domain) => {
    let headerUserInfo = ''
    const kakaoKey = '2aa177ee936922badc9212dff6d392c9'
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token'
    const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me'
    const body = {
        grant_type: 'authorization_code',
        client_id: kakaoKey,
        redirect_uri: `${domain}/kakao-callback`,
        code: code,
    }
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    }
    try{
        const response = await axios({
            method: 'POST',
            url: kakaoTokenUrl,
            timeout: 30000,
            headers,
            data: qs.stringify(body)
        })
        if (response.status === 200){
            console.log(`token: ${JSON.stringify(response.data)}`)
            headerUserInfo = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                Authorization: 'Bearer ' + response.data.access_token,
            }
        }
        const responseUserInfo = await axios( {
            method: 'GET',
            url: kakaoUserInfoUrl,
            timeout: 30000,
            headers: headerUserInfo,
        })
        if (responseUserInfo.status === 200){
            console.log(`userInfo: ${JSON.stringify(responseUserInfo.data)}`)
            return responseUserInfo.data
        }else{
            throw new UnauthorizedException()
        }
    }catch(e){
        console.log(e)
    }
}

router.post('/', async (req, res) => {
    try{
        const { code, domain } = req.body
        if (!code || !domain){
            throw new BadRequestException('No Kakao Login Info')
        }
        const kakao = await kakaoLogin(code, domain)
        console.log(`kakaoUser: ${JSON.stringify(kakao)}`)
        res.send(kakao)
    }catch(err){
        res.send(err)
        console.log(err)
    }
    
});

module.exports = router;