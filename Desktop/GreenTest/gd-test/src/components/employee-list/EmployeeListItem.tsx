import { Component } from "react";
import { IEmployee } from "../../store/reducers/employeesReducer";

export default class EmployeeListItem extends Component<{ handleClick: any, item: IEmployee }> { 

	changeActive = () => {
		this.props.handleClick(this.props.item.id, !this.props.item.selected)
	}

	render() {
		const item = this.props.item;
		return (
			<div className="employee-list__item" aria-selected={item.selected} onClick={() => this.changeActive()}>
				{item.name}
			</div>
		)
	}
}
