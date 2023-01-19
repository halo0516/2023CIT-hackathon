-- Create the database
-- Language: MSSQL
-- Author: Lang Qin
-- 2023-01-13

CREATE TABLE Instructors (
    Username varchar(255),
    Name varchar(255),
    Salt BINARY(16),
    Hash BINARY(16),
    PRIMARY KEY (Username)
);

CREATE TABLE Students (
    Username varchar(255),
    Name varchar(255),
    Salt BINARY(16),
    Hash BINARY(16),
    PRIMARY KEY (Username)
);

CREATE TABLE Availabilities (
    Time datetime,
    Username varchar(255) REFERENCES Instructors(Username),
    Name varchar(255),
    PRIMARY KEY (Time, Username)
);

CREATE TABLE Schedules (
    appointment_id int,
    Iuname varchar(255) REFERENCES Instructors(Username),
    Suname varchar(255) REFERENCES Students(Username),
    Iname varchar(255),
    Sname varchar(255),
    Time datetime,
    PRIMARY KEY (appointment_id, Iname, Sname, Time)
);
