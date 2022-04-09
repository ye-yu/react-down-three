import React, { useContext } from "react";
import { AppState } from "./app-state.store";
import { PreferenceState } from "./preference.store";

const defaultStore = {
  appState: new AppState(),
  preference: new PreferenceState(),
}

const StoreContext = React.createContext(defaultStore)

export function useStores() {
  const store = useContext(StoreContext)
  return store
}

export function ContextProvider(props: Omit<React.ComponentProps<typeof StoreContext["Provider"]>, "value">) {
  return <StoreContext.Provider {...props} value={defaultStore} />
}