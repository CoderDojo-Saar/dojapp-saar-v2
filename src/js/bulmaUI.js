// jQuery
import $ from "jquery";

const BulmaUI = {
    register: function () {
        this.components.navbar.register();
    },

    components: {
        navbar: {
            register: function () {
                /*
                 * ----
                 * COMPONENTS
                 * ----
                 * Navbar
                 * --
                */

                // Burger
                $(".navbar-burger").click(function () {
                    $(".navbar-menu").toggleClass("is-active");
                });

            }
        }
    }
};

export default BulmaUI;
