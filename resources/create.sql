-- Create the database
-- Language: MSSQL
-- Author: Lang Qin
-- 2023-01-13
CREATE TABLE Admins (
    Username varchar(255),
    Salt BINARY(16),
    Hash BINARY(16),
    PRIMARY KEY (Username)
);

CREATE TABLE Doctors (
    Username varchar(255),
    Name varchar(255),
    Salt BINARY(16),
    Hash BINARY(16),
    PRIMARY KEY (Username)
);

CREATE TABLE Patients (
    Username varchar(255),
    Salt BINARY(16),
    Hash BINARY(16),
    PRIMARY KEY (Username)
);

CREATE TABLE Availabilities (
    Time datetime,
    Username varchar(255) REFERENCES Doctors,
    PRIMARY KEY (Time, Username)
);

CREATE TABLE Schedules (
    appointment_id int,
    Dname varchar(255) REFERENCES Doctors(Username),
    Pname varchar(255) REFERENCES Patients(Username),
    Time datetime,
    PRIMARY KEY (appointment_id, Dname, Pname, Time)
);
