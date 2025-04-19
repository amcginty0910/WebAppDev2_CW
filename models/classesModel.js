const e = require('express');
const nedb = require('gray-nedb');
class Classes {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    //a function to seed the database
    init() {
        this.db.insert({
            name: 'intermediate class',
            duration: '6 weeks',
            date: 'saturday afternoon',
            time: '3pm',
            description: 'an intermediate class that runs for six weeks starting on the 12th of April 2025 and will run for 6 weeks every Saturday afternoon at 3pm',
            location: 'Glasgow',
            price: '30 pounds',
            enrolled: ''
            
        });
        //for later debugging
        console.log('db entry 1 inserted');
        this.db.insert({
            name: 'begginer class',
            duration: '4 weeks',
            date: 'friday evening',
            time: '7pm',
            description: 'an intermediate class that runs for six weeks starting on the 11th of April 2025 and will run for 4 weeks every friday evening at 7pm',
            location: 'Glasgow',
            price: '15 pounds',
            enrolled: ''
            
        });
        //for later debugging
        console.log('db entry 2 inserted');

        this.db.insert({
            name: 'advanced class',
            duration: '8 weeks',
            date: 'saturday evening',
            time: '8pm',
            description: 'an intermediate class that runs for six weeks starting on the 12th of April 2025 and will run for 8 weeks every Saturday afternoon at 8pm',
            location: 'Glasgow',
            price: '70 pounds',
            enrolled: ''

            
        });
        
        //for later debugging
        console.log('db entry 3 inserted');
    }

    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    addEntry(name, duration, date, time, description, location, price) {
        var entry = {
            name: name,
            duration: duration,
            date: date,
            time: time,
            description: description,
            location: location,
            price: price,
            enrolled: ''

        }
        console.log('entry created', entry);
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error inserting document', name);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

}
module.exports = Classes;