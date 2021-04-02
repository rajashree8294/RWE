from fastapi import FastAPI
from service import get_all_stations, get_station_by_id
import requests_cache
app = FastAPI()

requests_cache.install_cache('station_cache', backend='sqlite', expire_after=180)


@app.get("/")
async def home():
    return {"message": "Hello World"}


@app.get("/stations")
async def get_stations():
    return get_all_stations()


@app.get("/stations/{station_id}")
async def get_station_id(station_id):
    return get_station_by_id(station_id)


if __name__ == '__main__':
    app.run(debug=True)
