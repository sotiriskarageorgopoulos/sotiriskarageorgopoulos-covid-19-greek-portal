import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';
import './contact.css';

const Contact = () => {
    let person = {
        name:"",
        surname:"",
        email:"",
        tel:"",
        message:""
    }

    let formInputValidation = {
        isName:true,
        isSurname:true,
        isEmail:true,
        isTel:true,
        isMessage:true
    }

    let texts = {
        nameErrorText:"",
        surnameErrorText:"",
        emailErrorText:"",
        telErrorText:"",
        messageErrorText:""
    }
    const [validatedInputs, setValidatedInputs] = useState(formInputValidation);
    const [errorTexts, setErrorText] = useState(texts);
    const [personDetails, setPersonDetails] = useState(person);

    const sendMessage = (event) => {
        event.preventDefault();
        let isFormValidated = validatedInputs.isName && validatedInputs.isSurname && validatedInputs.isEmail && validatedInputs.isTel && validatedInputs.isMessage;
        if(isFormValidated) {
            console.log(personDetails);
        }
        else {
            $("#add-error-text").append('<p class="contact-error-text">Δεν ειναι σωστά τα στοιχεία επικοινωνίας!!!</p>')
        }
    }

    const handleInputs = (event) => {
        let inputName = event.target.name;
        let value = event.target.value;
       
        if(inputName === 'name'){
            checkText(inputName,value);
            if(validatedInputs.isName) setPersonDetails({...personDetails,[inputName]:value});
        }else if(inputName === 'surname') {
            checkText(inputName,value);
            if(validatedInputs.isName) setPersonDetails({...personDetails,[inputName]:value});
        }else if(inputName === 'email') {
            checkEmail(value);
            if(validatedInputs.isEmail) setPersonDetails({...personDetails,[inputName]:value});
        }else if(inputName === 'tel') {
            checkTel(value);
            if(validatedInputs.isTel) setPersonDetails({...personDetails,[inputName]:value});
        }else if(inputName === 'message') {
            checkMessage(value);
            if(validatedInputs.isMessage) setPersonDetails({...personDetails,[inputName]:value});
        }
    }

    const checkText = (inputName,value) => {
        let inputNameCapFirstLetter = "is"+inputName.charAt(0).toUpperCase() + inputName.slice(1);
        let inputErrorText = inputName+"ErrorText";
        if(value) {
            setValidatedInputs({...validatedInputs,[inputNameCapFirstLetter]:true});
            setErrorText({...errorTexts,[inputErrorText]:""});
        }
        else {
            setValidatedInputs({...validatedInputs,[inputNameCapFirstLetter]:false}); 
            setErrorText({...errorTexts,[inputErrorText]:"Δεν έχετε συμπληρώσει το πεδίο."});
        }
        return "";
    }

    const checkEmail = (value) =>{
        let isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
        if(isValid) {
            setValidatedInputs({...validatedInputs,"isEmail":true});
            setErrorText({...errorTexts, emailErrorText:""})
        }else {
            setValidatedInputs({...validatedInputs,"isEmail":false});
            setErrorText({...errorTexts, emailErrorText:"Δεν έχει δοθεί σωστό email."})
        }
    } 

    const checkTel = (value) => {
        let isValid = /^\d{10}$/.test(value);
        if(isValid) {
            setValidatedInputs({...validatedInputs,"isTel":true});
            setErrorText({...errorTexts, telErrorText:""});
        }else {
            setValidatedInputs({...validatedInputs,"isTel":false});
            setErrorText({...errorTexts, telErrorText:"Δεν έχει δοθεί σωστός τηλεφωνικός αριθμός."});
        }

    }

    const checkMessage = (value) => {
        if(value.length < 10) {
            setValidatedInputs({...validatedInputs,"isMessage":false});
            setErrorText({...errorTexts, messageErrorText:"Χρειάζονται τουλάχιστον 10 χαρακτήρες."});
        }else {
            setValidatedInputs({...validatedInputs,"isMessage":true});
            setErrorText({...errorTexts, messageErrorText:""});
        }
    }

    return (
        <div className="container-fluid mt-3 mb-3">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4" id="add-error-text">
                    <h2 className="d-flex justify-content-center contact-heading">Στοιχεία Επικοινωνίας</h2>
                    <form className="contact-form mt-3" onSubmit={sendMessage}>
                        {/*Χρησιμοποίησα το event οnBlur ώστε να μπορώ να παίρνω τις τιμές 
                        που γίνονται autocomplete απο τον browser*/}
                        <TextField 
                            required 
                            error={validatedInputs.isName === false}
                            className="input-fields" 
                            name="name" 
                            id="name" 
                            label="Όνομα" 
                            helperText={errorTexts.nameErrorText === '' ? '': errorTexts.nameErrorText}
                            defaultValue={personDetails.name} 
                            onChange={handleInputs} 
                            onClick={handleInputs}
                            onBlur={handleInputs}
                            />
                        <TextField 
                            required 
                            error={validatedInputs.isSurname === false}
                            className="input-fields" 
                            name="surname"
                            id="surname"
                            label="Επίθετο" 
                            helperText={errorTexts.surnameErrorText === '' ? '': errorTexts.surnameErrorText}
                            defaultValue={personDetails.surname} 
                            onChange={handleInputs}
                            onClick={handleInputs}
                            onBlur={handleInputs}
                        />
                        <TextField 
                            required 
                            error={validatedInputs.isEmail === false}
                            className="input-fields"
                            name="email" 
                            id="email" 
                            label="Email" 
                            helperText={errorTexts.emailErrorText === '' ? '': errorTexts.emailErrorText}
                            defaultValue={personDetails.email} 
                            onChange={handleInputs}
                            onClick={handleInputs}
                            onBlur={handleInputs}
                        />
                        <TextField 
                            required 
                            error={validatedInputs.isTel === false}
                            className="input-fields" 
                            name="tel" 
                            id="tel" 
                            label="Τηλέφωνο" 
                            helperText={errorTexts.telErrorText === '' ? '': errorTexts.telErrorText}
                            defaultValue={personDetails.tel} 
                            onChange={handleInputs}
                            onClick={handleInputs}
                            onBlur={handleInputs}
                        />
                        <TextField 
                            required 
                            multiline 
                            error={validatedInputs.isMessage === false}
                            className="input-msg" 
                            name="message"
                            id="message" 
                            label="Μήνυμα" 
                            helperText={errorTexts.messageErrorText === '' ? '': errorTexts.messageErrorText}
                            defaultValue={personDetails.message} 
                            onChange={handleInputs}
                            onClick={handleInputs}
                            onBlur={handleInputs}
                        />       
                        <div className="d-flex col mt-5 justify-content-center">
                            <button type="submit" className="btn btn-sm">Υποβολή</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    )

}

export default Contact;