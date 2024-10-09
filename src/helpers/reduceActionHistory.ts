interface ReducedAction {
  type: string;
  payload?: unknown;
}

const reduceActionHistory = (history: ReducedAction[]) => {
  return history.reduce((acc, cur) => {
    const newAction: ReducedAction = { type: cur.type };
    if (cur.payload) {
      newAction.payload = cur.payload;
    }
    return [...acc, newAction];
  }, [] as ReducedAction[]);
};

export default reduceActionHistory;