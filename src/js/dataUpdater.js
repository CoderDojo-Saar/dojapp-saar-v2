import {request} from 'graphql-request'

function isOnline() {
    return navigator.connection.type !== Connection.NONE;
}

const DataUpdater = {
    updateDates: function () {
        return new Promise(function (resolve, reject) {
            console.log("Attempting to update the dates...");
            if (isOnline()) {
                const query = `
            {
              allDates {
                startDate
                endDate
                modifier
                location {
                  title
                  url
                }
                sponsor {
                  title
                  url
                }
              }
            }
            `;

                request("https://api.graph.cool/simple/v1/dojapp", query).then(data => {
                    window.localStorage.setItem("datesList", JSON.stringify(data["allDates"]));

                    console.log("Success");
                    resolve(data["allDates"]);
                });
            } else {
                console.log("Failed: No connection!");
                reject();
            }
        })
    }
};

export default DataUpdater;
