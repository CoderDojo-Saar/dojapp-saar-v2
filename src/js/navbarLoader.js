import $ from "jquery";

const createMenuItem = function (entry, isActive) {
    let isActiveString = isActive ? "is-active" : "";

    return '<a class="navbar-item ' + isActiveString + '" href="' + entry.url + '"><i class="material-icons">' + entry.icon + '</i> ' + entry.title + '</a>';
};

const NavbarLoader = {
    menuItems: [
        {
            title: "Termine",
            id: "dates",
            url: "dates.html",
            icon: "event_note"
        },
        {
            title: "Kontakt",
            id: "contact",
            url: "contact.html",
            icon: "phone"
        }
    ],

    load: function (current) {
        let menuItemContainer = $("#menu-item-container");

        this.menuItems.forEach(function (entry) {
            menuItemContainer.append(createMenuItem(entry, entry.id === current))
        })
    }
};

export default NavbarLoader
