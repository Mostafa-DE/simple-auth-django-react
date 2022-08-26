# Simple Auth App (Django & React)

### This app is created using Django as a Backend and React(Vite) as a Frontend.
&nbsp;
>**_NOTE:_** Please feel free to clone this project and contribute for more enhancement.


## Tools and tech
- Drf (Django Rest Framework), you can see the official document [Here](https://www.django-rest-framework.org/).
- Knox library, you can see the official document [Here](https://james1345.github.io/django-rest-knox/auth/).
- Vite, you can see the official document [Here](https://vitejs.dev/guide/).

## Overview 
### The idea of this app is to make Django handle all the cookies (Token) and all the authentication without the need to manage them on the frontend like
- Manually Set the cookie (Token) on the browser.
- Manually remove the cookie (Token) from the browser.
- Manually send the cookie (Token) to the server in each request.
  - e.g ``` fetch("https://example.com". { method: 'POST', 'Authorization': `Bearer ${token}` }) ```
### So now you don't need to handle anything on the frontend side, just send your request to the server including the credential and Django will automatically do the rest for you, please see this [Demo](https://demoauth-gamma.vercel.app/)

## Procedures
### For Django
- Clone this repo to whatever directory you wish.
- Create a new environment by following the steps below
  - Run ``` pyenv virtualenv <whatever name you wish> ``` .
  - Then run ``` pyenv activate <the name of the enviroment> ```
    - If you don't have pyenv, you can install it by following the steps [Here](https://github.com/pyenv/pyenv).
- Go to the project directory on your machine.
- Run ``` cd backend ```
- Run ``` pip install -r requirements.txt ``` to install all the requirements for the projects.
- Run ``` python manage.py createsuperuser ``` to create a super user for the admin page.
- Finally, run ``` python manage.py runserver ``` to start the server.

### For React(Vite)
- Go to the project directory on your machine.
- Run ``` cd frontend ```.
- Run ``` npm i  ``` .
- Finally, run ``` npm run dev ``` and you are good to go ; )

Made with ❤️ by [KnightSarai](https://github.com/knightSarai) & [Mostafa-DE](https://github.com/Mostafa-DE)
