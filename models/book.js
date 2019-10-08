module.exports = (sequelize,DataTypes) =>{
    const Book = sequelize.define('Book',{
        isbn : {
            type: DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        },
        title : {
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        subTitle : {
            type: DataTypes.STRING(100),
        },
        price : {
            type: DataTypes.NUMBER(10),
        },
        author : {
            type: DataTypes.STRING(100),
        },
        publisher : {
            type: DataTypes.STRING(100),
        }

    },{
        charset:'utf8',
        collate:'utf8_general_ci',
    });

    Book.associate = (db)=>{
        db.Book.hasMany(db.UserBook);
    }

    return Book;
}