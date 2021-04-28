import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import {Line} from 'react-chartjs-2';
import {plotDataStructure} from './plotData';
import $ from 'jquery';
import './statistics.css';

/**
* @component 
* Στατιστικά εμβολιασμών
* @returns JSX 
*/
const Statistics = () => {
    const dateSearchObj = {
        date_from: "2020-12-28",
        date_to: new Date()
                .toISOString()
                .slice(0, 10)
    }

    const [searchDates,setSearchDates] = useState(dateSearchObj);
    const [statistics,setStatistics] = useState([]);
    const [searchedStatistics,setSearchedStatistics] = useState([]);
    const [plotData, setPlotData] = useState({});

    /**
    * Ανακτά τα δεδομένα μέχρι μία συγκεκριμένη μέρα.
    */
    const getDataUntilDay = async() => {
        doGetRequest(searchDates);
        getFinalUpdateForVaccinations();
        createStatisticsForGraph()
    }

    /** 
    * Δημιουργεί τη κατάλλη μορφή που πρέπει να έχουν τα δεδομένα του γραφήματος
    */
    const createStatisticsForGraph = () => {
        /*Εκχωρεί τα δεδομένα εντός ενός χρονικού διαστήματος ταξινομημένα με βάση την ημερομηνία*/
        let graphStatisticsData = statistics
                                .filter(s => new Date(s.referencedate.slice(0,10)) >= new Date(searchDates.date_from) 
                                        && new Date(s.referencedate.slice(0,10)) <= new Date(searchDates.date_to))
                                .map(s => {
                                    return {
                                        referencedate: s.referencedate,
                                        totaldose1: s.totaldose1,
                                        totaldose2: s.totaldose2,
                                        totalvaccinations: s.totalvaccinations
                                    }
                                })
                                .sort((s1,s2) => new Date(s1.referencedate) - new Date(s2.referencedate));
        let allDates = graphStatisticsData.map(s => s.referencedate); //εκχωρεί όλες τις ημερομηνίες 
        let uniqueDates = [...new Set(allDates)]; //εκχωρεί μοναδικά κάθε ημερομηνία
        let labels = uniqueDates.map(l => l.slice(0,10)); //εκχωρεί τη μορφή που θέλουμε να εμφανίζονται οι ημερομηνίες στο γράφημα
        let totaldoses1 = sumByDay(graphStatisticsData,uniqueDates,"totaldose1"); //βρίσκουμε τις συνολικές πρώτες δόσεις κάθε ημέρας
        let totaldoses2 = sumByDay(graphStatisticsData,uniqueDates,"totaldose2"); //βρίσκουμε τις συνολικές δεύτερες δόσεις κάθε ημέρας
        let totalvaccinations = sumByDay(graphStatisticsData,uniqueDates,"totalvaccinations"); //βρίσκουμε τα συνολικά εμβόλια που χρησιμοποιήθηκαν κάθε ημέρα
        /*Εισάγουμε τα δεδομένα σε ένα object για την εμφάνιση των δεδομένων στο γράφημα */
        plotDataStructure.labels = [...labels];
        plotDataStructure.datasets[0].data = [...totalvaccinations];
        plotDataStructure.datasets[1].data = [...totaldoses1];
        plotDataStructure.datasets[2].data = [...totaldoses2];
        setPlotData({...plotDataStructure});
    }

    /**
     * Υπολογίζει το άθροισμα για κάθε μέρα
     * @param {Array.<Object>} data Τα στατιστικά δεδομένα μέχρι ένα χρονικό διάστημα
     * @param {Array.<String>} dates Οι ημερομηνίες των ενημερώσεων μέχρι εκείνη τη μέρα
     * @param {String} prop Το όνομα της ιδιότητας
     * @returns {Array.<Number>} 
     */
    const sumByDay = (data,dates,prop) => {
        let arr = [];
        dates
        .map(d => { 
            let sum = 0;
            data
            .map(s =>{ 
                if(new Date(s.referencedate.slice(0,10)).toDateString() === new Date(d.slice(0,10)).toDateString()){
                    sum += s[prop];
                }
                return s;
            });
            arr = [...arr,sum];
            return d;
        });
        return arr;
    }

    /**
     * Κάνει ajax κλήση για την ανάκτηση των δεδομένων από το API για τα στατιστικά εμβολιασμών
     * @param {Object} data Αντικείμενο με τις ημερομηνίες που περιγράφουν το χρονικό διάστημα εμβολιασμών
     */
    const doGetRequest = async(data) => {
        if(statistics.length === 0) {
            $.ajax({
                url: 'https://data.gov.gr/api/v1/query/mdg_emvolio',
                data: data,
                dataType: 'json',
                headers: {
                    "Authorization": `Token ${process.env.REACT_APP_API_TOKEN}`
                },
                success: function (data) {
                    console.log('Total results found: ' + data.length);
                    if (data.length > 0) {
                        setStatistics(data);
                    }
                },
                fail: function (msg) {
                    console.log(msg);
                }
            });
        }
    }

    /** 
    * Ανακτά τα δεδομένα για την εμφάνιση τους στο πίνακα
    */
    const getFinalUpdateForVaccinations = () => {
        let {date_from,date_to} = searchDates;
        /* Τα στατιστικά δεδομένα εντός του χρονικού διαστήματος που έχει τεθεί */
        let statisticsUntilDay = statistics
                                .filter(s => new Date(s.referencedate.slice(0,10)) >= new Date(date_from) 
                                            && new Date(s.referencedate.slice(0,10)) <= new Date(date_to))
                                .map(s => s);
        let ids = statisticsUntilDay.map(s => s.areaid); //εκχωρεί μία με όλα τα αναγνωριστικά των περιφερειακών ενοτήτων
        let uniqueIds = [...new Set(ids)]; //εκχωρεί μοναδικά τα αναγνωριστικά όλων των περιφερειακών ενοτήτων
        let regionsUpdates = []; //αποθηκεύονται ομαδοποιημένες οι ενημερώσεις για κάθε περιφερειακή ενότητα.
        uniqueIds.map(id => {
            let regionObjs = statisticsUntilDay
                .filter(s => s.areaid === id)
                .map(s => {
                    return {
                        area: s.area,
                        areaid: s.areaid, 
                        totaldose1: s.totaldose1, 
                        totaldose2: s.totaldose2,
                        referencedate: s.referencedate,
                        totalvaccinations: s.totalvaccinations
                    }
                });
            regionsUpdates.push(regionObjs);
            return id;
        });

        /* Εκχωρεί τις ημερομηνίες που έχουν γίνει ενημερώσεις για κάθε περιφερειακή ενότητα */
        let regionsDates = regionsUpdates.map(region => { 
            return region.map(s => new Date(s.referencedate));
        });

        /* Εκχωρεί τη τελευταία ημερομηνία ενημέρωσης των δεδομένων εντός του χρονικού διαστήματος*/
        let latestUpdate = new Date(Math.max(...regionsDates.map(d => Math.max(...d))))
                              .toDateString();

        /* Επιστρέφει τη τελευταία ενημέρωση για κάθε περιφερειακή ενότητα */
        let finalRegionsUpdates = regionsUpdates
                                 .map(region => {
                                    return region
                                        .filter(s => new Date(s.referencedate.slice(0,10)).toDateString() === latestUpdate)
                                        .map(s => s);
                                 });

        setSearchedStatistics(finalRegionsUpdates);
    }

    /**
     * @param {Object} event Το συμβάν που κάλεσε τη συνάρτηση
     */
    const handleInputs = async(event) => {
        let name = event.target.name;
        let value = event.target.value;
        setSearchDates({
            ...searchDates,
            [name]: value
        });
    }

    useEffect(async() => {
       getDataUntilDay();
    },[statistics,searchDates]);

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <form className="form-statistics">
                        <h2 className="date-heading d-flex justify-content-center">Επιλέξτε χρονικό διάστημα:
                        </h2>
                        <TextField
                            id="date"
                            label="Από Ημέρα"
                            name="date_from"
                            type="date"
                            className="days-inputs"
                            defaultValue={searchDates.date_from}
                            onChange={handleInputs}
                            InputLabelProps={{
                            shrink: true
                        }}/>
                        <TextField
                            id="date"
                            label="Σε Ημέρα"
                            name="date_to"
                            type="date"
                            className="days-inputs"
                            defaultValue={searchDates.date_to}
                            onChange={handleInputs}
                            InputLabelProps={{
                            shrink: true
                        }}/>
                    </form>
                </div>
                <div className="col-sm-2"></div>
            </div>
            <div className="row mt-5 mb-5 graph-style">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <h2 className="mb-3 heading-statistics">Γραφική Αναπαράσταση Εμβολιών στο διάστημα {searchDates.date_from} έως {searchDates.date_to}</h2>
                    <Line data={plotData}/>
                </div>
                <div className="col-sm-2"></div>
            </div>
            <div className="row mt-5 mb-5">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                     <h2 className="mb-3 heading-statistics">Στατιστικά Εμβολιασμών ανά Περιφερειακή Ενότητα μέχρι {searchDates.date_to}</h2>
                     <table className="table">
                        <thead className="thead-vaccinations">
                            <tr>
                                <th scope="col-sm">Περιφερειακή Ενότητα</th>
                                <th scope="col-sm">Eμβόλια α-δόσης</th>
                                <th scope="col-sm">Eμβόλια β-δόσης</th>
                                <th scope="col-sm">Συνολικά εμβόλια</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedStatistics.map(s => {
                                return (
                                    <tr key={s[0].areaid}>
                                        <td className="table-paragraph">{s[0].area}</td>
                                        <td className="table-paragraph">{s[0].totaldose1}</td>
                                        <td className="table-paragraph">{s[0].totaldose2}</td>
                                        <td className="table-paragraph">{s[0].totalvaccinations}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    )
}

export default Statistics;