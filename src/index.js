import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './styles/index.scss'

ReactDOM.render(<App />, document.getElementById('app'))
