import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateExercises extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // state is how you create variables in react
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('https://quick-fix-service.herokuapp.com/users/')
           .then(response => {
               if (response.data.length > 0) {
                   this.setState({
                       users: response.data.map(user => user.username),
                       username: response.data[0].username
                   });
           }
       })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('https://quick-fix-service.herokuapp.com/exercises/add', exercise)
            .then(response => console.log(response.data));
        // take the person back to home page,
        // which is a list of exercises
        window.location = '/';
    }
    render() {
        return (<div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select ref="userInput" required
                        className="form-control dark"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map((user) => {
                                return <option key={user}
                                    value={user}>{user}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" required
                        className="form-control"
                        onChange={this.onChangeDescription}
                        value={this.state.description} />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={this.onChangeDuration}
                        value={this.state.duration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate} />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log"
                        className="btn btn-primary" />
                </div>
            </form>
        </div>);
    }
}

export default CreateExercises;