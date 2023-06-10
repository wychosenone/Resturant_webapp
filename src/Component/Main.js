import React, { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import { fetchAPI, submitAPI } from '../Api';

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

  useEffect(() => {
    const updatedTimes = initializeTimes(selectedDate);
    dispatchTimes({ type: 'UPDATE_TIMES', payload: updatedTimes });
  }, [selectedDate]);

  const submitForm = (e) => {
    e.preventDefault();
    const formData = {
      selectedDate,
      selectedTime,
      selectedNumber,
      selectedOccasion,
    };
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
  if (submitAPI(formData)) {
    reservations.push(formData);
    localStorage.setItem('reservations', JSON.stringify(reservations));
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
      />
    </div>
  );
}
