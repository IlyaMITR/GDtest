import { Component } from "react";
import { IEmployee, changeEmployee, selectEmployee } from "../../store/reducers/employeesReducer";
import './employee-card.scss'
import { connect } from "react-redux";

class EmployeeCard extends Component<{ employee: IEmployee, employeeList: IEmployee[], changeEmployee: any, selectEmployee: any }>{

	state = {
		editMode: false
	}

	model: any = {...this.props.employee}

	handleChange = ( e: any, attr: any, that?: any, value?:any) => {
		if (e.target.type === 'checkbox') {
			this.model[attr] = e.target.checked
		} else if (value) {
			this.model[attr] = value
		} else {
			this.model[attr] = e.target.value
		}
			
				
		that.forceUpdate()
		console.log(this.model)
	}

	changeEmployee = () => {
		if (this.model.name !== '' && this.model.post !== '') {
			this.props.changeEmployee(this.model);
			this.setState({editMode: false})
		}
	}

	render() {
		const person = { ...this.props.employee }
		const isEdit = this.state.editMode;
		if (isEdit) this.model = { ...this.props.employee }
		console.log(this.model)
		console.log(this.props.employee)
		return (
			<div className="employee-card" aria-activedescendant={person.selected ? 'true' : 'false'}>
				<div className="employee-card__items">
					<table>
						<tbody>
							{/* ФИО */}
							<tr className="employee-card__item">
								<td>ФИО:</td>
								<td>
									<CardItemInput
										key={`name:${Date.now()}`}
										model={this.model}
										attr='name'
										type={{
											node: isEdit ? 'input' : 'span',
											dataType: 'text'
										}}
										content={person?.name || ''}
										onChange={this.handleChange}
									/>
								</td>  
							</tr>
							{/* Должность */}
							<tr className="employee-card__item">
								<td>Должность:</td>
								<td>
									<CardItemInput
										key={`post:${Date.now()}`}
										model={this.model}
										attr='post'
										type={{
											node: isEdit ? 'input' : 'span',
											dataType: 'text'
										}}
										content={person?.post || ''}
										onChange={this.handleChange}
									/>
								</td>  
							</tr>
							{/* Дата рождения */}
							<tr className="employee-card__item">
								<td>Дата рождения:</td>
								<td>
									<CardItemInput
										key={`birth:${Date.now()}`}
										model={this.model}
										attr='birthDate'
										type={{
											node: isEdit ? 'input' : 'span',
											dataType: 'date'
										}}
										content={person?.birthDate ? new Date(person?.birthDate).toLocaleDateString() : ''}
										onChange={this.handleChange}
									/>
								</td>  
							</tr>
							{/* Пол */}
							<tr className="employee-card__item">
								<td>Пол:</td>
								<td>
									<CardItemRadio
										key={`sex2:${Date.now()}`}
										model={this.model}
										type={isEdit ? 'input' : 'span'}
										content={{
											male: isEdit ? 'муж' : '',
											female: isEdit ? 'жен' : ''
										}}
										storeVal={person.sex !== '' ? person.sex : ''}
										onChange={this.handleChange}
									/>
								</td>  
								
							</tr>
							{/* Статус */}
							<tr className="employee-card__item">
								<td>Статус: </td>
								<td>
									<CardItemCheckbox
										key={`fired:${Date.now()}`}
										model={this.model}
										type={isEdit ? 'input' : 'span'}
										content={person?.isFired || ''}
										onChange={this.handleChange}
									/>
								</td> 
							</tr>
							{/* Коллеги */}
							{/* <tr className="employee-card__item">
								<td>Коллеги:</td>
								<td>
									<CardItemSelect
										key={`colleagues:${Date.now()}`}
										model={this.model}
										employees={this.props.employeeList}
										type={isEdit ? 'select' : 'span'}
										attr='colleagues'
										content={person?.colleagues || ''}
										onChange={this.handleChange}
									/>
								</td>
							</tr> */}
						</tbody>
					</table>
					
				</div>

				<div className="employee-card__controls">
					<button className="editBtn" disabled={!person.selected} onClick={() => { this.setState({ editMode: !this.state.editMode });  this.forceUpdate()}}>{isEdit ? 'Отменить' : 'Редактировать'}</button>
					<button className="accept" style={{ visibility: isEdit ? 'visible' : 'hidden' }} onClick={() => this.changeEmployee()}>Изменить</button>
				</div>
				
			</div>
		)
	}
}

