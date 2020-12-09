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
            let nodes = Array.from(document.body.getElementsByTagName("img"));
            for(var idx in nodes){
                let node = nodes[idx];
                node.src = this.src(node.clientWidth, node.clientHeight);
                node.removeAttribute('srcset');
            }
        }
        if (this.replace_background_img) {
            // Only gets nodes that have style set... otherwise it take a very long time to iterate
            let nodes = Array.from(document.body.getElementsByTagName("*[style]"));
            for(let idx in nodes){
                let node = nodes[idx];
                if (window.getComputedStyle(node, null).getPropertyValue("background-image").toLowerCase().substr(0, 3) == "url") {
                    node.style.backgroundImage = 'url("' + this.src(node.clientWidth, node.clientHeight) + '")';
                }
            }
        }
    },
    src: function (w, h) {
        return "https://placekitten.com/" + w + "/" + h + "?image=" + this.image();
    },
    i: 1,
    image: function(){
        if(this.i+1 > 16){
            this.i = 0;
        }
        this.i++;
        return this.i;
    }
};

document.addEventListener("DOMContentLoaded", function () {
    KittenBomb.triggered_check();
});

window.addEventListener("hashchange", KittenBomb.triggered_check, false);
