import { Component } from "react";
import { connect } from "react-redux";
import { IEmployee, setEmployee, selectEmployee, getEmployees } from "../../store/reducers/employeesReducer";
import './window.scss'

class Window extends Component<any> {
	
	model: IEmployee = {
		id: Date.now(),
		selected: false,
		name: '',
		post: '',
		birthDate: undefined,
		sex: undefined,
		isFired: false,
		// colleagues: undefined
	}

	unVisible = (e: any) => {
		e.preventDefault();
		this.props.visible()
	}

	handleSubmit = (e: any) => {
		if (this.model.name !== '' && this.model.post !== '') {
			e.preventDefault();
			this.props.setEmployee(this.model)
			this.props.selectEmployee(this.model.id, !this.model.selected)
			this.props.visible()
		}
	}

	updateData = (e: any) => {
		e.preventDefault();
		this.props.getEmployees()
		this.props.visible()
	}

	render() {
		return this.props.type === 'add' ? (
			<div className="modal-bg">
				<div className="window add">
					<div className="window__header">
						Добавить сотрудника
					</div>
					<div className="window__body add">
						<form onSubmit={this.handleSubmit}>
							<table>
								<tbody>
									<tr>
										<td><label htmlFor="name">ФИО:</label></td>
										<td><input type="text" id="name" name="name" onChange={e => this.model.name = e.target.value}/></td>
									</tr>
									<tr>
										<td><label htmlFor="post">Должность:</label></td>
										<td><input type="text" id="post" name="post" onChange={e => this.model.post = e.target.value}/></td>
									</tr>
									<tr>
										<td><label htmlFor="birth">Дата рождения:</label></td>
										<td><input type="date" id="birth" name="birth" onChange={e => this.model.birthDate = Date.parse(e.target.value)}/></td>
									</tr>
									<tr>
										<td><label htmlFor="sex">Пол:</label></td>
										<td>
											<input type="radio" id="sex" name="sexR" value={'муж'} onChange={e => this.model.sex = e.target.value} />муж
											<input type="radio" id="sex" name="sexR" value={'жен'} onChange={e => this.model.sex = e.target.value} />жен
										</td>
									</tr>
									<tr>
										<td><label htmlFor="fired">Статус:</label></td>
										<td><input type="checkbox" id="fired" name="fired" onChange={e => this.model.isFired = Boolean(e.target.checked)} />Уволен</td>
									</tr>
									{/* <tr>
										<td><label htmlFor="colleagues">Коллеги:</label></td>
										<td><input type="text" id="colleagues" name="colleagues" onChange={e => this.model.colleagues = undefined}/></td>
									</tr> */}
								</tbody>
								
							</table>
							
						</form>
					</div>
					<div className="window__footer">
						<button className="foot-button add" onClick={(e) => this.handleSubmit(e)}>Добавить</button>
						<button className="foot-button cancel" onClick={(e:any) => this.unVisible(e)}>Отмена</button>
					</div>
				</div>
			</div>
		)
			: this.props.type === 'warning' ?
			(
			<div className="modal-bg">
				<div className="window warning">
					<div className="window__header">
						<b>Предупреждение</b>
					</div>
					<div className="window__body warning">
						Несохранённые данные будут удалены
					</div>
					<div className="window__footer">
								<button className="foot-button add" onClick={(e) => this.updateData(e)}>Продолжить</button>
						<button className="foot-button cancel" onClick={(e: any) => this.unVisible(e)}>Отмена</button>
					</div>
				</div>
			</div>
		) : null
	}
}

export default connect(
	null,
	{ setEmployee, selectEmployee, getEmployees })(Window)