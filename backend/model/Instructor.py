import sys
from util.Util import Util
from db.ConnectionManager import ConnectionManager
import pymssql
sys.path.append("../util/*")
sys.path.append("../db/*")


class Instructor:

    def __init__(self, username: str, password=None, name=None, salt=None, hash=None):
        """Constructor for Instructor class
        
        Args:
            username: username of the instructor
            password: password of the instructor
            salt: salt of the instructor
            hash: hash of the instructor
        """
        self.username = username
        self.password = password
        self.name = name
        self.salt = salt
        self.hash = hash

    # getters
    def get(self):
        """
        Get instructor details from database if password is correct

        return: Instructor object
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor(as_dict=True)

        get_instructor_details = \
            "SELECT Salt, Hash FROM Instructors WHERE Username = %s"
        try:
            cursor.execute(get_instructor_details, self.username)
            for row in cursor:
                curr_salt = row['Salt']
                curr_hash = row['Hash']
                calculated_hash = Util.generate_hash(self.password, curr_salt)
                if not curr_hash == calculated_hash:
                    cm.close_connection()
                    return None
                else:
                    self.salt = curr_salt
                    self.hash = calculated_hash
                    cm.close_connection()
                    return self
        except pymssql.Error as e:
            raise e
        finally:
            cm.close_connection()
        return self

    def get_username(self) -> str:
        """
        Get username of the instructor

        return: username of the instructor
        """
        return self.username

    def get_salt(self) -> str:
        """
        Get salt of the instructor

        return: salt of the instructor
        """
        return self.salt

    def get_hash(self) -> str:
        """
        Get hash of the instructor
        
        return: hash of the instructor
        """
        return self.hash

    def save_to_db(self):
        """
        Save instructor details to database
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        add_caregivers = "INSERT INTO Instructors VALUES (%s, %s, %s, %s)"
        try:
            cursor.execute(add_caregivers,
                           (self.username, self.name, self.salt, self.hash))
        except pymssql.Error:
            raise
        finally:
            cm.close_connection()

    def get_availability(self):
        """
        Get instructors all availability
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        get_availability = "SELECT Username FROM Availabilities WHERE Username = %s ORDER BY Time ASC"
        try:
            cursor.execute(get_availability, self.username)
            if cursor.rowcount == 0:
                print("No availablilities!")
                return
            for row in cursor:
                print(row[0])
        except pymssql.Error:
            print("Error occurred when getting caregiver availability")
            raise
        finally:
            cm.close_connection()
        return None

    def get_schedules(self):
        """
        Get instructor's all schedules
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        get_schedules = "SELECT Time FROM Schedules\
            WHERE Iname = %s ORDER BY Time ASC"
        try:
            cursor.execute(get_schedules, self.username)
        except pymssql.Error as e:
            print(e)
            return None
        finally:
            cm.close_connection()

        # refactor the cursor to a list of dictionaries
        schedules = []
        for row in cursor:
            schedules.append(row[0])
        
        return schedules
