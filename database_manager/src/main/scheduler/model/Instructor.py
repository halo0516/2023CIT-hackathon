import sys
from util.Util import Util
from db.ConnectionManager import ConnectionManager
import pymssql
sys.path.append("../util/*")
sys.path.append("../db/*")


class Instructor:

    def __init__(self, username: str, password=None, salt=None, hash=None):
        """Constructor for Instructor class
        
        Args:
            username: username of the instructor
            password: password of the instructor
            salt: salt of the instructor
            hash: hash of the instructor
        """
        self.username = username
        self.password = password
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
                    print("Incorrect password")
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
        return None

    def get_username(self):
        """
        Get username of the instructor

        return: username of the instructor
        """
        return self.username

    def get_salt(self):
        """
        Get salt of the instructor

        return: salt of the instructor
        """
        return self.salt

    def get_hash(self):
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

        add_caregivers = "INSERT INTO Instructors VALUES (%s, %s, %s)"
        try:
            cursor.execute(add_caregivers,
                           (self.username, self.salt, self.hash))
        except pymssql.Error:
            raise
        finally:
            cm.close_connection()

   
    def upload_availability(self, d: str):
        """
        Insert availability with parameter date d

        Args:
            d: date of availability
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        # check if the caregiver is already available on the date
        # if not, update the availability
        add_availability = "INSERT INTO Availabilities VALUES (%s , %s)"
        get_availability = "SELECT * FROM Availabilities WHERE Time = %s AND Username = %s"
        try:
            cursor.execute(get_availability, (d, self.username))
            if cursor.rowcount == 0:
                add_availability = "INSERT INTO InstrAvailabilities VALUES (%s, %s)"
                cursor.execute(add_availability, (d, self.username))
                conn.commit()
            else:
                print("Caregiver is already available on the date")
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

        get_availability = "SELECT Username FROM InstrAvailabilities WHERE Username = %s ORDER BY Date ASC"
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

        get_schedules = "SELECT appointment_id, Time, Sname FROM Schedules\
            WHERE Iname = %s ORDER BY Time ASC"
        try:
            cursor.execute(get_schedules, self.username)
            print('%-20s' % "Appointment ID", '%-20s' % "Time", '%-20s' % "Student")
            if cursor.rowcount == 0:
                print("No schedules.")
            else:
                for row in cursor:
                    print('%-20d' % row[0], '%-20s' % row[1], '%-20s' % row[2], '%-20s' % row[3])
        except pymssql.Error:
            print("Error occurred when getting schedules")
            raise
        finally:
            cm.close_connection()
        return None
