import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { NavBar } from "./Components/NavBar/NavBar";
import { FromImpLossCalculator } from "./Form/Calculator/FormImpLossCalculator";
import { FormFooter } from "./Form/Footer/FormFooter";
import { FormHome } from "./Form/Home/FormHome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormFeedBack } from "./Form/FeedBack/FormFeedBack";
import { FormAutoStakeCalculator } from "./Form/Calculator/FormAutoStakeCalculator";
import { JwtProvider } from "./Context/JwtContext";
import { Auth } from "./Context/Auth";
import { FormFarmLpSimulator } from "./Form/Portifolio/FarmLp/FormFarmLpSimulator";
import { FormListTokens } from "./Form/Portifolio/TokensCoins/FormListTokens";

const App = () => {

  return (
    <BrowserRouter>
      <div className="background">
        <JwtProvider>
          <NavBar />
          <div className="center">
            <Routes>
              <Route path="/" element={<FormHome />} />
              <Route
                path="/FeedBack"
                element={
                  <Auth isPublic={true}>
                    <FormFeedBack />
                  </Auth>} />
              <Route
                path="/ImpLossCalculator"
                element={
                  <Auth isPublic={true}>
                    <FromImpLossCalculator />
                  </Auth>
                } />
              <Route
                path="/AutoStakeCalculator"
                element={
                  <Auth isPublic={true}>
                    <FormAutoStakeCalculator />
                  </Auth>
                } />
              <Route
                path="/FarmLPSimulator"
                element={
                  <Auth>
                    <FormFarmLpSimulator />
                  </Auth>} />
              <Route
                path="/TokensCoins"
                element={
                  <Auth>
                    <FormListTokens />
                  </Auth>} />
            </Routes>
          </div>
        </JwtProvider>
      </div >
    </BrowserRouter >
  );
}

export default App;
//<FormFooter />