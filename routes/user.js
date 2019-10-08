const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

router.post('/',async(req,res,next)=>{
    //회원가입
    try{
        if(req.body.userId){
            const exUser = await db.User.findOne({
                where : {
                    userId : req.body.userId
                },
            });
            if(exUser){
                return res.status(403).send('이미 사용중인 아이디입니다.');
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const newUser = await db.User.create({
                userId : req.body.userId,
                password : hashedPassword,
                email : req.body.email,
                nickname : req.body.nickname,
            });
            console.log(newUser);
            return res.status(200).json(newUser);
        }
    }catch(e){
        console.error(e);
        return next(e);
    }
});

router.post('/login',(req,res,next)=>{
    //로그인
    try{
        passport.authenticate('local',(err,user,info)=>{
            if(err){
                console.error(err);
                return next(err);
            }

            if(info){
                return res.status(401).send(info.reason);
            }
            return req.login(user,async(loginErr)=>{
                try{
                    if(loginErr){
                        return next(loginErr);
                    }
                    const fullUser = await db.User.findOne({
                        where : {id : user.id},
                        attributes : ['id','nickname','userId'],
                    });
                    return res.json(fullUser);
                }catch(e){
                    next(e);
                }
            })
        })
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.post('/logout',(req,res)=>{
    //로그아웃
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
})