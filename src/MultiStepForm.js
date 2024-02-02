// MultiStepForm.js
import React, { useState } from 'react';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
    },
    addressDetails: {
      address: '',
      city: '',
      zipCode: '',
    },
    paymentDetails: {
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePersonalDetails = () => {
    const { firstName, lastName, email } = formData.personalDetails;
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = 'First Name is required';
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
    }

    return errors;
  };

  const validateAddressDetails = () => {
    const { address, city, zipCode } = formData.addressDetails;
    const errors = {};

    if (!address.trim()) {
      errors.address = 'Address is required';
    }

    if (!city.trim()) {
      errors.city = 'City is required';
    }

    if (!zipCode.trim()) {
      errors.zipCode = 'Zip Code is required';
    }

    return errors;
  };

  const validatePaymentDetails = () => {
    const { cardNumber, expirationDate, cvv } = formData.paymentDetails;
    const errors = {};

    if (!cardNumber.trim()) {
      errors.cardNumber = 'Card Number is required';
    }

    if (!expirationDate.trim()) {
      errors.expirationDate = 'Expiration Date is required';
    }

    if (!cvv.trim()) {
      errors.cvv = 'CVV is required';
    }

    return errors;
  };

  const handleInputChange = (stepName, fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [stepName]: {
        ...prevData[stepName],
        [fieldName]: value,
      },
    }));
  };

  const handleNext = () => {
    let validationErrors = {};

    switch (step) {
      case 1:
        validationErrors = validatePersonalDetails();
        break;
      case 2:
        validationErrors = validateAddressDetails();
        break;
      case 3:
        validationErrors = validatePaymentDetails();
        break;
      default:
        break;
    }

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setStep((prevStep) => prevStep + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    let validationErrors = {};

    switch (step) {
      case 1:
        validationErrors = validatePersonalDetails();
        break;
      case 2:
        validationErrors = validateAddressDetails();
        break;
      case 3:
        validationErrors = validatePaymentDetails();
        break;
      default:
        break;
    }

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      // Perform form submission logic here
      // You can send data to the server, display a success message, etc.
      setIsSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Personal Details</h2>
            <label>
              First Name:
              <input
                type="text"
                value={formData.personalDetails.firstName}
                onChange={(e) =>
                  handleInputChange('personalDetails', 'firstName', e.target.value)
                }
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={formData.personalDetails.lastName}
                onChange={(e) =>
                  handleInputChange('personalDetails', 'lastName', e.target.value)
                }
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </label>
            <label>
              Email:
              <input
                type="email"
                value={formData.personalDetails.email}
                onChange={(e) =>
                  handleInputChange('personalDetails', 'email', e.target.value)
                }
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Address Details</h2>
            <label>
              Address:
              <input
                type="text"
                value={formData.addressDetails.address}
                onChange={(e) =>
                  handleInputChange('addressDetails', 'address', e.target.value)
                }
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </label>
            <label>
              City:
              <input
                type="text"
                value={formData.addressDetails.city}
                onChange={(e) =>
                  handleInputChange('addressDetails', 'city', e.target.value)
                }
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </label>
            <label>
              Zip Code:
              <input
                type="text"
                value={formData.addressDetails.zipCode}
                onChange={(e) =>
                  handleInputChange('addressDetails', 'zipCode', e.target.value)
                }
              />
              {errors.zipCode && <span className="error">{errors.zipCode}</span>}
            </label>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Payment Details</h2>
            <label>
              Card Number:
              <input
                type="text"
                value={formData.paymentDetails.cardNumber}
                onChange={(e) =>
                  handleInputChange('paymentDetails', 'cardNumber', e.target.value)
                }
              />
              {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            </label>
            <label>
              Expiration Date:
              <input
                type="text"
                value={formData.paymentDetails.expirationDate}
                onChange={(e) =>
                  handleInputChange('paymentDetails', 'expirationDate', e.target.value)
                }
              />
              {errors.expirationDate && <span className="error">{errors.expirationDate}</span>}
            </label>
            <label>
              CVV:
              <input
                type="text"
                value={formData.paymentDetails.cvv}
                onChange={(e) =>
                  handleInputChange('paymentDetails', 'cvv', e.target.value)
                }
              />
              {errors.cvv && <span className="error">{errors.cvv}</span>}
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    return (
      <div className="result">
        <h2>Form Submitted Successfully!</h2>
        <p>Personal Details:</p>
        <pre>{JSON.stringify(formData.personalDetails, null, 2)}</pre>
        <p>Address Details:</p>
        <pre>{JSON.stringify(formData.addressDetails, null, 2)}</pre>
        <p>Payment Details:</p>
        <pre>{JSON.stringify(formData.paymentDetails, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="container">
      {isSubmitted ? (
        renderResult()
      ) : (
        <div>
          {renderFormStep()}
          <div className="steps">
            <div className={`step ${step === 1 && 'active'}`}>1</div>
            <div className={`step ${step === 2 && 'active'}`}>2</div>
            <div className={`step ${step === 3 && 'active'}`}>3</div>
          </div>
          <div>
            {step > 1 && <button onClick={handlePrev}>Previous</button>}
            {step < 3 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
