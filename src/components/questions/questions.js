import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
import {questionsInfo} from './questionsInfo';
import './questions.css';

const Questions = () => {
    return (
        <div className="container-fluid">
            <h1 className="d-flex justify-content-center mt-3 question-heading">Συχνές ερωτήσεις</h1>
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6 mt-3 mb-5">
                    <AccordionQuestions />
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
    )
}

const AccordionQuestions = () => {
    return (
        <>
        {questionsInfo.map((q,index) => {
            return (
            <Accordion key={uuidv4()}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <p className="question-paragraph">{index+1}. {q.question}</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p className="answer-paragraph"> {q.answer} </p>
                </AccordionDetails>
            </Accordion>
            )
        })}
        
        </>
    )
}

export default Questions;