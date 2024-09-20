import { PropsWithChildren, useRef, useContext } from "react";
import { createStore, StateProps, Store, State, StoreContext } from "./store";
import { useStore } from "zustand";
import { DevtoolsOptions } from "zustand/middleware";

type StoreProviderProps = PropsWithChildren<
  StateProps & { config?: DevtoolsOptions }
>;
// 7 provider component gets the props that sets the initial state and passes it to the store
export function StoreProvider({
  children,
  config,
  ...props
}: StoreProviderProps) {
  const storeRef = useRef<Store>();
  if (!storeRef.current) {
    storeRef.current = createStore(props, config);
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext<T>(selector: (state: State) => T): T {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("Missing StoreContext.Provider in the tree");
  }
  return useStore(store, selector);
}
