import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setTariffRedux, setLoading } from "./redux/reducers/tariffReducer";
import Test from "./components/Test";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        dispatch(setLoading(true));

        const response = await fetch("https://demo6684249.mockable.io/tariffs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setTimeout(() => {
          dispatch(setTariffRedux(data.tariffs));
          dispatch(setLoading(false));
        }, 2000);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("There was a network issue. Please refresh the page.");

        dispatch(setLoading(false));
      }
    };

    fetchTariffs();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <div className="Body">
        <Sidebar />
        <Test />
      </div>
    </div>
  );
}

export default App;
