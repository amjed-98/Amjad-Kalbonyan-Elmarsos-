import { createStore } from "redux";

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  // destructuring
  type: "INCREMENT",
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy,
});

const resetCount = () => ({
  type: "RESET",
});

const setCount = ({ count }) => ({
  type: "SET",
  count,
});

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy,
      };

    case "DECREMENT":
      return {
        count: state.count - action.decrementBy,
      };

    case "SET":
      return {
        count: action.count,
      };

    case "RESET":
      return {
        count: 0,
      };

    default:
      return state;
  }
};

const store = createStore(countReducer);

// subscribe function always returns a function that unSubscribe
const unSubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: -101 }));
