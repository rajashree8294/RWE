# RWE - Station Data Fetcher

## Getting Started

This project was generated with following library versions
- [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.
- Python 2.7.17
- npm 7.8.0
- node v14.3.0

To install other dependencies,
- cd to the directory where requirements.txt is located 
- activate your virtualenv
- run: `pip install -r requirements.txt` in your shell

## Running Application Locally

#### Python server
- Make sure you are in RWE directory
- Start python server using `uvicorn app:app` command.
  You will see Application startup complete and
  Uvicorn is running on `8000` port by default
- Navigate to `http://127.0.0.1:8000`  hit the API

#### Development server
- `cd` to `frontend` directory
- Run `ng serve` for a dev server
- Navigate to `http://localhost:4200/`

        Note: Starting python server prior this step is must to access full-fledged functionality using User Interface

## Testing Application Locally
- Make sure you are in RWE directory
- Run `pytest` command
- Your will see the test cases statistics on the console

## Author
### Rajashree Joshi
