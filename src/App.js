import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import { NavBar } from "./Components/NavBar/NavBar";
import { FromImpLossCalculator } from "./Form/Calculator/FormImpLossCalculator";
import { FormFooter } from "./Form/Footer/FormFooter";
import { FormHome } from "./Form/Home/FormHome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormFeedBack } from "./Form/FeedBack/FormFeedBack";
import { FormAutoStakeCalculator } from "./Form/Calculator/FormAutoStakeCalculator";


function App() {
  return (
    <BrowserRouter>
      <div className="background">
        <NavBar />
        <Routes>
          <Route path="/" element={<FormHome />} />
          <Route path="/FeedBack" element={<FormFeedBack />} />
          <Route path="/ImpLossCalculator" element={<FromImpLossCalculator />} />
          <Route path="/AutoStakeCalculator" element={<FormAutoStakeCalculator />} />
        </Routes>
        <FormFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
