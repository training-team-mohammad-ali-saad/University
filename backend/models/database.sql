create Table roles(
  id serial primary key,
  role varchar(255)
);
insert into roles (role) values ('user');
insert into roles (role) values ('admin');
-- select * from roles

create Table users (
  id serial primary key,
  firstName varchar(255) ,
  lastName varchar(255) ,
  phoneNumber int unique,
  email varchar(255) unique,
  password varchar(255),
  image text,
  role_id int,
  is_deleted int default 0,
FOREIGN KEY (role_id) REFERENCES roles(id)
);
insert into users (firstName,lastName, phoneNumber, email, password, image,role_id,is_deleted) values ('Mohammed', 'Alawneh',0786482809,'mohammadwalid.alawneh@gmail.com', '123123123','https://media.licdn.com/dms/image/D4E03AQFpHiilNkKJCQ/profile-displayphoto-shrink_800_800/0/1685600740488?e=2147483647&v=beta&t=ivaKyAoj0Kj7kBQ1L2FawGQsvMODdNxMY55ZFjCrvzQ',2,0);

insert into users (firstName,lastName, phoneNumber, email, password, image,role_id,is_deleted) values ('Saad', 'Habashneh',0798962849,'saad.k.habashneh@gmail.com', '123123123','https://media.licdn.com/dms/image/C4E03AQFLgKERGNLKUg/profile-displayphoto-shrink_800_800/0/1660384482711?e=2147483647&v=beta&t=vEs4lu9mhOeyQqyKQhp2E87KXYnlu91yoFBWSvgkdJ4',1,0);

create Table stadiums (
  id serial primary key,
  name varchar(255),
  price int,
  description text,
  image text,
  country text,
  city text,
  location text,
  user_id int,
  foreign key (user_id) references users(id)
);

insert into stadiums (name, price, description, image, country, city, location, user_id) values ('Alwehdat',25,'mal3ab be5ze','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkuG2WzStGdBfAAUbD8_OgpTweQFDs3jTfUcIijZXrT7xnZ6YbE8cfmKDg-7jJ6H1JAyo&usqp=CAU','Jordan', 'Amman','Wehdat',1);

insert into stadiums (name, price, description, image, country, city, location, user_id) values ('Alfaisaly',35, 'mal3ab be5ze akthar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Camille_Chamoun_Sports_City_Stadium_2018_-_Beirut_derby_%28Nejmeh_fans%29.png/220px-Camille_Chamoun_Sports_City_Stadium_2018_-_Beirut_derby_%28Nejmeh_fans%29.png','Jordan', 'Amman', 'Faisaly',2);

create Table orders(
  id serial primary key,
  user_id int,
  stadium_id int,
  foreign key (user_id) references users(id),
  foreign key (stadium_id) references stadiums(id)
)
insert into orders (user_id,stadium_id) values (1,1);
insert into orders (user_id,stadium_id) values (2,2);



-- select * from orders inner join users on orders.user_id = users.id 
--  inner join stadiums on orders.stadium_id = stadiums.id 
