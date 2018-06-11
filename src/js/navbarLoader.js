import $ from "jquery";

const createMenuItem = function (entry) {
    return '<a class="navbar-item" href="' + entry.url + '"><i class="material-icons">' + entry.icon + '</i> ' + entry.title + '</a>';
};

const NavbarLoader = {
    menuItems: [
        {
            title: "Willkommen",
            url: "welcome.html",
            icon: "event_note"
        }
    ],

    load: function () {
        let menuItemContainer = $("#menu-item-container");

        this.menuItems.forEach(function (entry) {
            menuItemContainer.append(createMenuItem(entry))
        })
    }
};

export default NavbarLoader
