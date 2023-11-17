import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import {
  setTariffRedux,
  setLoading,
  setCalculateTariffs,
} from "./redux/reducers/tariffReducer";
import TariffBody from "./components/TariffBody";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { calculateTariffs } from "./utils/utils";
function App() {
  const dispatch = useDispatch();

  //send to redux via thunk - begin success failure, fetch... for better code structure.
  // look : https://github.com/orabazu/todo-app/blob/main/src/actions/TODO/index.tsx
  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        dispatch(setLoading(true));

        const response = await fetch("https://demo6684249.mockable.io/tariffs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const { maxDownloadSpeed, maxUploadSpeed } = calculateTariffs(
          data.tariffs
        );

        setTimeout(() => {
          dispatch(setTariffRedux(data.tariffs));
          dispatch(setLoading(false));
          dispatch(setCalculateTariffs({ maxDownloadSpeed, maxUploadSpeed }));
        }, 1000);
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
        <TariffBody />
      </div>
    </div>
  );
}

export default App;
