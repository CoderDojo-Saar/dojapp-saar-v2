import $ from "jquery";

// STYLES
import "../scss/general.scss";

import NavbarLoader from "./navbarLoader";
import DataUpdater from "./dataUpdater";

DataUpdater.updateAll();

$(document).ready(function () {
    NavbarLoader.load();
});
