import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setTariffRedux, setLoading } from "./redux/reducers/tariffReducer";
import Test from "./components/Test";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        // Turn on the loading state
        dispatch(setLoading(true));

        const response = await fetch("https://demo6684249.mockable.io/tariffs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Simulate a loading state for 2 seconds before setting the data
        setTimeout(() => {
          dispatch(setTariffRedux(data.tariffs));
          // Turn off the loading state when data is ready
          dispatch(setLoading(false));
        }, 2000); // Adjust the delay time as needed
      } catch (error) {
        console.error("Fetch error:", error);
        alert("There was a network issue. Please refresh the page.");
        // Turn off the loading state in case of an error
        dispatch(setLoading(false));
      }
    };

    fetchTariffs();
  }, [dispatch]);

  return <div className="App"><Test /></div>;
}

export default App;
