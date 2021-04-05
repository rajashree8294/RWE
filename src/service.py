import requests
import datetime as dt
from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from constants import BASE_URL, TOKEN

headers = {'token': TOKEN}


class Criterion(BaseModel):
    startdate: dt.date
    enddate: dt.date
    latitude: float
    longitude: float
    net: Optional[float] = 2
    dataCoverage: Optional[int] = 0
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


def get_matching_stations(c: Criterion):
    params = {
        "startdate": c.startdate,
        "enddate": c.enddate,
        "extent": [c.latitude-c.net, c.longitude-c.net, c.latitude + c.net, c.longitude + c.net]
    }
    resp = requests.get(BASE_URL + "stations/", headers=headers, params=params)
    print("Time: {0} / Used Cache: {1}".format(datetime.now(), resp.from_cache))
    return resp.json()
