import axios from 'axios';

export const getData = async (value) => {
  await axios.get("https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=demo&source=docs");
};

export const getStats = async () => {
  await axios.get("");
}