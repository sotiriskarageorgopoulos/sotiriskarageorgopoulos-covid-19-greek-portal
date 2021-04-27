import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import $ from 'jquery';
import "./appointment.css";

let dateTimeObj = {};
let appointmentObj = {};

const Appointment = () => {
  return <StepperAppointment />;
};

const ScheduleAppointment = () => {
  const createRandomDateTime = (start, end) => {
    let dateTimeInput = $("#datetime");
    let datetime = $("#datetime").val();
    dateTimeObj = {datetime,dateTimeInput};
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .slice(0, 16);
  };

  let [datetime, setDateTime] = useState(createRandomDateTime(new Date(), new Date(2021, 12, 12)));

  const handleDatetime = (event) => {
    setDateTime(event.target.value);
    let dateTimeInput = $("#datetime");
    let datetime = $("#datetime").val();
    dateTimeObj = {datetime,dateTimeInput};
  };

  return (
    <form className="container-fluid">
      <div className="row">
        <p>
          Η ημέρα και ώρα του ραντεβού σας για εμβολιασμό κατά της Covid-19, που
          επιλέχθηκε τυχαία είναι:
        </p>
      </div>
      <div className="row">
        <TextField
          required
          type="datetime-local"
          name="datetime"
          id="datetime"
          defaultValue={datetime}
          onChange={handleDatetime}
          onClick={handleDatetime}
          onBlur={handleDatetime}
        />
      </div>
      <div className="row">
        <p className="mt-4">Εάν συμφωνείτε πατήστε το κουμπί επόμενο.</p>
      </div>
    </form>
  );
};

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <ScheduleAppointment />;
    case 1:
      return <AppointmentForm />;
  }
};

const StepperAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  let history = useHistory();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    "Επιλογή Ημερομηνίας και Ώρας Ραντεβού",
    "Συμπλήρωση Στοιχείων Πολίτη",
  ];
  return (
    <div className="container-fluid mt-5 mb-5">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8" id="add-text">
          <h2 className="d-flex justify-content-center make-appointment-heading mb-3">Κανονίστε ένα ραντεβού για εμβολιασμό!</h2>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((title, index) => {
              return (
                <Step key={title}>
                  <StepLabel>{title}</StepLabel>
                  <StepContent>
                    {getStepContent(index)}
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className="mt-3 mr-2"
                    >
                      Επιστροφή
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => history.push('/home')}
                      className="mt-3 mr-2"
                    >
                      Ακύρωση Διαδικασίας
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep === 0 ? handleNext : createAppointment}
                      className="mt-3 mr-2"
                    >
                      {activeStep === steps.length - 1 ? "Υποβολή" : "Επόμενο"}
                    </Button>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

const createAppointment = () => {
  console.log(appointmentObj);
  if(Object.keys(appointmentObj).length !== 0) {
    let {appointmentDetails,validatedInputs} = appointmentObj;
    let isValid = validatedInputs.isName && validatedInputs.isSurname && validatedInputs.isEmail
                    && validatedInputs.isSocialSecurityNumber && validatedInputs.isTel;
    
    if(isValid) {
      $.post("https://us-central1-unipi-aps.cloudfunctions.net/emvolioDate",appointmentDetails)
       .done(function (msg) {
        console.log(msg);
        $(".appointment-success-text").remove();
        $(".appointment-error-text").remove();
        $("#add-text").append('<p class="appointment-success-text">Το ραντεβού καθορίστηκε με επιτυχία!!! Περιμένετε...</p>');
        setTimeout(() => {window.location.reload()}, 3000);
       })
       .fail(function (msg) {
        console.log(msg);
        $(".appointment-success-text").remove();
        $(".appointment-error-text").remove();
        $("#add-text").append('<p class="appointment-error-text">Υπήρξε πρόβλημα κατά την υποβολή των δεδομένων. Προσπαθείστε ξανά.</p>');
       });
    }
    else {
      $(".appointment-success-text").remove();
      $(".appointment-error-text").remove();
      $("#add-text").append('<p class="appointment-error-text">Δεν ειναι σωστά τα στοιχεία του πολίτη!!!</p>');
    }
  }
  else {
     $(".appointment-success-text").remove();
     $(".appointment-error-text").remove();
     $("#add-text").append('<p class="appointment-error-text">Δεν έχουν συμπληρωθεί τα στοιχεία του πολίτη!!!</p>');
  }
};

const AppointmentForm = () => {
  let formInputValidation = {
    isName: true,
    isSurname: true,
    isEmail: true,
    isTel: true,
    isSocialSecurityNumber: true,
  };

  let texts = {
    nameErrorText: "",
    surnameErrorText: "",
    emailErrorText: "",
    telErrorText: "",
    socialSecurityNumberErrorText: "",
  };

  let appointment = {
    name: "",
    surname: "",
    email: "",
    tel: "",
    gender: "",
    socialSecurityNumber: "",
    datetime: "",
  };

  let genders = [
    {
      value: "MALE",
      label: "Άνδρας",
    },
    {
      value: "FEMALE",
      label: "Γυναίκα",
    },
  ];

  const [validatedInputs, setValidatedInputs] = useState(formInputValidation);
  const [errorTexts, setErrorText] = useState(texts);
  const [appointmentDetails, setAppointmentDetails] = useState(appointment);

  useEffect(() => {
    let {datetime,dateTimeInput} = dateTimeObj;
    $("#add-datetime").append(dateTimeInput.prop("disabled", true));
    setAppointmentDetails({...appointmentDetails,datetime});
  },[]);

  const handleInputs = (event) => {
    let inputName = event.target.name;
    let value = event.target.value;
    if (inputName === "socialSecurityNumber") {
      checkSocialSecurityNumber(value);
      if (validatedInputs.isSocialSecurityNumber) setAppointmentDetails({ ...appointmentDetails, [inputName]: value });
    } else if (inputName === "name") {
      checkText(inputName, value);
      if (validatedInputs.isName) setAppointmentDetails({ ...appointmentDetails, [inputName]: value });
    } else if (inputName === "surname") {
      checkText(inputName, value);
      if (validatedInputs.isSurname) setAppointmentDetails({ ...appointmentDetails, [inputName]: value });
    } else if (inputName === "email") {
      checkEmail(value);
      if (validatedInputs.isEmail) setAppointmentDetails({ ...appointmentDetails, [inputName]: value });
    } else if (inputName === "tel") {
      checkTel(value);
      if (validatedInputs.isTel) setAppointmentDetails({ ...appointmentDetails, [inputName]: value });
    } else if (inputName === "gender") {
        setAppointmentDetails({...appointmentDetails, [inputName]:value});
    }
    appointmentObj = {appointmentDetails,validatedInputs};
  };

  const checkEmail = (value) => {
    let isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
    if (isValid) {
      setValidatedInputs({ ...validatedInputs, isEmail: true });
      setErrorText({ ...errorTexts, emailErrorText: "" });
    } else {
      setValidatedInputs({ ...validatedInputs, isEmail: false });
      setErrorText({...errorTexts,emailErrorText: "Δεν έχει δοθεί σωστό email."});
    }
  };

  const checkSocialSecurityNumber = (value) => {
    let isValid = /^\d{11}$/.test(value);
    if (isValid) {
      setValidatedInputs({ ...validatedInputs, isSocialSecurityNumber: true });
    } else {
      setValidatedInputs({ ...validatedInputs, isSocialSecurityNumber: false });
      setErrorText({...errorTexts,socialSecurityNumberErrorText: "O AMKA έχει απαραίτητα 11 ψηφία."});
    }
  };

  const checkTel = (value) => {
    let isValid = /^\d{10}$/.test(value);
    if (isValid) {
      setValidatedInputs({ ...validatedInputs, isTel: true });
      setErrorText({ ...errorTexts, telErrorText: "" });
    } else {
      setValidatedInputs({ ...validatedInputs, isTel: false });
      setErrorText({...errorTexts,telErrorText: "Δεν έχει δοθεί σωστός τηλεφωνικός αριθμός."});
    }
  };

  const checkText = (inputName, value) => {
    let inputNameCapFirstLetter =
      "is" + inputName.charAt(0).toUpperCase() + inputName.slice(1);
    let inputErrorText = inputName + "ErrorText";
    if (value) {
      setValidatedInputs({...validatedInputs,[inputNameCapFirstLetter]: true });
      setErrorText({ ...errorTexts, [inputErrorText]: "" });
    } else {
      setValidatedInputs({...validatedInputs,[inputNameCapFirstLetter]: false });
      setErrorText({...errorTexts,[inputErrorText]: "Δεν έχετε συμπληρώσει το πεδίο." });
    }
    return "";
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <form className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <TextField
                  required
                  error={validatedInputs.isSocialSecurityNumber === false}
                  className="input-fields"
                  name="socialSecurityNumber"
                  id="socialSecurityNumber"
                  label="ΑΜΚΑ"
                  helperText={
                    errorTexts.socialSecurityNumberErrorText === ""
                      ? ""
                      : errorTexts.socialSecurityNumberErrorText
                  }
                  defaultValue={appointmentDetails.socialSecurityNumber}
                  onChange={handleInputs}
                  onClick={handleInputs}
                  onBlur={handleInputs}
                />
              </div>
              <div className="col-sm-6">
                <TextField
                  required
                  error={validatedInputs.isName === false}
                  className="input-fields"
                  name="name"
                  id="name"
                  label="Όνομα"
                  helperText={
                    errorTexts.nameErrorText === ""
                      ? ""
                      : errorTexts.nameErrorText
                  }
                  defaultValue={appointmentDetails.name}
                  onChange={handleInputs}
                  onClick={handleInputs}
                  onBlur={handleInputs}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <TextField
                  required
                  error={validatedInputs.isSurname === false}
                  className="input-fields"
                  name="surname"
                  id="surname"
                  label="Επίθετο"
                  helperText={
                    errorTexts.surnameErrorText === ""
                      ? ""
                      : errorTexts.surnameErrorText
                  }
                  defaultValue={appointmentDetails.surname}
                  onChange={handleInputs}
                  onClick={handleInputs}
                  onBlur={handleInputs}
                />
              </div>
              <div className="col-sm-6">
                <TextField
                  required
                  error={validatedInputs.isEmail === false}
                  className="input-fields"
                  name="email"
                  id="email"
                  label="Email"
                  helperText={
                    errorTexts.emailErrorText === ""
                      ? ""
                      : errorTexts.emailErrorText
                  }
                  defaultValue={appointmentDetails.email}
                  onChange={handleInputs}
                  onClick={handleInputs}
                  onBlur={handleInputs}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <TextField
                  required
                  error={validatedInputs.isTel === false}
                  className="input-fields"
                  name="tel"
                  id="tel"
                  label="Τηλέφωνο"
                  helperText={
                    errorTexts.telErrorText === ""
                      ? ""
                      : errorTexts.telErrorText
                  }
                  defaultValue={appointmentDetails.tel}
                  onChange={handleInputs}
                  onClick={handleInputs}
                  onBlur={handleInputs}
                />
              </div>
              <div className="col-sm-6">
                <TextField
                  required
                  select
                  className="input-fields"
                  name="gender"
                  id="gender"
                  label="Φύλο"
                  defaultValue={appointmentDetails.gender}
                  onChange={handleInputs}
                  onClick={handleInputs}
                  onBlur={handleInputs}
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="row mt-3 mb-3">
              <div className="col" id="add-datetime">
                <p>Ημερομηνία και Ώρα Ραντεβού: </p>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
};

export default Appointment;
