CREATE DATABASE hemoapp_db;
USE hemoapp_db;

CREATE TABLE Users (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  FullName VARCHAR(100) NOT NULL,
  Email VARCHAR(100) NOT NULL,
  Password VARCHAR(100) NOT NULL,
  Gender ENUM('Masculino', 'Feminino') NOT NULL
);