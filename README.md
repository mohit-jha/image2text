# Assignment Readme
## Step 1: Clone the Repository


`git clone https://github.com/mohit-jha/image2text.git`

## Step 2: Install Dependencies for Client


`cd client`


`npm install`

## Step 3: Start the Client server


`npm start`

## Step 4: Set Up Django Environment


`cd server`

python3 -m venv env
## Step 5: Activate the Environment
For Mac/Linux:

`source env/bin/activate`
or 

For Windows:

`.\env\Scripts\activate`

## Step 6: Install tesseract in machine  

on mac
### `brew install tesseract`

On Linux
### `sudo apt update`
### `sudo apt install tesseract-ocr`
### `sudo apt install libtesseract-dev`

## Step 7: Install dependencies and Run Django Migrations

#### `cd management`

#### `pip install -r requirements.txt`

#### `python3 manage.py makemigration`
#### `python3 manage.py migrate`

## Step 7: Start Django server 
#### `python3 manage.py runserver`

## Step 8: Open Browser
Navigate to http://localhost:3000/

### Login Credentials
`Username: mohit`

`Password: mohit`

Now you should be able to access the application and explore its features.


## You can see the demo of app here in video. Click on below link-:
https://drive.google.com/file/d/1aINJ-NRI-i8sAzUNDI8USjge0CYbShZD/view?usp=sharing
