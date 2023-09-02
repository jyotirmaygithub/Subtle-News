import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state ={
    progress:0,
  }

  setprogress = (progress) => {
    this.setState({progress : progress})
  }
  pagesize = 6  // here i am using it to reduce my work
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
          height={3}
        color='#f11946'
        progress={this.state.progress}
      />
          <Routes>
            {/* in this below code we used one new concept of key, which is helpful in remounting of the page  */}
            <Route exact path="/" element={<News progressbar={this.setprogress}  key={"general"}  pagesize={this.pagesize
            } country={"in"} category={"general"}/>}></Route>
            <Route exact path="/home" element={<News progressbar={this.setprogress}  key={"general"}  pagesize={this.pagesize
            } country={"in"} category={"general"}/>}></Route>
            <Route exact  path="/business" element={<News progressbar={this.setprogress}   key={"business"} pagesize={this.pagesize
            } country={"in"} category={"business"}/>}></Route>
            <Route exact path="/entertainment" element={<News progressbar={this.setprogress}  key={"entertainment"}  pagesize={6} country={"in"} category={"entertainment"}/>}></Route>
            <Route exact path="/health" element={<News progressbar={this.setprogress}  key={"health"}  pagesize={this.pagesize
            } country={"in"} category={"health"}/>}></Route>
            <Route exact path="/science" element={<News progressbar={this.setprogress}   key={"science"} pagesize={this.pagesize
            } country={"in"} category={"science"}/>}></Route>
            <Route exact path="/sports" element={<News progressbar={this.setprogress}  key={"sports"}  pagesize={this.pagesize
            } country={"in"} category={"sports"}/>}></Route>
            <Route exact path="/technology" element={<News progressbar={this.setprogress}  key={"technology"}  pagesize={this.pagesize
            } country={"in"} category={"technology"}/>}></Route>
          {/* lets pass page size as a props */}
          {/* <News progressbar={this.setprogress}  pagesize={6} country={"in"} category={"sports"} /> */}
          </Routes>
        </Router>
      </div>
    );
  }
}
