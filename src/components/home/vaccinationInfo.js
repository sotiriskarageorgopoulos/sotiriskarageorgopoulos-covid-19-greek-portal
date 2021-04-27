import VaccinationAppointment from '../../assets/images/vaccination_appointment.png';
import CovidStatistics from '../../assets/images/covid_statistics.jpg';
import FAQ from '../../assets/images/faq.png';
export const vaccinationInfo = [
    {
        name:"Ραντεβου για Εμβολιασμό",
        path:"/appointment",
        image: VaccinationAppointment,
        nameOfImage:"Εικόνα ραντεβού για εμβολιασμό",
        content:"Συμπλήρωση των στοιχείων σας για να κανονίσετε ραντεβού για τον εμβολιασμό σας κατά της Covid-19"
    },
    {
        name:"Στατιστικά Εμβολιασμών",
        path:"/statistics",
        image: CovidStatistics,
        nameOfImage:"Εικόνα στατιστικών εμβολιασμού",
        content:"Παρουσίαση στατιστικών στοιχείων για τον εμβολιασμό κατά της Covid-19"
    },
    {
        name:"Συχνές Ερωτήσεις",
        path:"/questions",
        image: FAQ,
        nameOfImage:"Εικόνα συχνών ερωτήσεων",
        content:"Απαντήσεις σε ερωτήσεις για τα εμβόλια και τον εμβολιασμό κατά της Covid-19"
    }
]