from model.Instructor import Instructor
from model.Student import Student
from util.Util import Util
from db.ConnectionManager import ConnectionManager
import pymssql
import datetime


'''
objects to keep track of the currently logged-in user
Note: it is always true that at most one of currentCaregiver and
        currentPatient is not null since only one user can be
        logged-in at a time
'''
current_student = None

current_instructor = None


def create_student(username: str, password: str) -> int: 
    """Create a student with the given username and password

    Args:
        username: username of the student
        password: password of the student

    Returns:
        0 if the student was created successfully
        1 if the username is already taken
        2 if the password is not strong enough
        3 if the student could not be created
    """
    username = username.lower()

    # check if the username has been taken already
    if username_exists(username):
        return 1

    # check if the password is strong enough
    if not check_strong_password(password):
        return 2

    salt = Util.generate_salt()
    hash = Util.generate_hash(password, salt)

    # create the patient
    student = Student(username, salt=salt, hash=hash)

    # save to patient information to our database
    try:
        student.save_to_db()
    except pymssql.Error as e:
        print("Failed to create user.")
        print("Db-Error:", e)
        quit()
    except Exception as e:
        print("Failed to create user.")
        print(e)
        return 3
    
    return 0


def username_exists(username, is_instructor=False):
    # return true if the username exists in the corresponding database;
    # otherwise false.
    username = username.lower()

    cm = ConnectionManager()
    conn = cm.create_connection()

    if is_instructor:
        select_username = "SELECT * FROM Instructors WHERE Username = %s"
    else:
        select_username = "SELECT * FROM Students WHERE Username = %s"

    try:
        cursor = conn.cursor(as_dict=True)
        cursor.execute(select_username, username)
        # returns false if the cursor is not before the first record or if
        # there are no rows in the ResultSet.
        for row in cursor:
            return row['Username'] is not None
    except pymssql.Error as e:
        print("Error occurred when checking username")
        print("Db-Error:", e)
        quit()
    except Exception as e:
        print("Error occurred when checking username")
        print("Error:", e)
    finally:
        cm.close_connection()
    return False


def check_strong_password(password: str) -> bool:
    # returns true if the password is strong enough; otherwise false.
    # check 1: if the password is at least 8 characters long
    if len(password) < 8:
        print("Password must be at least 8 characters long.")
        return False

    # check 2: if the password contains both uppercase and lowercase letters
    if not any(c.islower() for c in password):
        print("Password must contain at least one lowercase letter.")
        return False
    if not any(c.isupper() for c in password):
        print("Password must contain at least one uppercase letter.")
        return False

    # check 3: if the password contains both letters and numbers
    if not any(c.isdigit() for c in password):
        print("Password must contain at least one number.")
        return False
    if not any(c.isalpha() for c in password):
        print("Password must contain at least one letter.")
        return False

    # check 4: if the password contains at least one special character
    if not any(c in '!@#?' for c in password):
        print("Password must contain at least one special character,")
        print("such as !, @, #, or ?")
        return False

    return True


def login_student(useranme: str, password: str) -> Student:
    """Login a student with the given username and password.

    Args:
        username (str): the username of the student
        password (str): the password of the student

    Returns:
        Student: the student object if the login is successful; otherwise None
    """
    username = username.lower()

    student = None
    try:
        student = Student(username, password=password).get()
    except pymssql.Error as e:
        print("Login failed.")
        print("Db-Error:", e)
        quit()
    except Exception as e:
        print("Login failed.")
        print("Error:", e)
        return None

    return student
    

def login_instructor(username: str, password: str) -> Instructor:
    """Login a instructor with the given username and password.
    
    Args:
        username (str): the username of the instructor
        password (str): the password of the instructor

    Returns:
        Instructor: the instructor object if the login is successful; otherwise None
    """
    username = username.lower()

    instructor = None
    try:
        instructor = Instructor(username, password=password).get()
    except pymssql.Error as e:
        print("Login failed.")
        print("Db-Error:", e)
        quit()
    except Exception as e:
        print("Login failed.")
        print("Error:", e)
        return None

    return instructor


def search_instructor_schedule(tokens):
    # search_caregiver_schedule <date>
    # check 1: if someone's not logged-in, they need to log in first
    if current_instructor is None and current_student is None:
        print("Pleasee log in first.")
        return

    # check 2: the length for tokens need to be exactly 2 to include all
    # information (with the operation name)
    if len(tokens) != 2:
        print("Please try again!")
        return

    date = tokens[1].lower()
    # assume input is hyphenated in the format mm-dd-yyyy
    date_tokens = date.split("-")
    month = int(date_tokens[0])
    day = int(date_tokens[1])
    year = int(date_tokens[2])

    # check 3: the date must be valid
    try:
        d = datetime.date(year, month, day)
    except ValueError:
        print("Invalid date. Please try again!")
        return

    # obtain current user
    if current_student is not None:
        user = current_student
    else:
        user = current_instructor

    # obtain the caregivers that are available for the date
    print("Available caregivers:")
    try:
        user.get_availability(d)
    except pymssql.Error as e:
        print("Search caregiver availabilies failed.")
        print("Db-Error:", e)
        quit()
    except Exception as e:
        print("Error occurred when searching caregiver availabilities")
        print("Error:", e)
        return


def reserve(student: Student, instr_username: str, instr_name: str, time: str) -> int:
    """Reserve a time slot for the given student.
    
    Args:
        student (Student): the student object
        instr_username (str): the username of the instructor
        instr_name (str): the name of the instructor
        time (str): the time slot to reserve

    Returns:
        int: status code
    """
    return student.make_schedule(instr_username, instr_name, time)


def cancel(tokens):
    """
    TODO: Extra Credit
    """
    pass


def show_appointments(tokens):
    # check 1: if someone's not logged-in, they need to log in first
    if current_caregiver is None and current_patient is None:
        print("Pleasee log in first.")
        return

    if current_patient is not None:
        user = current_patient
    else:
        user = current_caregiver

    # show appointments
    try:
        user.get_schedules()
    except Exception as e:
        print("Error:", e)
        print("Please try again!")
        return


def logout(tokens):
    global current_patient, current_caregiver
    # check 1: if someone's not logged-in, they need to log in first
    if current_caregiver is None and current_patient is None:
        print("Pleasee log in first.")
        return

    # logout
    try:
        if current_patient is not None:
            current_patient = None
        if current_caregiver is not None:
            current_caregiver = None
    except Exception as e:
        print("Error:", e)
        print("Please try again!")
        return

    print("Successfully logged out!")
