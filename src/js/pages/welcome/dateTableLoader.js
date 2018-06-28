import $ from "jquery";
import tippy from "tippy.js";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const createDateTableEntry = function (entry) {
    let location = "";
    if(entry.location.url === undefined) {
        location = entry["location"]["title"]
    } else {
        location = "<a href='javascript:cordova.InAppBrowser.open(\"" + encodeURI(entry.location.url) + "\", \"_system\")'>" + entry.location.title + "</a>";
    }

    let sponsor = "";
    if(entry.sponsor === null) {
        sponsor = "<span class='is-disabled'>Kein Sponsor</span>";
    } else {
        if(entry.sponsor.url === undefined) {
            sponsor = entry.sponsor.title;
        } else {
            sponsor = "<a href='javascript:cordova.InAppBrowser.open(\"" + encodeURI(entry.sponsor.url) + "\", \"_system\")'>" + entry.sponsor.title + "</a>";
        }
    }

    let icon = "";
    if(entry["modifier"].includes("special-date")){
        icon = "<i class='material-icons date-table-item-icon' title='Dieser Termin entspricht nicht der Regel'>warning</i>";
    }

    return "<tr><th>" + icon + "</th><th>" + entry.startDate.toLocaleString().slice(0, -3) + "</th><th>" + moment.duration(moment(entry.endDate).diff(entry.startDate)).format("hh:mm") + "</th><th>" + location + "</th><th>" + sponsor + "</th></tr>";
};

const DateTableLoader = {
    load: function (onlyFutureDates) {
        let dates = JSON.parse(window.localStorage.getItem("datesList"));

        let table = $("#date-table");
        table.empty();

        if(dates.length < 0) {
            table.append("<tr class='is-light only-text'><th colspan='3'>Zur Zeit sind keine Termine geplant</th></tr>");
        } else {
            dates.forEach(function (entry) {
                entry.startDate = new Date(entry["startDate"]);
                entry.endDate = new Date(entry["endDate"]);

                if(!onlyFutureDates || entry.endDate.getTime() > Date.now()) table.append(createDateTableEntry(entry));
            });

            tippy(".date-table-item-icon", {
                arrow: true
            });
        }
    },

    registerEvents: function () {
        let switch_ = $("#showOnlyFutureDates");

        let that = this;

        switch_.click(function () {
            that.load(switch_.prop("checked"));
        });

        addEventListener("datesUpdated", function () {
            that.load(switch_.prop("checked"));
        });
    }
};

export default DateTableLoader