// SPAN | INPUT
class CardItemInput extends Component<any>{
	render() {
		if (this.props.type.node !== 'input') {
			this.props.model[this.props.attr] = this.props.content
		} 
		return this.props.type.node === 'input' ?
			<input
				type={this.props.type.dataType}
				defaultValue={this.props.content}
				onChange={(e) => this.props.onChange(e, this.props.attr, this)}
			/>
			:
			this.props.type.node === 'span' ?
				<span className="item-content">{this.props.content}</span>
				: null
	}
}

// SPAN | RADIO
class CardItemRadio extends Component<any>{
	render() {
		const compareContent = this.props.content.male === this.props.content.female ? ''
			: this.props.content.male === '' ? this.props.content.female : this.props.content.male;
		if (this.props.type !== 'input') {
			this.props.model['sex'] = this.props.storeVal === compareContent ? compareContent : '';
		}
		return this.props.type === 'input' ?
			<div className="item-content">
				<input
					type='radio'
					name='sexRadio'
					defaultValue={this.props.content.male}
					checked={this.props.content.male === this.props.model.sex}
					onChange={(e) => this.props.onChange(e, 'sex', this)}
				/>муж
				<input
					type='radio'
					name='sexRadio'
					defaultValue={this.props.content.female}
					checked={this.props.content.female === this.props.model.sex}
					onChange={(e) => this.props.onChange(e, 'sex', this)}
				/>жен
			</div>
			:
			this.props.type === 'span' ?
				<span className="item-content">{this.props.storeVal ? this.props.storeVal : compareContent}</span>
				: null
	}
}

// SPAN | CHECKBOX
class CardItemCheckbox extends Component<any>{
	render() {
		if (this.props.type !== 'input') {
			this.props.model['isFired'] = this.props.content
		}
		return this.props.type === 'input' ?
			<span className="item-content">
				<input
					type='checkbox'
					checked={this.props.model.isFired}
					onChange={(e) => {
						this.props.onChange(e, 'isFired', this)
					}}
				/>Уволен
			</span>
			:
			this.props.type === 'span' ?
				<span className="item-content">{this.props.content === false ? 'Работает' : this.props.content === true ? 'Уволен' : ''}</span>
				: null
	}
}

// SPAN | SELECT
// class CardItemSelect extends Component<any>{
// 	state = {
// 		show: false
// 	}
// 	render() {
// 		if (this.props.type !== 'select') {
// 			this.props.model['colleagues'] = this.props.content
// 		}
// 		const values: number[] = this.props.model.colleagues ? [...this.props.model.colleagues] : []
// 		return this.props.type === 'select' ?
// 			<span className="item-content" >
// 				<input type="text" onClick={(e:any) => this.setState({
// 					show: !this.state.show
// 				})} />
// 				{
// 					this.state.show ? 
// 					<div className="colleagues-list">
// 						{this.props.employees.map((a: IEmployee) => 
// 							<option
// 								key={a.id}
// 								aria-selected={false}
// 								onClick={(e: any) => {
// 									if (e.target.getAttribute('aria-selected') === 'false') {
// 										e.target.setAttribute('aria-selected', true)
// 										values.push(a.id)
// 									} else {
// 										e.target.setAttribute('aria-selected', false)
// 										values.filter(el => el !== a.id)
// 									}
// 									this.props.onChange(e, 'colleagues', this, values)
// 								}}
// 							>
// 								{a.name}
// 							</option>
// 						)}
// 					</div> : null
// 				}
// 			</span>
// 			:
// 			this.props.type === 'span' ?
// 				<span className="item-content">
// 					{
// 						this.props.content !== '' ? this.props.employees.reduce((arr: string[], el: IEmployee) => {
// 							arr.push(el.name)
// 							return arr;
// 						}, []).join(', ') : ''
// 					}
// 				</span>
// 				: null
// 	}
// }

const mapStateToProps = (state: any) => {
	return {
		employee: state.employee.find((a: IEmployee) => a.selected === true),
		employeeList: state.employee
	}
}

export default connect(mapStateToProps,
	{ changeEmployee, selectEmployee })(EmployeeCard)