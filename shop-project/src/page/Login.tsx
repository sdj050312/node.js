import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../pagescss/Login.css';
import MoveBar from '../component/MoveBar';
import titleIcon from "../assets/dog-removebg-preview (2).png";

// 상태에 저장할 데이터 타입 정의
interface FormData {
  id: string;
  pwd: string;
}   

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    pwd: ''
  });
  const [loginShow, setLoginShow] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleClick() {
    setLoginShow(false);
  }
  function showLoginBar() {
    setLoginShow(true);
  }

  // 폼 제출 처리 함수 (타입을 FormEvent로 지정)
  async function onsubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch('http://your-backend-url.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // 로그인 성공 후 동작 (예: 페이지 이동)
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  }

  // 입력값을 상태로 업데이트하는 함수
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <>
      <div className="login-form">
        <div className="login-show">
          <div className='login-container' style={{
            transform: loginShow ? 'translateX(0)' : 'translateX(-370px)',
            transition: '.3s'
          }}>
            <form action="" method="POST" id="login" onSubmit={onsubmit}>
              <div className='title-img'>
                <img src={titleIcon} alt="" />
              </div>
              <div className='form-title'>Dog CaP</div>
              <label htmlFor="id">ID</label>
              <input
                type="text"
                name="id"
                id="id"
                value={formData.id}
                onChange={handleInput}
              />
              <label htmlFor="pwd">Password</label>
              <input
                type="password"
                name="pwd"
                id="pwd"
                value={formData.pwd}
                onChange={handleInput}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className='submit-btn'>
                <button type="submit">Login</button>
              </div>
              <button type="button" onClick={handleClick}>Accounting?</button>
            </form>
            <form action="" className='register-form'>
              <div className='title-img-register'>
                <img src={titleIcon} alt="" />
              </div>
              <label htmlFor="">id</label>
              <input type="text" />
              <label htmlFor="">email</label>
              <input type="email" />
              <label htmlFor="">password</label>
              <input type="password" />
              <label htmlFor="">email</label>
              <input type="email" />
              <label htmlFor="">number</label>
              <input type="text" />
              <button type="button" onClick={showLoginBar}>Login?</button>
              <div className='register-btn'>
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <MoveBar />
    </>
  );
};

export default Login;
