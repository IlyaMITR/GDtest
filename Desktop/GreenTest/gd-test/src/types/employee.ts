export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const SELECT_EMPLOYEE = 'SELECT_EMPLOYEE';
export const SAVE_EMPLOYEES = 'SAVE_EMPLOYEES';
export const CHANGE_EMPLOYEE = 'CHANGE_EMPLOYEE';


export interface EmployeeAction {
	type: string;
	payload?: any;
}