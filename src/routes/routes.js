import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Statistics from '../components/statistics/statistics';
import Questions from '../components/questions/questions';
import News from '../components/news/news';
import Navbar from '../components/navbar/navbar';
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import Contact from '../components/contact/contact';
import Appointment from '../components/appointment/appointment';
import Error from '../components/error/error';
import NewsItem from '../components/news-item/newsItem'

const Routes = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/appointment" component={Appointment} />
                <Route exact path="/news" component={News} />
                <Route exact path="/news_item/:id" component={NewsItem} />
                <Route exact path="/questions" component={Questions} />
                <Route exact path="/statistics" component={Statistics} />
                <Route path="*" component={Error} />
            </Switch>
            <Footer />
        </Router>
    )
}

export default Routes;
