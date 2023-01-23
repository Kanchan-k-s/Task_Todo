CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

alter table todo add priority int;

create table users(
    user_id VARCHAR(25) primary key,
    user_name TEXT NOT NULL,
    user_password TEXT NOT NULL,
    user_type int
);

select * from users;

insert into users (user_id,user_name,user_password,user_type) values ('1','Admin','admin',1);

create table todo(
    todo_id SERIAL primary key,
    description VARCHAR(255),
    priority int,
    user_id VARCHAR(25)
);

SELECT todo_id,description,priority,(select user_name from users where user_id=t.user_id) FROM todo as t order by user_id;

insert into todo(description,priority,user_id)values('Reading a book', 1, 2);

select count(t.todo_id),u.user_name from todo as t right join users as u on u.user_id=t.user_id group by u.user_id order by count(t.todo_id);
select count(todo_id),(select user_name from users where user_id=todo.user_id ) as user_name,(select user_id from users where user_id=todo.user_id )as id from users,todo where users.user_id = todo.user_id group by todo.user_id;


create table delete_users(
    user_id VARCHAR(25) primary key,
    user_name TEXT NOT NULL,
    user_password TEXT NOT NULL,
    user_type int
);
insert into delete_users select * from users where user_id='1';