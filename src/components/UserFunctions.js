import axios from 'axios';

export const register = newUser => {
    console.log(newUser);
    return axios
        .post('http://localhost:4005/users/register',{
            name: newUser.name,
            lastName: newUser.lastName,
            email:newUser.email,
            password: newUser.password
        })
        .then(res =>{
            return res.data;
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

export const login = user => {
    return axios 
    .post('http://localhost:4005/users/login',{
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
        return err
    })
}
