Project Name: Data Warehouse

v1.0.0

Description: This the 4th project of Acamica DWFS degree and it is about a contact management application


How do you run this proyect?

1- Clone the repository locally in your computer
2- After that please open the project folder in your favorite IDE for me is VSC
3- Open a terminal window and redirect the path of the commmand line to the project folder, because we want next commands to by apply there.
4- Run the npm install command - This automatically will install all the dependencies the project needs. Keep this command line open!
5- This project was made with mysql database so before continuing please install mysql the easiest way is installing XAMPP
6- Go to IDE and modify the file keys with your own credential and host that you choose in mysql installation process. To find this file follow this path inside the project src/keys.js 

Example
        module.exports = {
            database: {
                host: 'localhost',
                user: 'username',
                password: '12345',
                database: 'data_warehouse'
            }
        }
Save when your finish the modifications.
7- Open another (a new one) terminal window I would prefer in the IDE environment but you can choose whatever you want, and run the following command: mysql -u [username] -p
    After that you will be asked for your password and you must provide it. Once you finish this process you mysql shell will be runing and you could execute sql commands. Keep this command line open!

Note: after -u provide your user db name

8- Now go to the db.sql file copy all its contents (ctrl + A then ctrl + C). To find this file follow this path inside the project database/db.sql. Now return to the command line that remained open from last step and just paste the contents (ctrl + V)

Note: For the moment you have configurated the needed database and also installed all the needed dependencies. 

9- You are close to ending, do you remember the command line you keep open in step 4? please go there and execute the following command: npm run dev 

The project is now running!!

Also take a look to the shared POSTMAN collection.

There is two known users you can use to test the API 

The following user already exist in Database you can use them to test:

Admin user: 
{
    "email": "romanomatias99@gmail.com",
    "password": "Reptyl.13"
}

Note: Admin Admin user is the main ADMIN. For being an ADMIN is able to create new User of the sistem, they can see the tab Users as an option.

Basic user: 
{
    "email": "agus@gmail.com",
    "password": "agus"
}

Note: Basic user, means don´t have admin permission. Cannot see other user and cannot create new users

Also if you make a SELECT * FROM regions you will get all the region that by default are loaded in regions table
Also if you make a SELECT * FROM countries you will get all the countries that by default are loaded in countries table
Also if you make a SELECT * FROM cities you will get all the cities that by default are loaded in cities table
Also if you make a SELECT * FROM contacts you will get all the contacts that by default are loaded in contacts table
Also if you make a SELECT * FROM users you will get all the users that by default are loaded in users table