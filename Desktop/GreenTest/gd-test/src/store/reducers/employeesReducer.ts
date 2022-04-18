import { EmployeeAction, GET_EMPLOYEES, SET_EMPLOYEES, DELETE_EMPLOYEE, SELECT_EMPLOYEE, SAVE_EMPLOYEES, CHANGE_EMPLOYEE } from '../../types/employee'

type bool = boolean;
type IInitState = IEmployee[];

export interface IEmployee{
	id: number;
	selected: bool;
	name: string;
	post: string;
	birthDate?: number;
	sex?: string;
	isFired?: bool;
	// colleagues?: number[];
}

let initState: IInitState;

if (localStorage.employees) {
	initState = JSON.parse(localStorage.getItem('employees')!);
} else {
	localStorage.setItem('employees', '[]');
	initState = JSON.parse(localStorage.getItem('employees')!);
}


export const employeesReducer = (state = initState, action: EmployeeAction) => {
	switch (action.type) {
		
		case GET_EMPLOYEES: {
			const newState = JSON.parse(localStorage.employees)
			return newState
		}
			
		case SET_EMPLOYEES:
			return [...state, action.payload]
		
		case SELECT_EMPLOYEE: {
			const newState = [...state];
			if (newState.find(a => a.selected === true)) {
				newState.find(a => a.selected === true)!.selected = false
			}
			newState.find(a => a.id === action.payload.id)!.selected = action.payload.selected
			return newState
		}
			
		case DELETE_EMPLOYEE: {
			const newState = state.filter(a => a.id !== action.payload)
			return newState
		}
			
		case SAVE_EMPLOYEES: {
			const newState = [...state];
			if (newState.find(a => a.selected === true)) {
				newState.find(a => a.selected === true)!.selected = false
			}
			localStorage.employees = JSON.stringify([...newState])
			return state
		}
		case CHANGE_EMPLOYEE: {
			const newState = [...state];
			newState[newState.findIndex(a => a.selected === true)] = action.payload
			return newState
		}
			
		default:
			return state
	}
}

export const getEmployees = () => ({ type: GET_EMPLOYEES })
export const selectEmployee = (id: string, selected: bool) => ({ type: SELECT_EMPLOYEE, payload: {id, selected}})
export const setEmployee = (item: IEmployee) => ({ type: SET_EMPLOYEES, payload: item})
export const deleteEmployee = (id: any) => ({ type: DELETE_EMPLOYEE, payload: id})
export const saveEmployees = () => ({ type: SAVE_EMPLOYEES })
export const changeEmployee = (data: IEmployee) => ({ type: CHANGE_EMPLOYEE, payload: {...data} })