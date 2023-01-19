import sys
from util.Util import Util
from db.ConnectionManager import ConnectionManager
import pymssql
import random

sys.path.append("../util/*")
sys.path.append("../db/*")


class Student:
    def __init__(self, username, password=None, name=None, salt=None, hash=None):
        """
        Constructor for Student class

        Args:
            username: username of the student
            password: password of the student
            salt: salt of the student
            hash: hash of the student
        """
        self.username = username
        self.password = password
        self.name = name
        self.salt = salt
        self.hash = hash

    # getters
    def get(self):
        """
        Login as a student if password is correct

        Raises:
            pymssql.Error: Error while connecting to database

        return: Student object
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor(as_dict=True)

        get_caregiver_details = \
            "SELECT Salt, Hash FROM Students WHERE Username = %s"
        try:
            cursor.execute(get_caregiver_details, self.username)
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
        Get username of the student

        return: username of the student
        """
        return self.username

    def get_salt(self) -> str:
        """
        Get salt of the student

        return: salt of the student
        """
        return self.salt

    def get_hash(self) -> str:
        """
        Get hash of the student

        return: hash of the student
        """
        return self.hash

    def save_to_db(self):
        """
        Save student details to database

        Raises:
            pymssql.Error: Error occurred when saving student details
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        add_student = "INSERT INTO Students VALUES (%s, %s, %s, %s)"
        try:
            cursor.execute(add_student,
                           (self.username, self.name, self.salt, self.hash))
            conn.commit()
        except pymssql.Error:
            raise
        finally:
            cm.close_connection()

    def get_availability(self) -> dict:
        """
        Get availability of the student

        Raises:
            pymssql.Error: Error occurred when getting student availability

        return: (dict) current availabilities of each instructor
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        get_availability = "SELECT Username, Name, Time FROM Availabilities ORDER BY Username ASC"
        try:
            cursor.execute(get_availability)
            if cursor.rowcount == 0:
                return None
        except pymssql.Error:
            print("Error occurred when getting instructor availability")
            raise
        finally:
            cm.close_connection()

        # reformat availability by name
        availability = {}
        for row in cursor:
            name = row[1]
            time = row[2]
            if name not in availability:
                availability[name] = []
            availability[name].append(time)
        
        return availability

    def make_schedule(self, username_instr: str, name_instr: str, time: str) -> int:
        """Make a schedule for the student

        Args:
            username_instr: username of the instructor
            name_instr: name of the instructor
            time: time of the appointment

        Raises:
            pymssql.Error: Error occurred when remove availability
            pymssql.Error: Error occurred when insert schedule

        Returns:
            True if successfully reserved, False otherwise
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        # remove appointed availability
        remove_availability = "DELETE FROM Availabilities WHERE Username = %s AND Time = %s"
        try:
            cursor.execute(remove_availability, (username_instr, time))
            conn.commit()
        except pymssql.Error as e:
            print(e)
            return 1
        finally:
            cm.close_connection()

        # make the vaccination schedule
        conn = cm.create_connection()
        cursor = conn.cursor()

        id = random.randint(1000000, 9999999)
        add_schedule = "INSERT INTO Schedules VALUES (%d, %s, %s, %s)"
        try:
            cursor.execute(add_schedule, (id, name_instr, self.username, time))
            conn.commit()
        except pymssql.Error as e:
            print(e)
            return 2
        finally:
            cm.close_connection()

        return 0

    def get_schedules(self):
        """
        Get schedules of the student
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        get_schedules = "SELECT appointment_id, Iname, Time, FROM\
            Schedules WHERE Sname = %s ORDER BY Time ASC"
        try:
            cursor.execute(get_schedules, self.username)
        except pymssql.Error as e:
            print(e)
            return None
        finally:
            cm.close_connection()
        
        # reformat schedules by time
        schedules = []
        for row in cursor:
            schedules.append({"id": row[0], "name_instr": row[1], "time": row[2]})

        return schedules
