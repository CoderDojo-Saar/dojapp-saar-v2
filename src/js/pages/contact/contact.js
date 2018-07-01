import "../../main";
import $ from "jquery";

import BulmaUI from "../../bulmaUI.js";

import NavbarLoader from "../../navbarLoader";

$(document).ready(function () {
    NavbarLoader.load("contact");
    BulmaUI.register();
});
