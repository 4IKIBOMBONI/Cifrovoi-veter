// ===================================
// FAQ PAGE JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === FAQ ACCORDION ===
    initFaqAccordion();
    
    // === FAQ CATEGORIES ===
    initFaqCategories();
});

// === FAQ ACCORDION ===
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        const answer = item.querySelector('.faq-item__answer');
        const icon = question.querySelector('i');
        
        if (!answer) return;
        
        // Initially hide all answers
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
        answer.style.padding = '0 20px';
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-item__answer');
                const otherIcon = otherItem.querySelector('.faq-item__question i');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.padding = '0 20px';
                }
                if (otherIcon) {
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                answer.style.padding = '20px';
                if (icon) {
                    icon.style.transition = 'transform 0.3s ease';
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
}

// === FAQ CATEGORIES ===
function initFaqCategories() {
    const categoryButtons = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter FAQ items
            faqItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    
                    // Add fade-in animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-item__answer');
                    if (answer) {
                        answer.style.maxHeight = '0';
                    }
                }
            });
        });
    });
}

// Add CSS for FAQ items dynamically
const style = document.createElement('style');
style.textContent = `
    .faq-item {
        background: white;
        border-radius: 12px;
        margin-bottom: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
    }
    
    .faq-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }
    
    .faq-item__question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        cursor: pointer;
        user-select: none;
    }
    
    .faq-item__question h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        margin: 0;
        flex: 1;
    }
    
    .faq-item__question i {
        font-size: 20px;
        color: #0066cc;
        transition: transform 0.3s ease;
    }
    
    .faq-item__answer {
        color: #64748b;
        font-size: 15px;
        line-height: 1.8;
    }
    
    .faq-item__answer p {
        margin-bottom: 12px;
    }
    
    .faq-item__answer ul,
    .faq-item__answer ol {
        margin: 12px 0;
        padding-left: 24px;
    }
    
    .faq-item__answer li {
        margin-bottom: 8px;
    }
    
    .faq-item__answer strong {
        color: #1e293b;
        font-weight: 600;
    }
    
    .faq-item__answer a {
        color: #0066cc;
        text-decoration: underline;
    }
    
    .faq-item__answer a:hover {
        color: #0052a3;
    }
    
    .faq-categories {
        display: flex;
        gap: 12px;
        margin-bottom: 40px;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .faq-category {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 500;
        color: #64748b;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .faq-category:hover {
        border-color: #0066cc;
        color: #0066cc;
    }
    
    .faq-category.active {
        background: linear-gradient(135deg, #0066cc 0%, #00ccff 100%);
        border-color: transparent;
        color: white;
    }
    
    .faq-category i {
        font-size: 18px;
    }
    
    .faq-list {
        max-width: 900px;
        margin: 0 auto;
    }
    
    .faq-contact {
        margin-top: 60px;
        padding: 60px;
        background: linear-gradient(135deg, #0066cc 0%, #00ccff 100%);
        border-radius: 16px;
        text-align: center;
        color: white;
    }
    
    .faq-contact__content i {
        font-size: 64px;
        margin-bottom: 20px;
        opacity: 0.9;
    }
    
    .faq-contact__content h3 {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 12px;
    }
    
    .faq-contact__content p {
        font-size: 18px;
        margin-bottom: 30px;
        opacity: 0.95;
    }
    
    @media (max-width: 768px) {
        .faq-categories {
            flex-direction: column;
        }
        
        .faq-category {
            width: 100%;
            justify-content: center;
        }
        
        .faq-item__question {
            padding: 20px;
        }
        
        .faq-item__question h3 {
            font-size: 16px;
        }
        
        .faq-contact {
            padding: 40px 20px;
        }
        
        .faq-contact__content h3 {
            font-size: 24px;
        }
    }
`;
document.head.appendChild(style);