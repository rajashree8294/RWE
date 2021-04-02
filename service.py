import requests
import datetime as dt
from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from constants import BASE_URL, TOKEN

headers = {'token': TOKEN}


class Station(BaseModel):
    startDate: dt.date
    endDate: dt.date
    latitude: int
    longitude: int
    net: Optional[int] = None
    dataCoverage: Optional[int] = None
    limit: Optional[int] = None
    offset: Optional[int] = None


def get_all_stations():
    resp = requests.get(BASE_URL + "stations", headers=headers)
    print("Time: {0} / Used Cache: {1}".format(datetime.now(), resp.from_cache))
    return resp.json()


def get_station_by_id(station_id):
    resp = requests.get(BASE_URL + "stations/" + station_id,  headers=headers)
    print("Time: {0} / Used Cache: {1}".format(datetime.now(), resp.from_cache))
    return resp.json()
