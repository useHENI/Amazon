import React, { useState, useContext } from 'react'
import classes from './SignUp.module.css'
import LayOut from '../../components/LayOut/LayOut';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../Utility/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import { ClipLoader } from 'react-spinners';

function Auth() {
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{user}, dipatch] = useContext(DataContext);
  // console.log(user); 
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  })

  const authHandler = async(e) => {
    e.preventDefault();
    // console.log(e.target.name)
    if(e.target.name === "signin"){
////firebase auth
    setLoading({...loading, signIn: true})
    signInWithEmailAndPassword(auth, email, password).then((userInfo)=> {
      // console.log(userInfo)
      dipatch({
        type: Type.SET_USER,
        user: userInfo.user
      })
      
      
      
      setLoading({...loading, signIn: false});
      navigate(navStateData?.state?.redirect || '/');
    }).catch((error)=> {
      setError(error?.message) 
      setLoading({...loading, signIn: false})
    });

    }else{
      setLoading({...loading, signUp: true})
      createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
        
        dipatch({
          type: Type.SET_USER,
          user: userInfo.user
        })
        
        setLoading({...loading, signup: false});
        navigate(navStateData?.state?.redirect || '/');
      }).catch((error)=> {
        setError(error?.message)
        setLoading({...loading, signup: false})
      });
    }
  }



  return (
    <LayOut>
      
      <section className={classes.login}>
        
        <Link to='/'><img className={classes.login_logo} src='https://pngimg.com/uploads/amazon/amazon_PNG1.png'  alt='amazon logo' /></Link>
      <div className={classes.login_container}>
      <h1>Sign-in</h1>
      {
        navStateData && <small style={{
          padding: "5px",
          textAlign: "center",
          color: "red",
          fontWeight: "bold"
        }}>{navStateData?.state?.msg} </small>
      }
      <form>
        
        <h5>E-mail</h5>

        <input
        value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
          id="email"
          
        />

        <h5>Password</h5>
        <input
        value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
          id='password'
          
        />
        <button type='sbumit' name='signin' onClick={authHandler} className={classes.login_signInButton} >
        { loading.signIn ? <ClipLoader color="#000" size={15}/> : 
          "Sign-in" }
          </button>
        </form>

        <p>By signing-in you agree to the AMAZON FAKE CLONE conditions of use
        sale. please see our privacy Notice, our cookies Notice and our
        Interest-Based Ads Notice</p>
        <button type='sbumit' name='signup' onClick={authHandler}  className={classes.login_registerButton} >{ loading.signUp ? <ClipLoader color="#000" size={15}/> : 
          "Create your Amazon Account" }</button>
        
        {error && <small style={{ paddingTop: '5px' ,color:"red" }}>{error}</small>}

      </div>
    </section>
      
    </LayOut>
  )
}

export default Auth;

