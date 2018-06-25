import $ from "jquery";
import tippy from "tippy.js";

import dates from "./dates.json";

const createDateTableEntry = function (entry) {
    let location = "";

    if(entry.location.url === undefined) {
        location = entry["location"]["title"]
    } else {
        location = "<a href='javascript:cordova.InAppBrowser.open(\"" + encodeURI(entry["location"]["url"]) + "\", \"_system\")'>" + entry["location"]["title"] + "</a>";
    }

    let icon = "";

    if(entry["modifier"].includes("special-date")){
        icon = "<i class='material-icons date-table-item-icon' title='Dieser Termin entspricht nicht der Regel'>warning</i>";
    }

    return "<tr><th>" + icon + "</th><th>" + entry.startDate.toLocaleString().slice(0, -3) + "</th><th>" + new Date(entry.endDate - entry.startDate).toLocaleTimeString().slice(0, -3) + "</th><th>" + location + "</th></tr>";
};

const DateTableLoader = {
    dates: dates,

    load: function () {
        let table = $("#date-table");

        if(this.dates.length < 0) {
            table.append("<tr class='is-light only-text'><th colspan='3'>Zur Zeit sind keine Termine geplant</th></tr>");
        } else {
            this.dates.forEach(function (entry) {
                entry.startDate = new Date(entry["startDate"]);
                entry.endDate = new Date(entry["endDate"]);

                if(entry.endDate.getTime() > Date.now()) table.append(createDateTableEntry(entry));
            });

            tippy(".date-table-item-icon", {
                arrow: true
            });
        }
    }
};

export default DateTableLoader
