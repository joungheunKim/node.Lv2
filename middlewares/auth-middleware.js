const jwt = require("jsonwebtoken");
const User = require("../schemas/user");


module.exports= async (req, res, next) =>{
    const {Authorization} = req.cookies;
    // Bearer 형태의 쿠키 Bearer qweqwe.ewqewq.weqweqw
    // 쿠키가 존재하지 않으면 undefined
    // undefined에 split 하면 에러가 발생할 수 있다.
    // authorization 쿠키가 존재하지 않을 때 대비
    // ?? 는 null 병합 문자열, null이나 빈값일때 오른쪽의 값으로 대치를 해준다.
    const [authType, authToken] = (Authorization ?? "").split(" ");

// authType === Bearer 값인지 확인
// authToken 검증
    if (authType !== "Bearer" || !authToken){
        res.status(403).json({
            errorMessage: "로그인이 필요한 기능입니다."
        });
        return;
    };
    

    // jwt 검증이 실패했을 때 서버가 멈추지 않고 에러에 대한 검증을 하기위한 try catch
    try{
        // 1. authToken이 만료되었는지 확인
        // 2. authToken이 서버가 발급한 토큰이 맞는지 검증
        // .verify로 검증, token 생성시(jwt.sign) 사용했던 비밀키("secret-penguin")와 비교 
        const {userId} = jwt.verify(authToken, "secret-penguin");

        // 3. authToken에 있는 userId에 해당하는 사용자가 실제 DB에 존재하는지 확인
        const user = await User.findById(userId);
        res.locals.user = user;

        next(); // 이 미들웨어 다음으로 보낸다.
    } catch(error){
        console.error(error);
        res.status(403).json({errorMessage: "전달된 쿠키에서 오류가 발생하였습니다."})
    }

};