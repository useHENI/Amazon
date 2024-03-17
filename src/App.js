import Header from './components/header/Header';
import './App.css';
import Routing from './Router';
import { useContext, useEffect } from 'react';
import { DataContext } from './components/DataProvider/DataProvider';
import { auth } from './Utility/firebase';
import { Type } from './Utility/action.type';




function App() {
  const [{user}, dispatch] = useContext(DataContext);

  useEffect(()=> {
    auth.onAuthStateChanged((authUser)=> {
      if(authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser
        })
      }else {
        dispatch({
          type: Type.SET_USER,
          user: null
        })
      }
    })
  }, [])


  return (
    <div className="App">
      
      <Routing />
      
    </div>
  );
}

export default App;
