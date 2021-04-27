import React,{useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Pagination from '@material-ui/lab/Pagination';
import {imagesInfo} from './imgInfo';
import {newsList} from '../news/newsList'
import {vaccinationInfo} from './vaccinationInfo';
import {usefulVideos} from './usefulVideos';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <>
            <CarouselImages />
            <GeneralInfo />
            <VaccinationInfo />
            <InformationAboutCitizens />
        </>
    )
}

const CarouselImages = () => {
    return (
    <Carousel>
        {imagesInfo
        .filter(i => i.category === "carousel")
        .map(i => {
            return (
                <img src={i.image} key={uuidv4()} className="carousel-img" alt={i.name} />
            )
        })}
    </Carousel>
)
}

const GeneralInfo = () => {
    let boxStyle = {
        color:"hsl(211, 39%, 23%)",
        bgcolor:"hsl(211, 27%, 70%)",
        width:"100%",
        height:"auto",
        fontSize:"20px",
        fontWeight:"bold",
        marginBottom: "3%"
    }
    return (
        <Box {...boxStyle}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-8 col-lg-6">
                    <h2 className="first-box-heading">Γενικές πληροφορίες για τον οργανισμό</h2>
                    <p className="p-2 paragraph-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi nullam vehicula ipsum a arcu. Id diam maecenas ultricies mi eget mauris. Dolor sed viverra ipsum nunc. Vivamus at augue eget arcu. Pharetra vel turpis nunc eget. Fusce id velit ut tortor. Leo a diam sollicitudin tempor id eu nisl nunc mi. Varius quam quisque id diam vel quam elementum. Dignissim diam quis enim lobortis scelerisque fermentum.
                    Non sodales neque sodales ut etiam sit. Neque sodales ut etiam sit amet nisl purus. Est sit amet facilisis magna etiam. Mauris augue neque gravida in fermentum et sollicitudin ac. Amet dictum sit amet justo. Malesuada fames ac turpis egestas. Sem viverra aliquet eget sit amet tellus cras adipiscing enim.</p>
                </div>
                <div className="col-xl-4 col-lg-6">
                        {imagesInfo
                        .filter(i => i.category === "first-box")
                        .map(i => {
                            return (
                                <img src={i.image} key={uuidv4()} className="first-box-img" alt={i.name}/>
                            )
                        })}
                </div>
            </div>  
        </div>  
        </Box>
    )
}

const VaccinationInfo = () => {
    let boxStyle = {
        color:"hsl(211, 39%, 23%)",
        bgcolor:"hsl(212, 33%, 89%)",
        width:"100%",
        height:"auto",
        fontSize:"20px",
        fontWeight:"bold",
        padding:"3%"
    }

    return (
    <Box {...boxStyle}>
        <div className="container-fluid">
            <h2 className="d-flex justify-content-center mb-5 vaccination-procedure-heading">Πληροφορίες για τον εμβολιασμό</h2>
            <div className="row">
                {vaccinationInfo.map(v => {
                    return <VaccinationCard {...v} key={uuidv4()}/>
                })}
            </div>
        </div>
    </Box>
    )
}

const VaccinationCard = ({name,path,image,nameOfImage,content}) => {
    let history = useHistory();

    const goToPage = (pathName) => {
        history.push(pathName)
    } 

    return (
        <div className="col-sm-4">
            <Card className="vaccination-card">
                <CardActionArea onClick={() => goToPage(path)}>
                    <CardMedia
                        className="vaccination-card-media"
                        image={image}
                        title={nameOfImage}
                        />
                    <CardContent>
                        <p className="paragraph-2 d-flex justify-content-center">{name}</p>
                        <p className="paragraph-2">{content}</p>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )

}

const InformationAboutCitizens = () => {
    let boxStyle = {
        color:"hsl(211, 39%, 23%)",
        width:"100%",
        height:"auto",
        fontSize:"20px",
        fontWeight:"bold",
        padding:"3%"
    }

    return (
        <Box {...boxStyle}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-7">
                        <h2 className="news-title">Νέα</h2>
                        <NewsList />
                    </div>
                    <div className="col-sm-5">
                        <h2 className="news-title">Οδηγίες για την πανδημία Covid-19</h2>
                        <UsefulVideos />
                    </div>
                </div>
            </div>
        </Box>
    )
}


export const NewsList = () => {
    let history = useHistory();
    const [pageNews,setPageNews] = useState(newsList.slice(0,5))
    /*Εκχωρείται δυναμικά το πλήθος των κουμπιών του pagination. 
    Ο αριθμός 5 είναι το πλήθος των νέων που εμφανίζονται σε κάθε σελίδα*/
    let countOfBtns = Math.ceil(newsList.length/5); 
    let pageNumber = 1; //ο αριθμός της σελίδας

    const goToPage = (id) => {
        history.push("news_item/"+id);
    } 

    const changePage = (e) => {
        e.preventDefault();
        let btnNumber = e.target.ariaLabel;
        // Το if χρησιμοποιείται επειδή αλλάζει δυναμικά το κείμενο της ariaLabel.
        //Π.χ από "Go to page 1" σε "page 1" και αντιστροφα
        if(btnNumber !== null) { 
            if(!isNaN(btnNumber.split(" ")[1])){
                pageNumber = Number(btnNumber.split(" ")[1]);
            }
            else if(!isNaN(btnNumber.split(" ")[3])) {
                pageNumber = Number(btnNumber.split(" ")[3]);
            }
        }
        let start = (pageNumber*5) - 5; //υπολογίζει τον πρώτο δείκτη δυναμικά
        let end = pageNumber*5; //υπολογίζει τον τελευταίο δείκτη δυναμικά
        setPageNews(newsList.slice(start,end)); // κόβει το array των objects στο διάστημα [start,end)
    }

    let path = window.location.pathname;

    return (
        <ul className="list-group">
            <Pagination count={countOfBtns} className="pagination-style" onClick={changePage} hidePrevButton hideNextButton/>
            {pageNews.map(n => {
                if(path.split("/")[1] !== 'news') {
                    return (
                        <li className="list-group-item" key={n.id}>
                            <p>{n.title}</p>
                            <p>Ημερομηνία: {n.date}</p>
                            <button onClick={() => goToPage(n.id)} className="btn btn-sm">Δείτε Περισσότερα</button>
                        </li>
                    )
                }
                else {
                    return (
                        <li className="list-group-item" key={n.id}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <img src={n.image} className="rounded news-img" alt={n.title}/>
                                </div>
                                <div className="col-sm-8">
                                    <p className="paragraph-3">{n.title}</p>
                                    <p className="paragraph-3">Ημερομηνία: {n.date}</p>
                                    <button onClick={() => goToPage(n.id)} className="btn btn-sm">Δείτε Περισσότερα</button>
                                </div> 
                            </div>                           
                        </li>
                    )
                }
            })}
        </ul>
    )
}

const UsefulVideos = () => {
    return (
        <>
        {usefulVideos.map((v,index) => {
            return (
                <div className={v.ratio} key={uuidv4()}>
                    <iframe title={index} className="embed-responsive-item" src={v.url}></iframe>
                </div>
            )
        })}
        </>
    )
}

export default Home;