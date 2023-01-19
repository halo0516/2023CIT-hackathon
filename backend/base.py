from flask import Flask, jsonify, request
from model.Instructor import Instructor
from model.Student import Student
import util.Scheduler as Scheduler

# global variables for current user
current_student = None
current_instructor = None

app = Flask(__name__)


@app.route("/")
def hello():
    return jsonify(message='Hello, World!')


@app.route("/account", methods=["POST"])
def register_student():
    """Register a student

    request body:
    {
        "username": "username",
        "password": "password"
    }

    return body:
    {
        "message": "message"
    }
    """
    # get the data from the request
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    # create a student
    student = Student(username, password)

    # register the student
    status_code = Scheduler.create_student(student)

    # check if the student was registered
    if status_code == 0:
        return jsonify(message="Student registered successfully"), 200
    elif status_code == 1:
        return jsonify(message="Student already exists"), 409
    elif status_code == 2:
        return jsonify(message="Please use strong password"), 500
    else:
        return jsonify(message="Student could not be registered"), 500


@app.route("/login_student", methods=["POST"])
def login_student():
    """Login a student

    request body:
    {
        "username": "username",
        "password": "password"
    }

    return body:
    {
        "message": "message"
    }
    """
    # get the data from the request
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    # get the student from the database
    global current_student
    student = Scheduler.login_student(username, password)

    # check if the student exists
    if student is None:
        return jsonify(message="Student does not exist"), 404
    else:
        current_student = student
        return jsonify(message="Student logged in successfully"), 200


@app.route("/login_instructor", methods=["POST"])
def login_instructor():
    """Login an instructor

    request body:
    {
        "username": "username",
        "password": "password"
    }

    return body:
    {
        "message": "message"
    }
    """
    # get the data from the request
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    # get the instructor from the database
    global current_instructor
    instructor = Scheduler.login_instructor(username, password)

    # check if the instructor exists
    if instructor is None:
        return jsonify(message="Instructor does not exist"), 404
    else:
        current_instructor = instructor
        return jsonify(message="Instructor logged in successfully"), 200


# TODO: router setting
@app.router("/<str:username>", methods=["GET"])
def get_availabilities_student():
    """Get the availabilities of office hours

    return body:
    {
        "message": "message",
        availabilities: {
            "Instructor": [
                time, ...
            ],
            ...
        }
    }
    """
    global current_student
    availabilities = current_student.get_availabilities()

    # check if the availabilities exist
    if availabilities is None:
        return jsonify(message="Availabilities do not exist"), 404
    else:
        return jsonify(message="Success", availabilities=availabilities), 200

def get_schedule_student():
    """Get the schedule of office hours

    return body:
    {
        schedules: {
            "Instructor": [
                time, ...
            ],
            ...
        }
    }
    """
    global current_student
    schedules = current_student.get_schedule()

    # check if the schedule exists
    if schedules is None:
        return jsonify(schedule=None), 404
    else:
        return jsonify(schedule=schedules), 200

# TODO: router setting
@app.route("/<str:username>", methods=["GET"])
def reserve():
    """Reserve an office hour

    request body:
    {
        "instr_username": "instructor_useranme",
        "instr_name": "instructor_name",
        "time": "time"
    }

    return body:
    {
        "message": "message"
    }
    """
    # get the data from the request
    data = request.get_json()
    instr_username= data["instr_username"]
    instr_name = data["instr_name"]
    time = data["time"]

    # check if the instructor exists
    if current_student is None:
        return jsonify(message="Error"), 404

    # reserve the office hour
    status_code = Scheduler.reserve(current_student, instr_username, instr_name, time)

    # check if the office hour was reserved
    if status_code == 0:
        return jsonify(message="Office hour reserved successfully"), 200
    elif status_code == 1:
        return jsonify(message="Office hour is not available"), 409
    else:
        return jsonify(message="Office hour could not be reserved"), 500

# TODO: router setting
@app.route("/<str:username>", methods=["GET"])
def show_schedule_instructor():
    """Show the schedule of office hours

    return body:
    [
        "time": "time",
        ...
    ]
    """
    global current_instructor
    schedules = current_instructor.get_schedules()

    # check if the schedule exists
    if schedules is None:
        return jsonify(schedule=None), 404
    else:
        return jsonify(schedule=schedules), 200


def show_schedule_student():
    """Show the schedule of office hours

    return body:
    [
        {
            "instructor": "instructor",
            "time": "time"
        },
        ...
    ]
    """
    global current_student
    schedules = current_student.get_schedules()

    # check if the schedule exists
    if schedules is None:
        return jsonify(schedule=None), 404
    else:
        return jsonify(schedule=schedules), 200


if __name__ == "__main__":
    app.run(port=3500)