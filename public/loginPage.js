"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = data => {
  ApiConnector.login(data, result => {result.success ? location.reload() : this.setLoginErrorMessage(result.data)})
}

userForm.registerFormCallback = data => {
  ApiConnector.register(data, result => {result.success ? location.reload() : this.setRegisterErrorMessage(result.data)})
}