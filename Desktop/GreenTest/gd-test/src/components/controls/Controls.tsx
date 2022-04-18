import { Component } from "react";
import { connect } from "react-redux";
import Window from "../window/Window";
import { IEmployee, getEmployees, deleteEmployee, saveEmployees } from "../../store/reducers/employeesReducer";
import './controls.scss'

class Controls extends Component<any> {

	state = {
		showWindowAdd: false,
		showWindowWarning: false
	}

	showWindowAdd = () => {
		this.setState({ showWindowAdd: !this.state.showWindowAdd });
		console.log(this.state)
	}

	showWindowWarning = () => {
		this.setState({ showWindowWarning: !this.state.showWindowWarning });
		console.log(this.state)
	}

	deleteEmployee = () => {
		if (this.props.employee.find((a: IEmployee) => a.selected === true)) {
			this.props.deleteEmployee(this.props.employee.find((a:IEmployee) => a.selected === true)?.id)
		}else console.log('nothing')	
	}

	render() {
		const withoutSelected = JSON.parse(JSON.stringify(this.props.employee));
		withoutSelected.forEach((element:IEmployee) => {
			element.selected = false
		});
		const isContentChanged = JSON.stringify(withoutSelected) === localStorage.employees ? true : false
		return (
			<div className="controls">
				<button onClick={() => this.showWindowAdd()}>Добавить</button>
				<button disabled={isContentChanged} onClick={() => this.showWindowWarning()}>Обновить</button>
				<button disabled={this.props.employee.find((a: IEmployee) => a.selected === true) ? false : true} onClick={() => this.deleteEmployee()}>Удалить</button>
				<button disabled={isContentChanged} onClick={this.props.saveEmployees}>Сохранить</button>
				{this.state.showWindowAdd ? <Window visible={ this.showWindowAdd } type='add'/> : null}
				{this.state.showWindowWarning ? <Window visible={this.showWindowWarning} type='warning'/> : null}
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
	{ getEmployees, deleteEmployee, saveEmployees })(Controls)
