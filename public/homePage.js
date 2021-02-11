"use strict"

//Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(result => {
    if (result.success) {
      location.reload();
    }
  });
}

//Получение информации о пользователе
ApiConnector.current(result => {
  if (result.success) {
    ProfileWidget.showProfile(result.data);
  }
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function loadCurrency() {
  ApiConnector.getStocks(result => {
    if (result.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(result.data);
    }
  });
}

loadCurrency();
setInterval(loadCurrency, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, result => {
    if (result.success) {
      ProfileWidget.showProfile(result.data);
    }
    moneyManager.setMessage(result.success, result.error ? result.error : 'Баланс пополнен');
  });
}

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, result => {
    if(result.success) {
      ProfileWidget.showProfile(result.data);
    }
    moneyManager.setMessage(result.success, result.error ? result.error : 'Конвертация выполнена');
  });
}

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, result => {
    if (result.success){
      ProfileWidget.showProfile(result.data);
    }
    moneyManager.setMessage(result.success, result.error ? result.error : 'Перевод отправлен');
  });
}

//Работа с избранным
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(result => {
  console.log(result);
  if (result.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(result.data);
      moneyManager.updateUsersList(result.data);
  }
});

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, result => {
      if (result.success) {
          favoritesWidget.clearTable();
          favoritesWidget.fillTable(result.data);
          moneyManager.updateUsersList(result.data);
      }
      favoritesWidget.setMessage(result.success, result.error ? result.error : 'Пользователь добавлен в избранное');
  });
}

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, result => {
      if (result.success) {
          favoritesWidget.clearTable();
          favoritesWidget.fillTable(result.data);
          moneyManager.updateUsersList(result.data);
      }
      favoritesWidget.setMessage(result.success, result.error ? result.error : 'Пользователь удален из избранного');
  });
}