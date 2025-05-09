document.addEventListener('DOMContentLoaded', function() {
    // Меню
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
        }
    });

    // Анимации при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.title, .product, p');
        const windowHeight = window.innerHeight;
        
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                el.classList.add('animated');
            }
        });
    }
    
    // Инициализация анимаций
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);

    // 3D эффект для карточек
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        product.addEventListener('mousemove', (e) => {
            const rect = product.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (centerY - y) / 10;
            const angleY = (x - centerX) / 10;
            
            if (product.classList.contains('animated')) {
                product.style.transform = `
                    rotateX(${angleX}deg) 
                    rotateY(${angleY}deg) 
                    scale(1.05)
                `;
                product.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
            }
        });
        
        product.addEventListener('mouseleave', () => {
            if (product.classList.contains('animated')) {
                product.style.transform = 'rotateX(0) rotateY(0) scale(1)';
                product.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }
        });
    });
});
