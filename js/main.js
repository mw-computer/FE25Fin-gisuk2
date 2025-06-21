// 상단 메뉴 보이기
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll('[role="menuitem"][data-menu]');
    const navs = document.querySelectorAll('.expanded-nav');

    let activeNav = null;

    menuItems.forEach((item) => {
        const menuKey = item.getAttribute("data-menu");

        item.addEventListener("mouseenter", () => {
            // 모든 확장 메뉴 숨기기
            navs.forEach(nav => {
                nav.style.display = "none";
                nav.setAttribute("aria-expanded", "false");
            });

            // 해당하는 확장 메뉴만 보여주기
            const targetNav = document.querySelector(`.expanded-nav[data-target="${menuKey}"]`);
            if (targetNav) {
                targetNav.style.display = "block";
                targetNav.setAttribute("aria-expanded", "true");
                item.setAttribute("aria-haspopup", "dialog");
                activeNav = targetNav;
            }
        });
    });

    navs.forEach(nav => {
        nav.addEventListener("mouseleave", () => {
            nav.style.display = "none";
            nav.setAttribute("aria-expanded", "false");
        });
    });
});

// 모바일 화면
const mobileButton = document.querySelector(".mobile-ver");
const closeButton = document.querySelector(".mobile-close");
const mobileMenu = document.querySelector(".mobile-container");
const html = document.documentElement; // <html> 태그

function closeMobileMenu() {
    html.style.overflow = ""; // 스크롤 복원
    mobileMenu.classList.remove("mOpen");
    mobileMenu.classList.add("mClose");
    initializeMobileNav(navItems, subNavs); // 모바일 메뉴 상태 초기화
}
function openMobileMenu() {
    html.style.overflow = "hidden"; // 스크롤 막기
    mobileMenu.classList.remove("mClose");
    mobileMenu.classList.add("mOpen");
}

document.addEventListener("DOMContentLoaded", function () {
    mobileButton.addEventListener("click", openMobileMenu);
    closeButton.addEventListener("click", closeMobileMenu);
    closeMobileMenu();

    window.addEventListener("resize", () => {
        const width = window.innerWidth;
        if (width >= 992) {
            closeMobileMenu(); // PC 화면으로 전환되면 모바일 메뉴 닫기
        }
    });
});

// 모바일 메뉴 별 세부 메뉴
const navItems = document.querySelectorAll('.mMainNavList');
const subNavs = document.querySelectorAll('.mSubNav_');
function initializeMobileNav(navItems, subNavs) {
    navItems.forEach((el, i) => {
        el.classList.toggle('mCursorOver', i === 0);
        el.classList.toggle('mCursorLeave', i !== 0);
    });

    subNavs.forEach((el, i) => {
        el.classList.toggle('mSubNav-inner-hide', i !== 0);
    });
}

document.addEventListener('DOMContentLoaded', () => {

    initializeMobileNav(navItems, subNavs);

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = item.getAttribute('data-index');

            navItems.forEach(el => {
                el.classList.remove('mCursorOver');
                el.classList.add('mCursorLeave');
            });
            item.classList.add('mCursorOver');
            item.classList.remove('mCursorLeave');

            subNavs.forEach(sub => {
                sub.classList.add('mSubNav-inner-hide');
            });

            const target = document.querySelector(`.mSubNav-inner[data-index="${index}"]`);
            if (target) {
                target.classList.remove('mSubNav-inner-hide');
                target.classList.add('mSubNav-inner');
            }
        });
    });
});