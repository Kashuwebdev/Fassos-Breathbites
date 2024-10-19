import React, { useEffect, useState } from 'react'
import './App.css';

import { useNavigate } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prevE, setPrevE] = useState('');
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);
  const [alpha, setAlpha] = useState('');
  const [beta, setBeta] = useState('');

  const Showpage = () => {
    setVisible(true);
  }

  const Offpage = () => {
    setVisible(false);
  }

  const [data, setData] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3005/data').then(resp => resp.json()).then(json => {
      console.log(json);
      setData(json);
    })
  }, []);

  const UpdateData = {
    email: alpha,
    password: beta,
  }
  const DataSubmit = () => {
    fetch('http://localhost:3005/data', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(UpdateData)
    })
  }


  const ErrorShow = () => {
    let isValid = true;
    if (!email && !password) {
      setPrevE('Enter Your Email & Password');
      isValid = false;
    }
    else {
      setPrevE('');
    }
    return isValid;
  }

  const SubmitValue = (e) => {
    e.preventDefault();
    if (ErrorShow()) {
      let user = data.find((x) => x.email === email && x.password === password);
      if (user) {
        alert("Login Successful");
        navigate('/dashboard')
      } else {
        alert('Invalid Email or Password')
      }
    }
  }

  return (
    <div className='first-page'>
      <div className='row'>
        <div className='col-lg-6 '>
          <img className='mb-5 ms-4 mt-4' src='https://product-assets.faasos.io/eatsure_cms/production/333b405b-13b6-429f-82db-900e9795da54.png' height={'95px'} width={'auto'} />
          <button className='btn btn-primary float-end mt-5 ' onClick={Showpage}>Sign In</button>
          {
            isVisible && (
              <div className='popUp' style={{ display: isVisible ? 'block' : 'none' }}>
                <button className='btn btn-primary float-end' onClick={Offpage}>Close</button>
                <h1 className='text-white'>Sign In Page</h1>
                <form onSubmit={DataSubmit}>
                  <div className='row mt-4'>
                    <div className='col-lg-8 mb-3'>
                      <input className='form-control' value={alpha} onChange={(e) => { setAlpha(e.target.value) }} type='email' placeholder=' Enter your Email to be Updated' />
                    </div>
                    <div className='col-lg-8'>
                      <input className='form-control' value={beta} onChange={(e) => { setBeta(e.target.value) }} type='password' placeholder=' Enter your Password to be Updated' />
                      <button className='btn btn-primary mt-3 ' type='submit'>Submit</button>
                    </div>

                  </div>
                </form>
              </div>
            )
          }
          <h3 className=' fw-bold ms-4 mt-4' style={{ fontSize: "3rem" }}>Skip boring food and  indulge in flavoursome Wraps, Meals and Bowls!</h3>
          <form onSubmit={SubmitValue}>
            <div className='row ms-4 mt-4 '>
              <div className='col-lg-8'>
                <input className='form-control mt-4' value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder='Enter your email' />
                <p className='ms-4 mt-4'>{prevE}</p>
              </div>
              <div className='col-lg-8'>
                <input className='form-control mt-3' value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Enter your password' />
                <p className='ms-4 mt-4'>{prevE}</p>
                <button className='btn btn-primary mt-3' type='submit'>Log In</button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-lg-6'>
          <div className='background-fassos'></div>

        </div>

      </div>
    </div>
  )
}

export default App
