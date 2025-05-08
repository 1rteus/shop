document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    
    // Анимация меню
    menuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        
        if (menu.classList.contains('active')) {
            document.querySelectorAll('.menu-line').forEach((line, index) => {
                if (index === 0) line.style.transform = 'translateY(11px) rotate(45deg)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'translateY(-11px) rotate(-45deg)';
            });
        } else {
            document.querySelectorAll('.menu-line').forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        }
    });
    
    // Закрытие меню
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            menu.classList.remove('active');
            document.querySelectorAll('.menu-line').forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        });
    });
    
    // Анимация при скролле
    const animateElements = function() {
        const elements = document.querySelectorAll('.scroll-animate');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
                
                if (element.classList.contains('product-card')) {
                    element.classList.add('rotate-in');
                } else {
                    element.classList.add('pop-in');
                }
            } else {
                element.classList.remove('animated', 'pop-in', 'rotate-in');
            }
        });
    };
    
    // Инициализация анимаций
    window.addEventListener('load', animateElements);
    window.addEventListener('scroll', animateElements);
    window.addEventListener('resize', animateElements);
    
    // Плавный скролл для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 3D эффект для карточек при движении мыши
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleY = (x - centerX) / 20;
            const angleX = (centerY - y) / 20;
            
            card.style.transform = `translateY(-10px) scale(1.05) rotateY(${angleY}deg) rotateX(${angleX}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) scale(1.05) rotateY(0) rotateX(0)';
        });
    });
});
