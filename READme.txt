CREATE database 'sys'
Run the db.sql script
configure your db in config.js


git clone the application to ur local
cd inside myapp till where package.json and package-lock.json are present & run 'npm install' cmd on node js cmd prompt.
once all modules are installed
run 'npm start' cmd.


visit 'http://localhost:3000/statics/static/ui/'   to view the operations corresponding api results can be verified through postman


POSTMAN API's

1.http://localhost:3000/api/skills/                   GET REQUEST                                              gets all the skills from data.

2.http://localhost:3000/api/skills/1/update/          PUT REQUEST  req body is {"name":"blockchain"}           edits the data of given id.

3.http://localhost:3000/api/skills/1/approve/	      PUT REQUEST  req body is {"status":"false"}                edits status of given id.

4.http://localhost:3000/api/skills/                   POST REQUEST req body is                                 adds new skill object.
    	                                              {"name":"new skill","status":"approve"}
