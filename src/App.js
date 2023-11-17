import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setLoading, fetchTariffs } from "./redux/reducers/tariffReducer";
import TariffBody from "./components/TariffBody";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        await dispatch(fetchTariffs());

        dispatch(setLoading(false));
      } catch (error) {
        console.error("Fetch error:", error);
        alert("There was a network issue. Please refresh the page.");

        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <div className="Body">
        <Sidebar />
        <TariffBody />
      </div>
    </div>
  );
}

export default App;
