CREATE DATABASE SimpleAuth;
Use SimpleAuth;

CREATE TABLE Users (
    idUser INT NOT NULL AUTO_INCREMENT,
    username VARCHAR (50) NOT NULL,
    userPassword VARCHAR (400) NOT NULL,
    PRIMARY KEY (idUser)
);