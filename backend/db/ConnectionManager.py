import pymssql
import os

class ConnectionManager:
    """
    This class is used to create a connection to the database
    """

    def __init__(self):
        self.server_name = "lqhackathon" + ".database.windows.net"
        self.db_name = os.getenv("hospital_db")
        self.user = "lq25"
        self.password = "Ql110119!"
        self.conn = None

    def create_connection(self):
        """
        Create a connection to the database
        """
        try:
            self.conn = pymssql.connect(server=self.server_name,
                                        user=self.user,
                                        password=self.password,
                                        database=self.db_name)
        except pymssql.Error as db_err:
            print("Database Programming Error in SQL connection processing! ")
            print(db_err)
            quit()
        return self.conn

    def close_connection(self):
        """
        Close the connection to the database
        """
        try:
            self.conn.close()
        except pymssql.Error as db_err:
            print("Database Programming Error in SQL connection processing! ")
            print(db_err)
            quit()
