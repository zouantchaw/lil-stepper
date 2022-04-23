import { useState } from 'react';
import { StepperContext } from './context/StepperContext';
import logo from './logo.svg';
import Stepper from './components/Stepper';
import StepperControl from './components/StepperControl';

import Account from './components/steps/Account';
import Details from './components/steps/Details';
import Final from './components/steps/Final';
import Payment from './components/steps/Payment';

function App() {

  // state to keep track of the current step
  const [currentStep, setCurrentStep] = useState(1);

  // state to keep track of user data
  const [userData, setUserData] = useState('');

  // state to keep track of final data
  const [finalData, setFinalData] = useState([]);

  // array of steps
  const steps = [
    "Account Information",
    "Personal Details",
    "Complete",
  ];

  // function to display current step content
  const displayStep = (step) => {
    switch(step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Final />;
      default:
    }
  }

  // function to handle 'back' and 'next' buttons
  const handleClick = (direction) => {
    console.log('direction: ', direction);
    let newStep = currentStep;

    direction === 'next' ? newStep++ : newStep--;
    // check is steps are within range
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }

  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      {/* Stepper */}
      <div className="container horizontal mt-5">
        <Stepper
          steps={steps}
          currentStep={currentStep} 
        />

      {/* Display Components */}
      <div className='my-10 p-10'>
        <StepperContext.Provider value={{
          userData,
          setUserData,
          finalData,
          setFinalData
         }}>  
          {displayStep(currentStep)}
        </StepperContext.Provider>
      </div>

      </div>


      {/* Navigation controls */}
      <StepperControl 
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps}
      />
    </div>
  );
}

export default App;
