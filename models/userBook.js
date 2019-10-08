module.exports = (sequelize, DataTypes) => {
    const UserBook = sequelize.define('UserBook',{
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci',
    });

    UserBook.associate = (db)=>{
        db.UserBook.belogsTo(db.User);
        db.UserBook.belogsTo(db.Book);
    };
    return UserBook;
}