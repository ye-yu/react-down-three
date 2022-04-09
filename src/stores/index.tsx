import React, { PropsWithChildren, ReactNode, ReactPropTypes } from "react";
import { AppState } from "./app-state.store";

const defaultStore = {
  appState: new AppState()
}

const StoreContext = React.createContext(defaultStore)

export function useStores() {
  
}

export function ContextProvider(props: Omit<React.ComponentProps<typeof StoreContext["Provider"]>, "value">) {
  return <StoreContext.Provider {...props} value={defaultStore} />
}