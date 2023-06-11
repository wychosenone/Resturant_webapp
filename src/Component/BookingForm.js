import { useState } from "react";
import { ProgressBar } from 'react-bootstrap';

export default function BookingForm({
  timeSlots,
  availableTimes,
  selectedTime,
  setSelectedTime,
  selectedDate,
  setSelectedDate,
  selectedOccasion,
  setSelectedOccasion,
  selectedNumber,
  setSelectedNumber,
  submitForm,
  occasion,
  isLoading,
  progress,
}) {
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [occasionError, setOccasionError] = useState('');

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
    <div className="d-flex justify-content-center">
      <form
        className="form"
        onSubmit={validateForm}
        style={{ maxWidth: '200px', gap: '20px' }}
      >
        <div className="form-group">
          <label htmlFor="res-date">Choose date</label>
          <input
            type="date"
            id="res-date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setDateError('');
            }}
            required
          />
          {dateError && <span className="text-danger">{dateError}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="res-time">Choose time</label>
          <select
            id="res-time"
            className="form-control"
            value={selectedTime}
            onChange={(e) => {
              setSelectedTime(e.target.value);
              setTimeError('');
            }}
            required
          >
            <option value="">Select a time</option>
            {timeSlots
              .filter(time => availableTimes.includes(time))
              .map((time) => (
                <option key={time}>{time}</option>
              ))}
          </select>
          {timeError && <span className="text-danger">{timeError}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            onChange={(e) => {
              setSelectedNumber(e.target.value);
              setNumberError('');
            }}
            value={selectedNumber}
            placeholder="1"
            min="1"
            max="10"
            id="guests"
            className="form-control"
            required
          />
          {numberError && <span className="text-danger">{numberError}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            className="form-control"
            value={selectedOccasion}
            onChange={(e) => {
              setSelectedOccasion(e.target.value);
              setOccasionError('');
            }}
            required
          >
            <option value="">Select an occasion</option>
            {occasion.map((occa) => (
              <option key={occa}>{occa}</option>
            ))}
          </select>
          {occasionError && <span className="text-danger">{occasionError}</span>}
        </div>

        {isLoading ? (
          <div className="text-center">
            <ProgressBar animated now={progress} label={`${progress}%`} />
          </div>
        ) : (
          <button type="submit" aria-label="On Click" className="btn btn-primary mt-3" disabled={!isFormValid}>
            Make Your Reservation
          </button>
        )}
      </form>
    </div>
  );
}
