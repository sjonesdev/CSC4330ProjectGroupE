@ECHO OFF
cd ..
python -m venv env
cd env/Scripts
activate.bat
cd ../..
pip install -r dev-scripts/requirements.txt