import './App.css';

import React, { useState} from 'react'
import NavBar from './Component/NavBar';
import News from './Component/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const API = process.env.REACT_APP_NEWS_API1;
  const pageSize = 6;

  const [progress, setProgress] = useState(0);
  
  return (
    <>
      <Router>
      <LoadingBar
      color='#f11946'
      height={3}
      progress={progress}
      />
      <NavBar />
        <Routes>
          <Route exact path="/" element={<News setProgress ={setProgress}   key={"general"} pageSize={pageSize} country="in" category="science" APIkey={API} />}></Route>
          <Route exact path="/business" element={<News setProgress ={setProgress}   key={"business"} pageSize={pageSize} country="in" category="business" APIkey={API} />}></Route>
          <Route exact path="/entertainment" element={<News setProgress ={setProgress}   key={"entertainment"} pageSize={pageSize} country="in" category="entertainment" APIkey={API} />}></Route>
          <Route exact path="/general" element={<News setProgress ={setProgress}   key={"general"} pageSize={pageSize} country="in" category="general" APIkey={API} />}></Route>
          <Route exact path="/health" element={<News setProgress ={setProgress}   key={"health"} pageSize={pageSize} country="in" category="health" APIkey={API} />}></Route>
          <Route exact path="/science" element={<News setProgress ={setProgress}   key={"science"} pageSize={pageSize} country="in" category="science" APIkey={API} />}></Route>
          <Route exact path="/sports" element={<News setProgress ={setProgress}   key={"sports"} pageSize={pageSize} country="in" category="sports" APIkey={API} />}></Route>
          <Route exact path="/technology" element={<News setProgress ={setProgress}   key={"technology"} pageSize={pageSize} country="in" category="technology" APIkey={API} />}></Route>
        </Routes>
      </Router>
    </>
  )
}
