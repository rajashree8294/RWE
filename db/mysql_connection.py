import mysql.connector
import os


dbEndpoint = os.environ.get('dbendpoint')
dbUsername = os.environ.get('dbusername')
dbPassword = os.environ.get('dbpassword')


def connect_mysql():
    conn = mysql.connector.connect(
        host=dbEndpoint, user=dbUsername, passwd=dbPassword
    )
    c = conn.cursor()
    c.execute("CREATE DATABASE if not exists rwe")
    conn1 = mysql.connector.connect(
        host=dbEndpoint, user=dbUsername, passwd=dbPassword, database="rwe"
    )
    conn1.cursor()
    return conn1


def setup_table():
    conn = connect_mysql()
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS station "
              "(id varchar(30) primary key, "
              "name varchar(30), "
              "minDate Date, "
              "maxDate Date, "
              "latitude double, "
              "longitude double, "
              "dataCoverage float, "
              "elevation float, "
              "elevationUnit varchar(10))")
    conn.commit()
    c.execute("CREATE TABLE IF NOT EXISTS criterion "
              "(id int primary key, "
              "minDate Date, "
              "maxDate Date, "
              "latitudeX1 double, "
              "longitudeY1 double, "
              "latitudeX2 double, "
              "longitudeY2 double, "
              "dataCoverage float, "
              "searchHash varchar(100))")
    conn.commit()


setup_table()
