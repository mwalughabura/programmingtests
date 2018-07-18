import psycopg2
from pprint import pprint

class DatabaseConnection:

    def __init__(self):
        try:
            self.connection = psycopg2.connect(
                "dbname='iconia' user='postgres' host='localhost' password='pass' port='5432'")
            self.connection.autocommit = True
            self.cursor = self.connection.cursor()
        except:
            pprint("Cannot connect to database")

    def create_table(self):
        create_table_command = "CREATE TABLE users(id serial PRIMARY KEY, name varchar(100), email varchar(160), password varchar(150))"
        self.cursor.execute(create_table_command)

if __name__ == '__main__':
    databaseconnection = DatabaseConnection()
    databaseconnection.create_table()
