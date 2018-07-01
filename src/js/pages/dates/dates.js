import "../../main";
import $ from "jquery";

import BulmaUI from "../../bulmaUI.js";
import DateTableLoader from "./dateTableLoader";
import DataUpdater from "../../dataUpdater";

import NavbarLoader from "../../navbarLoader";

function loadTable() {
    $(document).ready(function () {
        DateTableLoader.load();
        DateTableLoader.registerEvents();

        $("#sync-dates").removeClass("is-loading");
    });
}

DataUpdater.updateDates().then(loadTable, loadTable);

$(document).ready(function () {
    NavbarLoader.load("dates");

    BulmaUI.register();

    let syncDatesBtn = $("#sync-dates");
    if(navigator.connection.type === Connection.NONE) {
        syncDatesBtn.prop("disabled", true);
    } else {
        syncDatesBtn.prop("disabled", false);
    }
});