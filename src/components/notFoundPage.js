"use strict";
var React = require('react');
var Link = require('react-router').Link;
 
 var notFoundPage = React.createClass({
     render: function() {
         return (
             <div>
               <h1>404</h1>
               <p>These were not the droids you were looking for.</p>
               <p><Link to="app">The way back</Link></p>
             </div>
             );
     }
 });
 
 module.exports = notFoundPage;