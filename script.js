// Tech Time Company Profile - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupSmoothScrolling();
    setupFooterInteractions();
    setupServiceCards();
    setupContactButtons();
    setupPartnerLogos();
    setupNewsletterForm();
    addBackToTop();
    setupAnalytics();
}

// تمرير سلس للروابط
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// تفاعلات الفوتر
function setupFooterInteractions() {
    // إضافة تأثيرات hover للروابط
    document.querySelectorAll('.footer-col a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // تحديث سنة حقوق النشر تلقائياً
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `<i class="far fa-copyright"></i> ${currentYear} Tech Time · وقت التكنولوجيا. All rights reserved.`;
    }
}

// تفاعلات بطاقات الخدمات
function setupServiceCards() {
    const cards = document.querySelectorAll('.card, .service-card, .footer-col');
    
    cards.forEach(card => {
        // إضافة تأثير البطاقة عند التحويم
        card.addEventListener('mouseenter', function(e) {
            if (!this.classList.contains('footer-col')) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0,102,179,0.2)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        card.addEventListener('mouseleave', function(e) {
            if (!this.classList.contains('footer-col')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });

        // إضافة حدث النقر للبطاقات
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'I') {
                const serviceName = this.querySelector('h3')?.textContent || 'Service';
                showServiceModal(serviceName);
            }
        });
    });
}

// نافذة معلومات الخدمة
function showServiceModal(serviceName) {
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${serviceName}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>For more information about ${serviceName}, please contact our sales team:</p>
                <div class="contact-options">
                    <div class="contact-option">
                        <i class="fas fa-phone"></i>
                        <span>+964 780 220 3330</span>
                    </div>
                    <div class="contact-option">
                        <i class="fas fa-envelope"></i>
                        <span>sales@techtime.me</span>
                    </div>
                    <div class="contact-option">
                        <i class="fas fa-globe"></i>
                        <span>www.techtime.me</span>
                    </div>
                </div>
                <button class="inquiry-btn">Request a Quote</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // إظهار النافذة مع تأثير
    setTimeout(() => modal.classList.add('show'), 10);

    // إغلاق النافذة
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });

    // إغلاق عند النقر خارج المحتوى
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });

    // زر طلب عرض سعر
    const inquiryBtn = modal.querySelector('.inquiry-btn');
    inquiryBtn.addEventListener('click', () => {
        showInquiryForm(serviceName);
        modal.remove();
    });
}

// نموذج طلب عرض سعر
function showInquiryForm(serviceName) {
    const formModal = document.createElement('div');
    formModal.className = 'service-modal';
    formModal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Request Quote - ${serviceName}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="inquiry-form">
                    <div class="form-group">
                        <label for="name">Full Name *</label>
                        <input type="text" id="name" required placeholder="Enter your full name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" required placeholder="your@email.com">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="+964 XXX XXX XXXX">
                    </div>
                    <div class="form-group">
                        <label for="company">Company</label>
                        <input type="text" id="company" placeholder="Company name">
                    </div>
                    <div class="form-group">
                        <label for="message">Message *</label>
                        <textarea id="message" rows="4" required placeholder="Tell us about your requirements..."></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Submit Request</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(formModal);
    setTimeout(() => formModal.classList.add('show'), 10);

    // إغلاق النافذة
    const closeBtn = formModal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        formModal.classList.remove('show');
        setTimeout(() => formModal.remove(), 300);
    });

    // معالجة تقديم النموذج
    const form = formModal.querySelector('#inquiry-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // جمع بيانات النموذج
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value,
            service: serviceName,
            date: new Date().toISOString()
        };

        // هنا يمكن إرسال البيانات إلى الخادم
        console.log('Form submitted:', formData);
        
        // محاكاة إرسال ناجح
        showNotification('Thank you! Our team will contact you soon.', 'success');
        formModal.remove();
    });
}

// إشعارات منبثقة
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // إظهار الإشعار
    setTimeout(() => notification.classList.add('show'), 10);

    // إخفاء الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// تفاعلات أزرار الاتصال
