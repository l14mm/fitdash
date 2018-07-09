import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";

import Header from "./components/Header";

export default ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}