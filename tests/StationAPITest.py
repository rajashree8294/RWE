import unittest
from src.service import get_all_stations, get_station_by_id, get_matching_stations
from app import get_stations, get_station_id, get_match_stations
from nose.tools import assert_is_not_none
from unittest.mock import Mock, patch
import requests


class TestStationsAPI(unittest.TestCase):
    @patch('src.service.requests.get')
    def test_get_all_stations_api(self, mock_get):
        mock_get.return_value = {'name': 'station1'}
        response = get_stations()
        self.assertEqual('station1', response)


if __name__ == '__main__':
    unittest.main()

