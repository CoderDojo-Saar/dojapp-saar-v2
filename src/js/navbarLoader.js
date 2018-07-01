import $ from "jquery";

const createMenuItem = function (entry) {
    return '<a class="navbar-item" href="' + entry.url + '"><i class="material-icons">' + entry.icon + '</i> ' + entry.title + '</a>';
};

const NavbarLoader = {
    menuItems: [
        {
            title: "Termine",
            url: "dates.html",
            icon: "event_note"
        },
        {
            title: "Kontakt",
            url: "contact.html",
            icon: "phone"
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
