document.addEventListener('DOMContentLoaded', function() {
    // Элементы меню
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    // Функция для закрытия меню
    function closeMenu() {
        menuBtn.classList.remove('active');
        menu.classList.remove('active');
        menuOverlay.classList.remove('active');
    }
    
    // Открытие/закрытие меню
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        menu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });
    
    // Закрытие меню при клике вне его области
    menuOverlay.addEventListener('click', closeMenu);
    
    // Закрытие меню при клике на пункт меню
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', closeMenu);
    });
    
    // Анимации при скролле (работает на мобильных)
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate');
        const windowHeight = window.innerHeight;
        
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
            }
        });
    }
    
    // Инициализация анимаций
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // 3D эффект только для десктопов
    if (window.innerWidth > 768) {
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
                
                product.style.transform = `
                    translateY(-10px) 
                    rotateX(${angleX}deg) 
                    rotateY(${angleY}deg) 
                    scale(1.05)
                `;
                product.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
            });
            
            product.addEventListener('mouseleave', () => {
                product.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
                product.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            });
        });
    }
});
