document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    
    // Меню
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
    
    // Анимации при скролле
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                // Анимация заголовков
                const title = section.querySelector('.section-title');
                if (title && !title.classList.contains('animate')) {
                    title.classList.add('animate');
                }
                
                // Анимация карточек продуктов
                const cards = section.querySelectorAll('.product-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        if (!card.classList.contains('animate')) {
                            card.classList.add('animate');
                        }
                    }, index * 100);
                });
                
                // Анимация текста
                const text = section.querySelector('p');
                if (text && !text.classList.contains('animate')) {
                    text.classList.add('animate');
                }
            } else {
                // Сброс анимации при скролле вверх
                const title = section.querySelector('.section-title');
                if (title) title.classList.remove('animate');
                
                const cards = section.querySelectorAll('.product-card');
                cards.forEach(card => card.classList.remove('animate'));
                
                const text = section.querySelector('p');
                if (text) text.classList.remove('animate');
            }
        });
    };
    
    // Инициализация
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 3D эффект для карточек
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
            
            if (card.classList.contains('animate')) {
                card.style.transform = `translateY(-10px) scale(1.05) rotateY(${angleY}deg) rotateX(${angleX}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('animate')) {
                card.style.transform = 'translateY(0) scale(1) rotateY(0) rotateX(0)';
            }
        });
    });
});
