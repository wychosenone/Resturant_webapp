import React, { useState, useReducer, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import { fetchAPI, submitAPI } from '../Api';
import { UserContext } from '../UserContext';

export const timeSlots = [
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];
export const occasion = ['Birthday', 'Anniversary'];

export const initializeTimes = (selectedDate) => {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservedTimes = reservations.filter(reservation => reservation.selectedDate === selectedDate)
                                      .map(reservation => reservation.selectedTime);
    const availableTimes = fetchAPI(new Date(selectedDate));
    let updatedTimes = availableTimes.filter(slot => !reservedTimes.includes(slot));
    return updatedTimes;
  };

const timesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.payload;
    default:
      return state;
  }
};

export default function Main() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [availableTimes, dispatchTimes] = useReducer(timesReducer, []);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [occasionError, setOccasionError] = useState('');
  const { username } = useContext(UserContext)
  const { signInStatus } = useContext(UserContext);

  useEffect(() => {
    const updatedTimes = initializeTimes(selectedDate);
    dispatchTimes({ type: 'UPDATE_TIMES', payload: updatedTimes });
  }, [selectedDate]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!signInStatus) {
        alert('You must be signed in to make a reservation.');
        return;
      }


    const formData = {
      selectedDate,
      selectedTime,
      selectedNumber,
      selectedOccasion,
    };
    // use username as a key to store the booking
    let reservations = JSON.parse(localStorage.getItem(`${username}-reservations`)) || [];
    if (submitAPI(formData)) {
      reservations.push(formData);
      localStorage.setItem(`${username}-reservations`, JSON.stringify(reservations));
    } else {
      alert('Reservation failed. Please try again.')
    }
    console.log(formData);
    submitAPI(formData);

    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress === 100) {
          clearInterval(interval);
          setLoading(false);
          navigate('/bookingpage/confirmation', { state: formData });
        }
        return newProgress;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
      navigate('/bookingpage/confirmation', { state: formData });
    }, 2000); // wait 2 seconds before navigating
  };

  const updateTimes = (date) => {
    const updatedTimes = initializeTimes(date);
    dispatchTimes({ type: 'UPDATE_TIMES', payload: updatedTimes });
  };
  const validateForm = (e) => {
    e.preventDefault();
    setDateError('');
    setTimeError('');
    setNumberError('');
    setOccasionError('');

    let hasError = false;

    if (!selectedDate) {
      setDateError('Please select a date.');
      hasError = true;
    }

    if (!selectedTime) {
      setTimeError('Please select a time.');
      hasError = true;
    }

    if (!selectedNumber) {
      setNumberError('Please enter the number of guests.');
      hasError = true;
    }

    if (!selectedOccasion) {
      setOccasionError('Please select an occasion.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    submitForm(e);
  }

  const isFormValid = selectedDate && selectedTime && selectedNumber && selectedOccasion;

  return (
    <div>
      <BookingForm
        timeSlots={timeSlots}
        availableTimes={availableTimes}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        setAvailableTimes={updateTimes}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedOccasion={selectedOccasion}
        setSelectedOccasion={setSelectedOccasion}
        selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber}
        submitForm={submitForm}
        occasion={occasion}
        isLoading={isLoading}
        progress={progress}
        dateError={dateError}
        setDateError={setDateError}
        timeError={timeError}
        setTimeError={setTimeError}
        numberError={numberError}
        setNumberError={setNumberError}
        occasionError={occasionError}
        setOccasionError={setOccasionError}
        isFormValid={isFormValid}
        validateForm={validateForm}
      />
    </div>
  );
}
