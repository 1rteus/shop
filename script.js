document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    
    // Открытие/закрытие меню
    menuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        
        // Анимация кнопки меню (превращение в крестик)
        if (menu.classList.contains('active')) {
            document.querySelectorAll('.menu-line').forEach((line, index) => {
                if (index === 0) {
                    line.style.transform = 'translateY(11px) rotate(45deg)';
                } else if (index === 1) {
                    line.style.opacity = '0';
                } else if (index === 2) {
                    line.style.transform = 'translateY(-11px) rotate(-45deg)';
                }
            });
        } else {
            document.querySelectorAll('.menu-line').forEach((line, index) => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        }
    });
    
    // Закрытие меню при клике на пункт
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            menu.classList.remove('active');
            document.querySelectorAll('.menu-line').forEach((line, index) => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        });
    });
    
    // Анимация появления элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .product-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запустить при загрузке для уже видимых элементов
});
