const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/',async(req,res,next)=>{
    // 책 등록 
    try{
        if(req.body.isbn){
            const exBook = await db.User.findOne({
                where : {
                    isbn : req.body.isbn
                },
            });
            
            if(!exBook){
                const newBook = await db.Book.create({
                    isbn : req.body.isbn,
                    title : req.body.title,
                    subTitle : req.body.subTitle,
                    price : req.body.price,
                    author : req.body.author,
                    publisher : req.body.publisher,
                    category : req.body.category
                });
            }

            const newUserBook = await db.UserBook.create({
                UserId : req.user.userId,
                Isbn : req.params.isbn
            });
            res.json(newUserBook);
        }
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.get('/',async(req,res,next)=>{
    // 사용자 소장 책 보기 
    try{
        const books = await db.UserBook.findAll({
            where : {
                isbn : req.params.isbn,
                userId : req.user.userId 
            },
            include:[{
                model : db.User,
                attribute : ['userId','nickname']
            },{
                model : db.Book,
                attribute : ['isbn','title','subTitle','price','author','publisher','category']
            }]
        });
        res.json(books);
    }catch(e){
        console.error(e);
        next(e);
    }
});