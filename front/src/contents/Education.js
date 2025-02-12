import React, { Component } from 'react';
import Widecard from '../components/Widecard';

class Education extends Component {
    render() {
        return (
            <div className="condiv">
            <h1 className="subtopic">My Education</h1>
            <Widecard title="St. Xavier’s Catholic College of Engineering" where="Nagercoil" from="Nov 2021" to="Present"/>
            <Widecard title="SSLC | HSC" where="Adline Matric Higher Secondary School" from="2005" to="2021"/>
            </div>
            )
        }
    }
    
export default Education
    