CREATE DATABASE hemoapp_db;
USE hemoapp_db;

CREATE TABLE Users (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  FullName VARCHAR(100),
  Email VARCHAR(100),
  Password VARCHAR(100),
  Gender ENUM('Masculino', 'Feminino') NOT NULL
);