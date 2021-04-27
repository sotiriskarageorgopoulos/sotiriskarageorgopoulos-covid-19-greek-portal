import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import GreekGov from '../../assets/images/gov-greek.svg';
import classNames from 'classnames/bind'
import {Facebook} from 'react-bootstrap-icons';
import {Twitter} from 'react-bootstrap-icons';
import {Instagram} from 'react-bootstrap-icons';
import {Youtube} from 'react-bootstrap-icons';
import './footer.css';

const Footer = () => {
    let location = useLocation();
    let year = new Date().getFullYear();
    let [path,setPath] = useState('');

    useEffect(() => {
        setPath(location.pathname);
    }, [location]);

    let footerClass = classNames({
        'footer-news':path.split("/")[1] === "news",
        'footer-contact':path.split("/")[1] === "contact",
        'footer-appointment':path.split("/")[1] === "appointment"
    });
    
    const goToPage = (url) => {
        window.open(url, '_blank');
    }

    return (
    <footer className={footerClass}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <img src={GreekGov} className="footer-img" alt="Εθνόσημο της Ελληνικής Δημοκρατίας"/>
                    </div>
                    <div className="col-sm-4">
                        <p className="copyright">&copy; Copyright {year}</p>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-center">
                        <Facebook className="mt-5 mr-3 icons-style" onClick={()=>goToPage('https://www.facebook.com/')}/>
                        <Twitter className="mt-5 mr-3 icons-style" onClick={()=>goToPage('https://twitter.com/')}/>
                        <Instagram className="mt-5 mr-3 icons-style" onClick={()=>goToPage('https://www.instagram.com/')}/>
                        <Youtube className="mt-5 mr-3 icons-style" onClick={()=>goToPage('https://www.youtube.com/')}/>
                    </div>
                </div>
            </div>
    </footer> 
    )
}

export default Footer;