# ColumbusList
ColumbusList is a website intended to allow students of Columbus University to broadcast items they want to sell and look for items they want to buy from other students of the university. This website only requires you have a Columus University email to sign up and use it. This restriction allows us to maintain accountability and exclusivity of this website.

FrontEnd - Node.js and Yarn required. To install all packages run yarn install in the client directory. If you would like to use the dummy API, make a process.env file with USE_DUMMY_API=true.

Setup environment
- Run setup.bat from dev-scripts folder
- Rerun last line of setup.bat to get requirements if is unsuccessful

Activate environment
- Cmd: Run script in env/Scripts called activate.bat
- Bash: Run source env/Scripts/activate

Make a new admin
- run `python manage.py createsuperuser --email admin@example.com --username admin`
- enter desired password

Run server
- run `python manage.py runserver`