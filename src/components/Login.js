import React, {Component} from 'react';
import {login} from './UserFunctions';

export const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Login extends Component{
    constructor(){
        super()
        this.state ={
            email: '',
            password: '',
            formValid:true,
            formErrors: {
            email: '',
            password: '',
            error:''
          }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        let formErrors = { ...this.state.formErrors };

        const user =  {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res.error){
                formErrors.error = res.error
                this.setState({ formErrors })
            }
            else {
                this.props.history.push('/')
            }
        })

        .catch(err => {
                console.log(err)
                return err
            });
        
        
    }

    onChange = e => {
     e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
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
        
        if ((formErrors.email==="")&&(formErrors.password==="")){
            if ((this.state.email!=="")&&(this.state.password!=="")){
                this.setState({
                    formValid : emailRegex.test(this.state.email) ? false : true
                })
            }
        }
    
        this.setState({ formErrors, [name]: value });
      };

      

    render (){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit} >
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            {this.state.formErrors.error !== "" && ( <div className="errorMessage">
                            {this.state.formErrors.error}
                            </div>)}
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                name="email"
                                className= "form-control"
                                placeholder="Enter email"
                                value={this.state.email}
                                noValidate
                                onChange={this.onChange}/>
                            </div>
                            {this.state.formErrors.email.length > 0 && (
                                   <div className="errorMessage">{this.state.formErrors.email}</div>
                                )}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                name="password"
                                className= "form-control"
                                placeholder="Enter password"
                                value={this.state.password}
                                noValidate
                                onChange={this.onChange}/>
                            </div>
                            {this.state.formErrors.password.length > 0 && (
                                 <div className="errorMessage">{this.state.formErrors.password}</div>
                                )}
                            <button type="submit" className="btn btn-lg btn-primary btn-block"
                            disabled={this.state.formValid}>
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;