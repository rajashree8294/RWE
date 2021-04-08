import requests
import datetime as dt
from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from constants import BASE_URL, TOKEN

headers = {'token': TOKEN}

'''
Type: Model
Description: Pydantic Model for Temperature Criterion
Usage: To hold user criterion to retrieve MIN and MAX Temperature for the station
'''
class TempCriterion(BaseModel):
    startdate: dt.date
    enddate: dt.date
    stationid: str
    limit: Optional[int] = 100

'''
Type: Function
Description: Fetch MIN and MAX Temperature for station for that year
Params: TempCriterion object
'''
def get_temp_data(t: TempCriterion):
    params = {
        "startdate": t.startdate,
        "enddate": t.enddate,
        "stationid": t.stationid,
        "units": "standard",
        "limit": t.limit,
        "datasetid": "GHCND",
        "datatypeid": ["TMAX", "TMIN"]
    }
    resp = requests.get(BASE_URL + "data/", headers=headers, params=params)
    print("Time: {0} / Used Cache: {1}".format(datetime.now(), resp.from_cache))
    return resp.json()
