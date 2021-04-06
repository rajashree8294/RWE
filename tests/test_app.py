from fastapi.testclient import TestClient

from app import app

client = TestClient(app)


def test_hello_api():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_get_all_stations():
    response = client.get("/stations/all")
    assert response.status_code == 200


def test_get_station_by_id_api():
    response = client.get("/stations/" + "GHCND%3AUSW00063828")
    assert response.status_code == 200


def test_get_matching_station_api():
    response = client.post(
        "/stations",
        json={"longitude": -122.2047, "latitude": 47.5204, "startdate": "2020-12-02", "enddate": "2020-12-02"}
    )
    assert response.status_code == 200


def test_missing_longitude_params_case():
    response = client.post(
        "/stations",
        json={"latitude": 47.5204, "startdate": "2020-12-02", "enddate": "2020-12-02"}
    )
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": [
                    "body",
                    "longitude"
                ],
                "msg": "field required",
                "type": "value_error.missing"
            }
        ]
    }
