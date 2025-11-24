create database dog CHARACTER set = 'utf8' COLLATE = 'utf8_hungarian_ci';

create table dog (id int AUTO_INCREMENT PRIMARY KEY,
                 name VARCHAR(100) not null,
                 breed VARCHAR(100) not null,
                 gender BOOLEAN default false,
                 age INT,
                 picurl VARCHAR(255));


delete from dog;
delete from users;


alter table dog AUTO_INCREMENT = 1;
alter table user AUTO_INCREMENT = 1;
INSERT INTO dog  VALUES
(NULL, 'Mendy', 'keverék', 0, 3, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/mendy20251.jpg'),
(NULL, 'Zsazsa', 'keverék', 0, 11, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/zsazsa20251.jpg'),
(NULL, 'Bobi', 'pekingi palotakutya', 1, 11, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/bobi20251.jpg'),
(NULL, 'Figura', 'mudi keverék', 1, 1, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/figura20251.jpg'),
(NULL, 'Harcos', 'németjuhász keverék', 1, 1, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/harcos20242.jpg'),
(NULL, 'Liza', 'rottweiler keverék', 0, 12, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/liza20251.jpg'),
(NULL, 'Csöpi', 'keverék', 1, 8, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/csopi20244.jpg'),
(NULL, 'Briós', 'keverék', 0, 7, 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/brios20245.jpg');

drop table users;
create table users (userId int AUTO_INCREMENT PRIMARY KEY,
name varchar(100) not null,
phone varchar(15) default null,
email varchar(100) not null UNIQUE,
password varchar(255) not null,
avatar varchar(255),
foreign key (avatar) REFERENCES files(fileId) on delete cascade
);

drop table files;
create table files (
    fileId varchar(255) not null PRIMARY key UNIQUE,
    fileName varchar(255) not null,
    uploadTime TIMESTAMP default CURRENT_TIMESTAMP(),
    fileSize integer not null
);

create table userFiles (
    userId integer not null,
    fileId varchar(255),
foreign key (fileId) REFERENCES files(fileId) on delete cascade,
foreign key (userId) REFERENCES users(userId) on delete cascade
);




create Trigger  insert_user BEFORE insert on users
for each row set new.password = pwd_encrypt(new.password); 

create Function pwd_encrypt(pwd Varchar(255))
RETURNS varchar(255) DETERMINISTIC
RETURN SHA2(Concat(pwd,'sozas'),256);

drop function pwd_encrypt;

create function login(email varchar(100), pwd varchar(100))
RETURNS integer DETERMINISTIC
BEGIN
DECLARE ok integer;
set ok = 0;
select id into ok from user where users.email = email and users.password = pwd_encrypt(pwd);
RETURN ok;
end;


select login('teszt1@gmail.com',"titok");
 
drop trigger insert_user;
ALTER table users AUTO_INCREMENT = 1;
insert into users values (null, "teszt1@gmail.com","titok"),
(null,"teszt2@gmail.com","jelszo");
delete from users;