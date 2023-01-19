import sys
from util.Util import Util
from db.ConnectionManager import ConnectionManager
from scheduler.model.Instructor import Instructor
import pymssql
import random

sys.path.append("../util/*")
sys.path.append("../db/*")


class Student:
    def __init__(self, username, password=None, salt=None, hash=None):
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
        self.salt = salt
        self.hash = hash

    # getters
    def get(self):
        """
        Login as a student if password is correct
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
        Get username of the student

        return: username of the student
        """
        return self.username

    def get_salt(self):
        """
        Get salt of the student

        return: salt of the student
        """
        return self.salt

    def get_hash(self):
        """
        Get hash of the student

        return: hash of the student
        """
        return self.hash

    def save_to_db(self):
        """
        Save student details to database
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        add_student = "INSERT INTO Students VALUES (%s, %s, %s)"
        try:
            cursor.execute(add_student,
                           (self.username, self.salt, self.hash))
            conn.commit()
        except pymssql.Error:
            raise
        finally:
            cm.close_connection()

    def get_availability(self):
        """
        Get availability of the student
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        get_availability = "SELECT Username, Name, Time FROM Availabilities ORDER BY Username ASC"
        try:
            cursor.execute(get_availability)
            if cursor.rowcount == 0:
                print("No instructor is available!")
            for row in cursor:
                print(row[0])
        except pymssql.Error:
            print("Error occurred when getting instructor availability")
            raise
        finally:
            cm.close_connection()
        return None

    def make_schedule(self, username_instr: str, name_instr: str, time: str):
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        # remove appointed availability
        remove_availability = "DELETE FROM Availabilities WHERE Username = %s AND Time = %s"
        try:
            cursor.execute(remove_availability, (username_instr, time))
            conn.commit()
        except pymssql.Error:
            print("Error occurred when remove availability")
            raise
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
        except pymssql.Error:
            print("Error occurred when insert schedule")
            raise
        finally:
            cm.close_connection()

        print("Appointment ID:", id, "Instructor username:", name_instr, "Time:", time)
        print("Reserved successfully.")

    def get_schedules(self):
        """
        Get schedules of the student
        """
        cm = ConnectionManager()
        conn = cm.create_connection()
        cursor = conn.cursor()

        get_schedules = "SELECT appointment_id, Iname, Time, FROM\
            Schedules WHERE Sname = %s ORDER BY appointment_id ASC"
        try:
            cursor.execute(get_schedules, self.username)
            print('%-20s' % "Appointment_ID", '%-20s' % "Instructor", '%-20s' % "Time")
            if cursor.rowcount == 0:
                print("No schedules!")
            else:
                for row in cursor:
                    print('%-20s' % row[0], '%-20s' % row[1], '%-20s' % row[2])
        except pymssql.Error:
            print("Error occurred when getting schedules")
            raise
        finally:
            cm.close_connection()
        return None
