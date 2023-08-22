import React from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import {PersistGate} from "redux-persist/integration/react"
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from './utils/stripe/stripe.utils';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

serviceWorkerRegistration.register();