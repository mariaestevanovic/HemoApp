CREATE DATABASE hemoapp;

USE hemoapp;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(15),
  location VARCHAR(255),
  blood_type VARCHAR(5),
  birth_date DATE,
  weight DECIMAL(5,2),
  bio TEXT,
  rg VARCHAR(20),
  cpf VARCHAR(14),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
