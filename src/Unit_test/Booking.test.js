import { fetchAPI } from '../Api';
import { initializeTimes, updateTimes } from '../Component/Main';

jest.mock('./Api', () => ({
  fetchAPI: jest.fn(() => Promise.resolve(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'])),
}));

const localStorageMock = (function() {
  let store = {}
  return {
    getItem: function(key) {
      return store[key] || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    clear: function() {
      store = {}
    }
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

describe('initializeTimes function', () => {
  it('should return an array of available times', async () => {
    const selectedDate = '2023-01-01';
    localStorage.setItem('reservations', JSON.stringify([
      { selectedDate: '2023-01-02', selectedTime: '17:00' },
      { selectedDate: '2023-01-01', selectedTime: '19:00' }
    ]));
    const result = await initializeTimes(selectedDate);
    expect(fetchAPI).toHaveBeenCalledWith(new Date(selectedDate));
    expect(result).toEqual(['17:00', '18:00', '20:00', '21:00', '22:00']);
  });
});

describe('updateTimes function', () => {
  it('should dispatch an action to update the available times', async () => {
    const dispatchTimes = jest.fn(); // mock dispatch function
    const selectedDate = '2023-01-01';
    localStorage.setItem('reservations', JSON.stringify([
      { selectedDate: '2023-01-02', selectedTime: '17:00' },
      { selectedDate: '2023-01-01', selectedTime: '19:00' }
    ]));
    await updateTimes(selectedDate, dispatchTimes);
    expect(fetchAPI).toHaveBeenCalledWith(new Date(selectedDate));
    expect(dispatchTimes).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', payload: ['17:00', '18:00', '20:00', '21:00', '22:00'] });
  });
});
