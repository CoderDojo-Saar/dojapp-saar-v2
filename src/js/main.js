import $ from "jquery";

// STYLES
import "../scss/general.scss";

import NavbarLoader from "./navbarLoader";
import DataUpdater from "./dataUpdater";

$(document).ready(function () {
    NavbarLoader.load();
    DataUpdater.updateAll();
});
