import React, {Component} from 'react';
import {register} from './UserFunctions';

export const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Register extends Component{
    constructor(){
        super()
        this.state ={
            name:'',
            lastName:'',
            email: '',
            password: '',
            formValid:true,
            formErrors: {
            name:'',
            lastName:'',
            email: '',
            password: '',
            error:''
        }
    };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
          case "name":
            formErrors.name =
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "lastName":
            formErrors.lastName =
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          default:
            break;
        }
        
        this.setState({ formValid : true})
        
        if ((formErrors.email==="")&&(formErrors.password==="")&&(formErrors.name==="")&&(formErrors.password==="")){
            if ((this.state.name!=="")&&(this.state.lastName!=="")&&(this.state.email!=="")&&(this.state.password!=="")){
                this.setState({
                    formValid : emailRegex.test(this.state.email) ? false : true
                })
            }
        }
    
        this.setState({ formErrors, [name]: value });
    };

    onSubmit(e){
        e.preventDefault();
        let formErrors = { ...this.state.formErrors };

        const user =  {
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        register(user).then(res => {
            if (res.error){
                formErrors.error = res.error
                this.setState({ formErrors })
            }
            else {
                this.props.history.push('/login')
            }
        })
    }

    render (){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            {this.state.formErrors.error !== "" && ( <div className="errorMessage">
                            {this.state.formErrors.error}
                            </div>)}
                            <div className="form-group">
                                <label htmlFor="name">First Name</label>
                                <input type="String"
                                className="form-control"
                                name="name"
                                placeholder="Enter first name"
                                value={this.state.name}
                                onChange={this.onChange}></input>
                            </div>
                            {this.state.formErrors.name.length > 0 && (
                                   <div className="errorMessage">{this.state.formErrors.name}</div>
                                )}
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="String"
                                className="form-control"
                                name="lastName"
                                placeholder="Enter last name"
                                value={this.state.lastName}
                                onChange={this.onChange}></input>
                            </div>
                            {this.state.formErrors.lastName.length > 0 && (
                                   <div className="errorMessage">{this.state.formErrors.lastName}</div>
                                )}
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input 
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onChange}></input>
                            </div>
                            {this.state.formErrors.email.length > 0 && (
                                   <div className="errorMessage">{this.state.formErrors.email}</div>
                                )}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.onChange}></input>
                            </div>
                            {this.state.formErrors.password.length > 0 && (
                                   <div className="errorMessage">{this.state.formErrors.password}</div>
                                )}
                            <button type="submit" className="btn btn-lg btn-primary btn-block"
                            disabled={this.state.formValid}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;