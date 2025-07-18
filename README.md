# Мессенджер

## Навигация  
- [Общая информация](#общая-информация)  
- [Подробнее о фронтэнде](#подробнее-о-фронтэнде)
- [Нереализованное](#нереализованное)  
- [Видео](#видео)  

## Общая информация

Первая серьёзная работа. Фронтэнд писал на NextJS, бэкэнд на NestJS, база данных - PostgreSQL. Вся логика приложения и на фронте и на бэке продумана мной. Такой стек выбран по совету, как естественное продолжение после изучения React и TypeScript.
<br/><br/>Упор был сделан именно на функционал и механики.
<br/></br>*Всё что хотел реализовать не успел, выгорел.*
<br/>*Об отсутствующих важных функциях напишу ниже.*

**Фронтэнд часть** - тут.  
**Бэкэнд часть** - [репозиторий](https://github.com/Lexan4uk/Messenger-backend-nest).

## Подробнее о фронтэнде

Вдохнолялся дизайном web версии Телеграма, получилось похоже.

Всё приложение, за исключением окна авторизации, написано в одном окне.

**Строение основы:** 
Авторизация -> получение токена, сохранение его в cookie, переход на главную страницу -> получение данных аккаунта по токену в cookie, сохранение его данных в глобальное состояние (атом).

По данным аккаунта отрисовываются миниатюры диалогов пользователя.

При выборе диалога его id передаётся в правое поле, в котором и отрисовывается чат.

При переключении миниатюры id диалога в правом поле заменяется на новое, там отрисовывается новый чат.

**Основные функции кратко:**
</br></br>Аккаунт
- У каждого аккаунта уникальный login, и после регистрации у вас в профиле будет только он. Вы можете перейти в окно настроек профиля и изменить логин, имя и аватар.
- Аватар выгружается на облако, в базу сохраняется ссылка на изображение.
- Если у аккаунта нет аватара, аватар генерируется в зависимости от первой буквы имени, если иени нет - по первой букве логина.
- Если у аккаунта не задано имя, вместо имени будет комбинация @+login.

Чат
- Есть 2 типа чата - групповой и приватный. Приватный чат нельзя удалить полностью, он только скроется для вас.
- Реализована механика приглашений в групповой чат по логину, механика выхода из него.
- Механика открытия DM работает аналогично приглашениям в групповой чат.
- Аккаунт может иметь только 1 активное приглашение в определённый чат.
- Сообщения подгружаются по 25 штук.
- В групповых чатах пользователь с ролью админа может назначать новых админов и исключать рядовых пользователей.
- Отправленные сообщения прогружаются моментально у всех участников чата с помощью Websocket.

## Нереализованное

**Сайт написан модульно и гибко. Добавление/изменение механик не ломает весь проект и требует работы только с конкретными элементами.**

- Нету механики создания и изменения новых групповых чатов.
- Нету механики изменения и удаления отправленных сообщений.
- Сообщения - только текстовые.
- Поиск чатов, приватный/публичный режим групповых чатов.
  
## Видео

Видео по основному функционалу:

[![Видео по функционалу](https://img.youtube.com/vi/Ow56gCmjgbI/0.jpg)](https://youtu.be/Ow56gCmjgbI)





