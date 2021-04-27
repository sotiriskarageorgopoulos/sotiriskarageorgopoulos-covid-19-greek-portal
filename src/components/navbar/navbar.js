import React from 'react';
import {Link} from 'react-router-dom'; 
import GreekDemocracyEmplem from '../../assets/images/ethnosimo.png';
import {List} from 'react-bootstrap-icons'; 
import {navbarInfo} from './navbarInfo';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';
import './navbar.css';

const Navbar = () => {
  const toggleNavbar = () => {
        let togglerMenuStyle = {
            padding:"3%",
            backgroundColor: "hsl(222, 60%, 49%)",
            position: "absolute",
            top:"145px",
            zIndex:"9",
            right:0
        }

        if(window.matchMedia('(max-width: 1024px)').matches) {
            $("#navbarNav").toggle("slow",function (params) {
                $(this).css(togglerMenuStyle);
            });
        }
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-container">
    <div className="container-fluid">
      <Image />
      <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
        <List color="aliceblue"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ListOfNavItems />
      </div>
    </div>
  </nav>
  )
}

const Image = () => {
    return (
    <figure className="d-flex flex-column mr-5 responsive-figure">
        <img src={GreekDemocracyEmplem} className="rounded-circle" alt="Εθνόσημο"/>
        <span className="navbar-brand">Εθνικός Οργανισμός Εμβολιασμού</span>
    </figure>
    )
}

const ListOfNavItems = () => {
    const rmNavbar = () => {
        if(window.matchMedia('(max-width: 1024px)').matches) {
          $("#navbarNav").hide("slow");
        }
    }

    return (
    <ul className="navbar-nav">
        {navbarInfo.map(item => {
            return (
                <li className="nav-item" key={uuidv4()} onClick={rmNavbar}>
                    <Link className="nav-link" to={item.path}>{item.name}</Link>
                </li>
            )
        })}
    </ul>
    )
}

export default Navbar;