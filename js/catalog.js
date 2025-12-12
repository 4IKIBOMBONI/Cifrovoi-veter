// ===================================
// CATALOG PAGE JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === FILTERS ===
    initFilters();
    
    // === VIEW SWITCHER ===
    initViewSwitcher();
    
    // === SEARCH ===
    initSearch();
    
    // === PAGINATION ===
    initPagination();
});

// === FILTERS INITIALIZATION ===
function initFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const yearFilter = document.getElementById('year-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterWorks);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterWorks);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', sortWorks);
    }
}

// === FILTER WORKS ===
function filterWorks() {
    const categoryFilter = document.getElementById('category-filter');
    const yearFilter = document.getElementById('year-filter');
    const worksGrid = document.getElementById('works-grid');
    
    if (!worksGrid) return;
    
    const works = worksGrid.querySelectorAll('.work-card');
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const selectedYear = yearFilter ? yearFilter.value : 'all';
    
    let visibleCount = 0;
    
    works.forEach(work => {
        const workCategory = work.getAttribute('data-category');
        const workYear = work.getAttribute('data-year');
        
        const categoryMatch = selectedCategory === 'all' || workCategory === selectedCategory;
        const yearMatch = selectedYear === 'all' || workYear === selectedYear;
        
        if (categoryMatch && yearMatch) {
            work.style.display = 'flex';
            visibleCount++;
            
            // Add fade-in animation
            work.style.opacity = '0';
            work.style.transform = 'scale(0.9)';
            setTimeout(() => {
                work.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                work.style.opacity = '1';
                work.style.transform = 'scale(1)';
            }, 50);
        } else {
            work.style.display = 'none';
        }
    });
    
    // Update total works count
    const totalWorksEl = document.getElementById('total-works');
    if (totalWorksEl) {
        totalWorksEl.textContent = visibleCount;
    }
}

// === SORT WORKS ===
function sortWorks() {
    const sortFilter = document.getElementById('sort-filter');
    const worksGrid = document.getElementById('works-grid');
    
    if (!worksGrid || !sortFilter) return;
    
    const works = Array.from(worksGrid.querySelectorAll('.work-card'));
    const sortValue = sortFilter.value;
    
    works.sort((a, b) => {
        switch (sortValue) {
            case 'newest':
                return parseInt(b.getAttribute('data-year')) - parseInt(a.getAttribute('data-year'));
            case 'oldest':
                return parseInt(a.getAttribute('data-year')) - parseInt(b.getAttribute('data-year'));
            case 'popular':
                // Sort by views (example - would need actual data)
                const viewsA = parseInt(a.querySelector('.work-card__stats span:first-child').textContent.replace(/\D/g, ''));
                const viewsB = parseInt(b.querySelector('.work-card__stats span:first-child').textContent.replace(/\D/g, ''));
                return viewsB - viewsA;
            case 'rating':
                // Sort by likes (example - would need actual data)
                const likesA = parseInt(a.querySelector('.work-card__stats span:last-child').textContent.replace(/\D/g, ''));
                const likesB = parseInt(b.querySelector('.work-card__stats span:last-child').textContent.replace(/\D/g, ''));
                return likesB - likesA;
            default:
                return 0;
        }
    });
    
    // Re-append works in new order
    works.forEach(work => worksGrid.appendChild(work));
    
    // Add animation
    works.forEach((work, index) => {
        work.style.opacity = '0';
        work.style.transform = 'translateY(20px)';
        setTimeout(() => {
            work.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            work.style.opacity = '1';
            work.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// === VIEW SWITCHER ===
function initViewSwitcher() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const worksGrid = document.getElementById('works-grid');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active button
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update grid view
            if (worksGrid) {
                if (view === 'list') {
                    worksGrid.classList.add('list-view');
                } else {
                    worksGrid.classList.remove('list-view');
                }
            }
        });
    });
}

// === SEARCH ===
function initSearch() {
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounceSearch(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const works = document.querySelectorAll('.work-card');
            
            let visibleCount = 0;
            
            works.forEach(work => {
                const title = work.querySelector('.work-card__title').textContent.toLowerCase();
                const author = work.querySelector('.work-card__author').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || author.includes(searchTerm)) {
                    work.style.display = 'flex';
                    visibleCount++;
                } else {
                    work.style.display = 'none';
                }
            });
            
            // Update total works count
            const totalWorksEl = document.getElementById('total-works');
            if (totalWorksEl) {
                totalWorksEl.textContent = visibleCount;
            }
        }, 300));
    }
}

// Debounce helper for search
function debounceSearch(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === PAGINATION ===
function initPagination() {
    const paginationButtons = document.querySelectorAll('.pagination__btn:not([disabled])');
    
    paginationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            paginationButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            if (!this.querySelector('i')) { // Not arrow button
                this.classList.add('active');
            }
            
            // Scroll to top of works grid
            const worksGrid = document.getElementById('works-grid');
            if (worksGrid) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const filtersHeight = document.querySelector('.filters-section').offsetHeight;
                const scrollTop = worksGrid.offsetTop - headerHeight - filtersHeight - 20;
                
                window.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === OPEN WORK MODAL (placeholder) ===
function openWorkModal(workId) {
    console.log('Opening work modal for ID:', workId);
    // In production, this would open a modal with work details
    alert('Функция просмотра работы будет реализована в полной версии. ID работы: ' + workId);
}

// Make function globally available
window.openWorkModal = openWorkModal;