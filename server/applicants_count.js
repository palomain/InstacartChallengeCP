/**
 * Created by carhe on 2/16/2018.
 */
const sqlite = require('sqlite3');
const csv_stringify = require('csv-stringify');

const start_date = process.argv[2];
const end_date = process.argv[3];

const sql = 'SELECT count(id) as "count", date(created_at, "weekday 0", "-6 days") as week, workflow_state ' +
    "FROM applicants " +
    `where created_at between '${start_date}' and '${end_date}' ` +
    "group by week, workflow_state";

const db = new sqlite.Database(__dirname + '\\applicants.sqlite3', (error)=> {

        if(error) {
            process.stdout.write(error);
        } else {
            db.all(sql, (err, results)=>{
                process.stdout.write('count,week,workflow_state\n');
                csv_stringify(results, (err, output)=>{
                   process.stdout.write(output);
                });

                db.close();
            });
        }
    }
);





