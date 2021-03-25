create table node4_review_users (
    id serial primary key,
    username varchar(255),
    password varchar(255)
)

select * from node4_review_users
where username = $1;

insert into node4_review_users (username, password)
values ($1, $2)

select * from node4_review_users (username, password)
values ($1, $2)
returning * 