import "../../main";
import $ from "jquery";

import BulmaUI from "../../bulmaUI.js";
import DateTableLoader from "./dateTableLoader";

$(document).ready(function () {
    BulmaUI.register();

    // load the table
    DateTableLoader.load();
});
