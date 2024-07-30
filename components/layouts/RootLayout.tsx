"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { ReactElement } from "react";

import { store } from "../../store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { ClientRootProps } from "@/types/boiler";
import { Navbar } from "@/components/Navbar";

const persistor = persistStore(store);

// import ErrorBoundary from '@/components/ErrorBoundary'
export const ClientRoot: React.FC<ClientRootProps> = ({
  children,
}): ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        {children}
      </PersistGate>
    </Provider>
  );
};
