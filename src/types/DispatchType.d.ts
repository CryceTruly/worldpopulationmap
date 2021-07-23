type ActionType = import("./ActionType").default;

type DispatchType = (action: ActionType) => void;
export default DispatchType;
