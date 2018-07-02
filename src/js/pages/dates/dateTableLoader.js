import $ from "jquery";
import tippy from "tippy.js";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

import DataUpdater from "../../dataUpdater";

momentDurationFormatSetup(moment);

const createDateTableEntry = function (entry) {
    let location = "";
    if(entry.location.url === null || entry.location.url === "") {
        location = entry["location"]["title"]
    } else {
        location = "<a href='javascript:cordova.InAppBrowser.open(\"" + encodeURI(entry.location.url) + "\", \"_system\")'>" + entry.location.title + "</a>";
    }

    let sponsor = "";
    if(entry.sponsor === null) {
        sponsor = "<span class='is-disabled'>Kein Sponsor</span>";
    } else {
        if(entry.sponsor.url === null || entry.sponsor.url === "") {
            sponsor = entry.sponsor.title;
        } else {
            sponsor = "<a href='javascript:cordova.InAppBrowser.open(\"" + encodeURI(entry.sponsor.url) + "\", \"_system\")'>" + entry.sponsor.title + "</a>";
        }
    }

    let icon = "";
    if(entry["modifier"].includes("SpecialDate")){
        icon = "<i class='material-icons date-table-item-icon' title='Dieser Termin entspricht nicht der Regel'>warning</i>";
    }

    return "<tr><th>" + icon + "</th><th>" + entry.startDate.toLocaleString().slice(0, -3) + "</th><th>" + moment.duration(moment(entry.endDate).diff(entry.startDate)).format("hh:mm") + "</th><th>" + location + "</th><th>" + sponsor + "</th></tr>";
};

const DateTableLoader = {
    load: function (onlyFutureDates = null) {
        if(onlyFutureDates === null) {
            onlyFutureDates = $("#show-only-future-dates").prop("checked");
        }

        let dates = JSON.parse(window.localStorage.getItem("datesList"));

        let table = $("#date-table");
        table.empty();

        if(dates.length === 0) {
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
        let that = this;

        let onlyFutureDatesSwitch = $("#show-only-future-dates");
        let syncDatesBtn = $("#sync-dates");

        onlyFutureDatesSwitch.click(function () {
            that.load();
        });

        syncDatesBtn.click(function () {
            syncDatesBtn.addClass("is-loading");

            DataUpdater.updateDates().then(function () {
                that.load();

                syncDatesBtn.removeClass("is-loading");
            }, function () {
                navigator.notification.alert("Du scheinst nicht mit dem Internet verbunden zu sein.", null, "Synchronisation fehlgeschlagen");

                syncDatesBtn.removeClass("is-loading");
            });
        });

        document.addEventListener("online", function () {
            syncDatesBtn.prop("disabled", false);
        }, false);

        document.addEventListener("offline", function () {
            syncDatesBtn.prop("disabled", true);
        }, false);
    }
};

export default DateTableLoader
