/*!
 * KittenBomb v1.0
 * https://github.com/BrianWendt/kitten-bomb
 *
 * Copyright Brian Wendt
 * Release under GNU General Public License v3.0
 * https://github.com/BrianWendt/kitten-bomb/blob/main/LICENSE
 */
let KittenBomb = {
    trigger_hash: "#kitten-bomb",
    replace_img_src: true,
    replace_background_img: true,
    triggered_check: function () {
        if (window.location.hash == KittenBomb.trigger_hash) {
            KittenBomb.detonate();
        }
    },
    detonate: function () {
        console.log("a cute explosion");
        if (this.replace_img_src) {
            Array.from(document.images).map((img) => {
                img.src = this.src(img.naturalWidth, img.naturalHeight);
                return img;
            });
        }
        if (this.replace_background_img) {
            Array.from(document.body.getElementsByTagName("*")).map((node) => {
                if (window.getComputedStyle(node, null).getPropertyValue("background-image").toLowerCase().substr(0, 3) == "url") {
                    node.style.backgroundImage = 'url("' + this.src(node.clientWidth, node.clientHeight) + '")';
                }
            });
        }
    },
    src: function (w, h) {
        return "https://placekitten.com/" + w + "/" + h;
    },
};

document.addEventListener("DOMContentLoaded", function () {
    KittenBomb.triggered_check();
});

window.addEventListener("hashchange", KittenBomb.triggered_check, false);