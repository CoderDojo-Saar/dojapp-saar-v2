import {request} from 'graphql-request'

function isOnline() {
    return true;//navigator.connection.type !== Connection.NONE;
}

let datesUpdatedEvent = new Event("datesUpdated");

const DataUpdater = {
    updateAll: function () {
        this.updateDates();
    },

    updateDates: function () {
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

            request("https://api.graph.cool/simple/v1/cjiyc5bxf0yny0149wcbhgtnd", query).then(data => {
                window.localStorage.setItem("datesList", JSON.stringify(data["allDates"]));

                console.log("Success");

                dispatchEvent(datesUpdatedEvent);
            });
        } else {
            console.log("Failed: No connection!")
        }
    }
};

export { datesUpdatedEvent };
export default DataUpdater;
