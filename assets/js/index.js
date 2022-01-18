// General Functions
function testalert(){
    document.body.onclick = () => alert("body clicked");
}

function closeParent(e){
    e.currentTarget.parentElement.remove();
}

function featherReplace() {
    if (feather) {
        feather.replace();
    }
}

function drawerTrigger() {
    let trigger = document.querySelector('.drawer-trigger');
    let drawerTL = gsap.timeline({paused: true});
    drawerTL.to('.site-drawer', 0.4, {x:0, opacity:1, visibility:'visible', ease:"power3.out"});
    drawerTL.from('.site-drawer .drawer-content', 0.4, {opacity:0, y:40, stagger: 0.2}, "-=0.2");

    trigger.onclick = function() {
        let menu = this.querySelector('.hamburger');
        menu.classList.toggle('is-active');
        
        if (menu.classList.contains('is-active')) {
            document.body.classList.add('lock');
            drawerTL.play();
        } else {
            document.body.classList.remove('lock');
            drawerTL.reverse(0.5);
        }
    }

}

function searchTrigger() {
    var isActive = false;
    let drawer = document.querySelector('.search-drawer');
    let triggers = document.querySelectorAll('.search-trigger');
    let searchTL = gsap.timeline({paused:true});
        searchTL.to('.search-drawer', 0.5, {
            scaleX:1, 
            opacity:1, 
            visibility: 'visible',
            transformOrigin:"center center",
            ease: 'power4.out',
            onComplete: function(){drawer.querySelector('input').focus()},
        });
        searchTL.from('.search-drawer .content-container', 0.5, {
            y: 100,
            opacity: 0,
            ease: 'power2.out',
        },"-=0.1")

    for (let trigger of triggers) {
        trigger.onclick = function() {
            isActive = !isActive;
            searchTL.play();
        }
    }
    drawer.querySelector('.exit').onclick = function() {
            isActive = !isActive;
            searchTL.reverse(0.3);
    }
}

function PageEnter() {
    let page = gsap.to('main', 1, {opacity:1, y:0, ease:'power3.out'});
}

function intObserver(callb, once, threshold, ...items) {
    let cb = callb || function(){ alert('Observer on viewport') };

    if (typeof cb !== 'function') return;

    if (typeof window.IntersectionObserver){
        // entries and observer
        let obs = new IntersectionObserver((ent, obs)=>{
            ent.forEach(i => {
                if(i.intersectionRatio>0) {
                    cb(i.target, obs);
                    if(once) obs.unobserve(i.target);
                }
            })
        },{threshold: threshold});

        for (let item of items ) {
            obs.observe(document.querySelector(item));
        }

    } else {
        return false;
    }
}

function numberInput(container){
    let cont = container || document.querySelectorAll('.number-input');
    cont.forEach(function(item){
        let input = item.querySelector('input[type=number]');
        let plus = item.querySelector('.quantity-plus');
        let minus = item.querySelector('.quantity-minus');

        plus.onclick = () => {
            if(input.max) {
                if(!(input.value >= input.max)) {
                    input.value = Number(input.value) + 1
                } else {
                    return false;
                }
            } else {
                input.value = Number(input.value) + 1
            }
        };
        minus.onclick = () => {
            if(input.min) {
                if(input.min && !(input.value <= input.min)) {
                    input.value = Number(input.value) - 1
                } else {
                    return false;
                }
            } else {
                input.value = Number(input.value) - 1
            }
        };
    });
}

// Home Functions

function heroSlider() {
    let heroSlider = new Swiper ('#hero-slider', {
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        // Navigation arrows
        navigation: {
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        },
    })
}
function parallax() {
    var rellax = new Rellax('.rellax', {});
}
function hideItems() {
    let items = document.querySelectorAll('.product-container .item');
    items.forEach(item => {
        item.style.opacity = 0;
    });
}
function revealProductContent(container) {
    gsap.fromTo('.product-container .item', 
    {
        opacity: 0,
        y: 50,
    }, 
    {
       ease: 'power4.out',
       opacity: 1,
       y: 0,
       stagger: 0.2,
       duration: 1.4,
    });
}

// Shop Functions
function loadmore(container, obs) {
    if (container.dataset.load == 1) {
        let loading = container.querySelector('.loading');
        let wrapper = document.querySelector('.products .row');
        loading.hidden = false;
        
        window.counter++

        setTimeout(()=>{
            for (let i = 0; i < 8; i++) {
                let markup = `
                <div class="col-6 col-md-3 px-2">
                    <div class="item">
                        <div class="pic" style="width: 100%; padding-bottom: 120%;">
                            <div class="badge elv-2 bold">
                                20% off
                            </div>
                            <div class="images">
                                <a href="/demoecommerce/single.html" class="d-block inner">
                                    <img class="primary image-child" src="assets/img/bag-1.jpg" alt="#">
                                    <img class="sub image-child" src="assets/img/bag-2.jpg" alt="#">
                                </a>
                            </div>
                        </div>
                        <div class="details">
                            <a href="/demoecommerce/single.html">
                                <div class="title bold">Product Name</div>
                            </a>
                            <div class="prices bold">
                                Rp.30.000
                            </div>
                        </div>
                    </div>
                </div>
                `;
                wrapper.innerHTML += markup;
                loading.hidden = true;
            }
        },1000);
        if(window.counter > 3) container.dataset.load = 0;
    } else {
        obs.unobserve(container);
        return false;
    }
}

// Single-page Function
function gallerySlider() {
    if(Swiper) {
        let Slider = new Swiper('.pic-slider', {
            wrapperClass: 'inner',
            slideClass: 'slide'
        });
        Slider.setGrabCursor();

        let slide_nav = document.querySelectorAll('.pic-nav a');
        slide_nav.forEach(function(item,key){
            item.addEventListener('click', function(){
                document.querySelector('.pic-nav a.active').classList.remove('active');
                item.classList.add('active');
                Slider.slideTo(key);
            })
        });
        Slider.on('slideChange', function(){
            document.querySelector('.pic-nav a.active').classList.remove('active');
            slide_nav[Slider.activeIndex].classList.add('active');
        })
    } else {
        return false;
    }
}

// INITIALIZATION
//=============================================================================

// Home-Init
function initHome() {
    PageEnter();
    featherReplace();
    drawerTrigger();
    searchTrigger();
    heroSlider();
    parallax();
    hideItems();
    intObserver(revealProductContent, true, 0.2, '.product-container');
}
// Shop Init
function initShop(){
    counter = 0;
    PageEnter();
    featherReplace();
    drawerTrigger();
    searchTrigger();
    intObserver(loadmore,false,1,'.loadmore');
}
// Single Product Init
function initSingleProduct() {
    PageEnter();
    featherReplace();
    drawerTrigger();
    searchTrigger();
    gallerySlider();
    numberInput();
}


// Init on load
window.addEventListener('load', function() {
    switch(true) {
        case Boolean(document.getElementById('home')) :
            initHome();
            break;
        case Boolean(document.getElementById('shop')) :
            initShop();
            break;
        case Boolean(document.getElementById('product-single')) :
            initSingleProduct();
            break;
        default:
            PageEnter();
            featherReplace();
            drawerTrigger();
            searchTrigger();
    }
})