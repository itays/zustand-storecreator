import { memo } from "react";
import { StoreProvider, useStoreContext } from "./store/Provider";

const BearCounter = memo(function BearCounter({
  initialCount,
  name,
}: {
  initialCount: number;
  name: string;
}) {
  return (
    <StoreProvider bears={initialCount} config={{ name }}>
      <BearCounterButton />
    </StoreProvider>
  );
});

function BearCounterButton() {
  const { bears, addBear } = useStoreContext((state) => ({
    bears: state.bears,
    addBear: state.addBear,
  }));
  return (
    <>
      <p>Bear count: {bears}</p>
      <button onClick={addBear}>Add Bear</button>
    </>
  );
}

export default BearCounter;
