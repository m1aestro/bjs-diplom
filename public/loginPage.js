"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
  ApiConnector.login(data, result => {result.success ? location.reload() : this.setLoginErrorMessage(result.error)})
};

userForm.registerFormCallback = function(data) {
  ApiConnector.register(data, result => {result.success ? location.reload() : this.setRegisterErrorMessage(result.error)})
};