function setupContactButtons() {
    // أزرار الهاتف
    document.querySelectorAll('[class*="phone"], [class*="tel"]').forEach(element => {
        element.addEventListener('click', function() {
            const phoneNumber = this.textContent.match(/[\d\+\s]+/)?.[0] || '+9647802203330';
            if (confirm(`Call ${phoneNumber}?`)) {
                window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
            }
        });
    });

    // أزرار البريد الإلكتروني
    document.querySelectorAll('[class*="email"]').forEach(element => {
        element.addEventListener('click', function() {
            const email = this.textContent.match(/[\w\.-]+@[\w\.-]+\.\w+/)?.[0] || 'info@techtime.me';
            window.location.href = `mailto:${email}`;
        });
    });
}

// تفاعلات شعارات الشركاء
function setupPartnerLogos() {
    const partnerChips = document.querySelectorAll('.lang-chip');
    
    partnerChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const partnerName = this.textContent;
            
            // تأثير وميض
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);

            // عرض معلومات الشريك
            showPartnerInfo(partnerName);
        });
    });
}

// عرض معلومات الشريك
function showPartnerInfo(partnerName) {
    const partnerInfo = {
        'Microsoft Partner': {
            description: 'Certified Microsoft Gold Partner since 2018',
            services: 'Dynamics 365, Azure, Microsoft 365'
        },
        'Odoo Ready': {
            description: 'Official Odoo implementation partner',
            services: 'ERP implementation, customization, support'
        },
        'Google Cloud': {
            description: 'Google Cloud Platform Partner',
            services: 'Cloud infrastructure, data analytics, AI/ML'
        }
    };

    const info = partnerInfo[partnerName] || {
        description: 'Trusted technology partner',
        services: 'Various enterprise solutions'
    };

    showNotification(`${partnerName}: ${info.description}`, 'info');
}

// إضافة زر العودة للأعلى
function addBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    // إظهار/إخفاء الزر حسب التمرير
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // العودة للأعلى عند النقر
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// تحليلات بسيطة
function setupAnalytics() {
    // تتبع الصفحات المعروضة
    const pages = document.querySelectorAll('.page');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pageTitle = entry.target.querySelector('h2')?.textContent || 'Unknown Page';
                console.log(`Page viewed: ${pageTitle}`);
                // هنا يمكن إرسال البيانات إلى Google Analytics أو أي خدمة تحليلات
            }
        });
    }, { threshold: 0.5 });

    pages.forEach(page => observer.observe(page));
}

// إضافة تأثيرات تحميل تدريجي
window.addEventListener('load', function() {
    // إضافة تأثير ظهور تدريجي للعناصر
    document.querySelectorAll('.page, .card, .footer-col').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// إضافة بعض الأنماط الإضافية للعناصر المضافة
const style = document.createElement('style');
style.textContent = `
    .service-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        backdrop-filter: blur(5px);
    }

    .service-modal.show {
        opacity: 1;
        visibility: visible;
    }

    .modal-content {
        background: white;
        border-radius: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        box-shadow: 0 20px 40px rgba(0, 102, 179, 0.2);
    }

    .service-modal.show .modal-content {
        transform: scale(1);
    }

    .modal-header {
        padding: 20px 25px;
        background: linear-gradient(135deg, var(--tech-royal), var(--tech-deep));
        color: white;
        border-radius: 20px 20px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h3 {
        margin: 0;
        font-size: 1.5rem;
    }

    .close-modal {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }

    .close-modal:hover {
        transform: scale(1.1);
    }

    .modal-body {
        padding: 25px;
    }

    .contact-options {
        display: grid;
        gap: 15px;
        margin: 20px 0;
    }

    .contact-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: #f5f9ff;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .contact-option:hover {
        background: #e1ecfe;
    }

    .inquiry-btn, .submit-btn {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #ffb347, #ff9800);
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .inquiry-btn:hover, .submit-btn:hover {
        transform: translateY(-2px);
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: var(--tech-deep);
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid #e1e8ed;
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--tech-accent);
    }

    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 1000;
        border-left: 4px solid var(--tech-accent);
    }

    .notification.success {
        border-left-color: #28a745;
    }

    .notification.show {
        transform: translateX(0);
    }

    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--tech-accent);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 99;
        box-shadow: 0 5px 15px rgba(0,102,179,0.3);
    }

    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }

    .back-to-top:hover {
        transform: translateY(-5px);
        background: var(--tech-royal);
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    /* تحسينات للهواتف المحمولة */
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 10px;
        }
        
        .notification {
            left: 20px;
            right: 20px;
            transform: translateY(400px);
        }
        
        .back-to-top {
            bottom: 20px;
            right: 20px;
        }
    }
`;

document.head.appendChild(style);