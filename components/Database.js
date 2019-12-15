
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("Walancik_Michal_4id2.db");

class Database {

    static createTable() {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alarmy (id integer primary key not null, time text, days text);"
            );
        });
    }

    static add(time, days) {

        db.transaction(
            tx => {
                tx.executeSql(`INSERT INTO alarmy (time, days) values ('${time}', '${days}')`);
            }
        )
    }

    static updateDays(id, days) {

        db.transaction(
            tx => {
                tx.executeSql(`UPDATE alarmy SET days='${days}' WHERE id=${id}`);
            }
        )
    }

    static getAll() {
        var query = "SELECT * FROM alarmy";
        //
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                // console.log(JSON.stringify(results))
                resolve(results.rows._array);

            }, function (tx, error) {

                reject(error);

            });
        }))
    }

    static remove(id) {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM alarmy WHERE (id = ${id});`
            );
        });

    }

    static removeAll() {

        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM alarmy ;"
            );
        });
    }
}


export default Database;



