import { createStore as createZustandStore } from "zustand";
import { createContext } from "react";
import { devtools, DevtoolsOptions } from "zustand/middleware";

/**
 * This is an example of how to create a store with props passed in to a component
 * based in the docs 'Initialize state with props' from zustand https://zustand.docs.pmnd.rs/guides/initialize-state-with-props
 */

// 1 - define the state which can also be props passed in to a component
export type StateProps = {
  bears: number;
};

// 2 - define the state and actions
export type State = StateProps & {
  addBear: () => void;
};

// 3 - create store function that gets the props and returns a zustand store, notice the initProps is that same as the StateProps from above
export const createStore = (
  initProps?: Partial<StateProps>,
  devToolsOptions?: DevtoolsOptions
) => {
  const defaultProps: StateProps = {
    bears: 0,
  };
  // 4 - create the store, notice the type is State
  return createZustandStore<State>()(
    devtools(
      (set) => ({
        ...defaultProps,
        ...initProps,
        addBear: () =>
          set((state) => ({ bears: ++state.bears }), false, {
            type: `@${
              devToolsOptions?.name ? devToolsOptions.name : "anonymous"
            } addBear`,
          }),
      }),
      {
        ...devToolsOptions,
      }
    )
  );
};
// 5 - create the store type
export type Store = ReturnType<typeof createStore>;

// 6 - create the context
export const StoreContext = createContext<Store | null>(null);

// continue in store/Provider.tsx
