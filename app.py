from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.service import get_all_stations, get_station_by_id, get_matching_stations, Criterion
import requests_cache
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

requests_cache.install_cache('station_cache', backend='sqlite', expire_after=180)


@app.get("/")
async def home():
    return {"message": "Hello World"}


@app.get("/stations/all")
async def get_stations():
    return get_all_stations()


@app.get("/stations/{station_id}")
async def get_station_id(station_id):
    return get_station_by_id(station_id)


@app.post("/stations")
async def get_match_stations(criterion: Criterion):
    return get_matching_stations(criterion)

if __name__ == '__main__':
    app.run(debug=True)
