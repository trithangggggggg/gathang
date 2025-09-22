import { createStore } from "redux";
import { rootReducer } from "./reducer/rootRecuder";


export const store = createStore(rootReducer);  