# set correct cwd
cd web

# create python venv if doesn't exist and activate
if [[ ! -e venv ]]; then
    python -m venv venv
fi
source venv/bin/activate

# ensure packages are installed
pip install -r requirements.txt
yarn install

# start nextjs
yarn dev