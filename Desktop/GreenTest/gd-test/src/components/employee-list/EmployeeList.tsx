import { Component, EventHandler, MouseEvent, MouseEventHandler } from "react";
import EmployeeListItem from "./EmployeeListItem";
import { IEmployee, selectEmployee } from '../../store/reducers/employeesReducer'
import { connect } from "react-redux";
import './employee-list.scss';

class EmployeeList extends Component<{ employee: IEmployee[], selectEmployee: any }> {
	render() {
		return (
			<div className="employee-list">
				<div className="employee-list__body">
					{
						this.props.employee.map((a: IEmployee) =>
							<EmployeeListItem
								handleClick={this.props.selectEmployee}
								item={a}
								key={a.id}
							/>)
					}
				</div>
				
			</div>
		)
	}
}

const mapStateToProps = (state: any) => {
	return {
		employee: state.employee
	}
}

export default connect(
	mapStateToProps,
	{ selectEmployee })(EmployeeList)