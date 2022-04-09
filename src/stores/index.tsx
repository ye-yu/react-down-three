import React, { useContext } from "react";
import { AppState } from "./app-state.store";

const defaultStore = {
  appState: new AppState()
}

const StoreContext = React.createContext(defaultStore)

export function useStores() {
  const store = useContext(StoreContext)
  return store
}

export function ContextProvider(props: Omit<React.ComponentProps<typeof StoreContext["Provider"]>, "value">) {
  return <StoreContext.Provider {...props} value={defaultStore} />
}