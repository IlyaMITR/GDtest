import { combineReducers } from "redux";
import { employeesReducer } from "./employeesReducer";

export const rootReducer = combineReducers({
	employee: employeesReducer,
})
