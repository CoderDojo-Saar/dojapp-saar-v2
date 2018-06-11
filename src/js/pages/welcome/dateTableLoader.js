import $ from "jquery";

const createDateTableEntry = function (entry) {
    let location = "";

    if(entry.location.url === undefined) {
        location = entry.location.title;
    } else {
        location = "<a href='javascript:cordova.InAppBrowser.open(\"" + entry.location.url + "\", \"_system\")'>" + entry.location.title + "</a>";
    }

    let icon = "";

    if(entry.modifier.includes("special-date")) {
        icon = "warning";
    }

    return "<tr><th><i class='material-icons'>" + icon + "</i></th><th>" + entry.date.toLocaleDateString() + "</th><th>" + location + "</th></tr>";
};

const DateTableLoader = {
    dates: [
        {
            date: new Date(2018, 6, 9),
            location: {
                title: "Alte Schmelz (St. Ingbert)",
                url: encodeURI("https://www.google.com/maps/search/?api=1&query=Alte Schmelz, St. Ingbert, Deutschland&query_place_id=ChIJiQmkvC7IlUcRaw95fNIEDvY")
            },
            modifier: ["special-date"]
        },
        {
            date: new Date(2018, 8, 25),
            location: {
                title: "LMS Saar",
                url: encodeURI("https://www.google.com/maps/search/?api=1&query=Landesmedienanstalt Saarland, Nell-Breuning-Allee, Saarbrücken, Deutschland&query_place_id=ChIJpQ0NBGGxlUcRgk80xY1J8qQ")
            },
            modifier: []
        },
        {
            date: new Date(2018, 9, 22),
            location: {
                title: "LMS Saar",
                url: encodeURI("https://www.google.com/maps/search/?api=1&query=Landesmedienanstalt Saarland, Nell-Breuning-Allee, Saarbrücken, Deutschland&query_place_id=ChIJpQ0NBGGxlUcRgk80xY1J8qQ")
            },
            modifier: ["special-date"]
        },
        {
            date: new Date(2018, 10, 27),
            location: {
                title: "LMS Saar",
                url: encodeURI("https://www.google.com/maps/search/?api=1&query=Landesmedienanstalt Saarland, Nell-Breuning-Allee, Saarbrücken, Deutschland&query_place_id=ChIJpQ0NBGGxlUcRgk80xY1J8qQ")
            },
            modifier: []
        },
        {
            date: new Date(2018, 11, 24),
            location: {
                title: "LMS Saar",
                url: encodeURI("https://www.google.com/maps/search/?api=1&query=Landesmedienanstalt Saarland, Nell-Breuning-Allee, Saarbrücken, Deutschland&query_place_id=ChIJpQ0NBGGxlUcRgk80xY1J8qQ")
            },
            modifier: []
        },
        {
            date: new Date(2018, 12, 15),
            location: {
                title: "LMS Saar",
                url: encodeURI("https://www.google.com/maps/search/?api=1&query=Landesmedienanstalt Saarland, Nell-Breuning-Allee, Saarbrücken, Deutschland&query_place_id=ChIJpQ0NBGGxlUcRgk80xY1J8qQ")
            },
            modifier: ["special-date"]
        },
    ],

    load: function () {
        let table = $("#date-table");

        if(this.dates.length < 0) {
            table.append("<tr class='is-light only-text'><th colspan='3'>Zur Zeit sind keine Termine geplant</th></tr>");
        } else {
            this.dates.forEach(function (entry) {
                table.append(createDateTableEntry(entry))
            })
        }
    }
};

export default DateTableLoader
