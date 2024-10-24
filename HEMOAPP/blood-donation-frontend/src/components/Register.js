import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', { 
        fullName, 
        email, 
        password, 
        gender 
      });
      alert('Usuário cadastrado com sucesso');
    } catch (error) {
      alert('Erro ao registrar: usuário já existe ou outro problema');
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">Cadastre-se</h1>
      
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Nome Completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input-field"
          required
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        
        <input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
          required
        />
        
        <select 
          className="input-field" 
          onChange={(e) => setGender(e.target.value)} 
          value={gender} 
          required
        >
          <option value="" disabled hidden>Selecione o Gênero</option>
          <option value="Male">Masculino</option>
          <option value="Female">Feminino</option>
        </select>
        
        <button type="submit" className="register-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Register;
