import {Component} from "react"
import EmployeeList from "./employee-list/EmployeeList";
import EmployeeCard from "./employee-card/EmployeeCard";
import './app.scss';
import Controls from "./controls/Controls";

export default class App extends Component{

	render() {
		return (
			<div className="app">
				<Controls />
				<EmployeeList />
				<EmployeeCard />
			</div>
		);
	}
}