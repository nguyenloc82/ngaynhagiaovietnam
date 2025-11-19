document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử HTML
    const container = document.getElementById('container'); // Dùng cho chức năng cuộn trang
    const giftBox = document.getElementById('giftBox');
    const slideshow = document.getElementById('slideshow');
    const finalLetter = document.getElementById('finalLetter');
    const dotsContainer = document.getElementById('dotsContainer');
    const music = document.getElementById('backgroundMusic');

    let slideIndex = 1; // Bắt đầu từ slide 1
    let slideInterval;
    const SLIDE_DURATION = 3000; // THỜI GIAN HIỂN THỊ: 10 giây (10000ms)
    const totalSlides = document.querySelectorAll('.mySlides').length;

    // --- Khởi tạo dots ---
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        // Gán sự kiện cho dot: chuyển slide và reset timer
        dot.addEventListener('click', () => currentSlide(i + 1)); 
        dotsContainer.appendChild(dot);
    }
    
    // --- Hàm chuyển slide chính ---
    function showSlides() {
        const slides = document.querySelectorAll('.mySlides');
        const dots = document.querySelectorAll('.dot');
        
        // --- Xử lý logic chuyển slide và kết thúc ---
        if (slideIndex > slides.length) {
            // Hết slide: Chuyển sang lá thư cuối cùng
            clearInterval(slideInterval);
            slideshow.style.display = 'none';
            dotsContainer.style.display = 'none';
            
            // Kích hoạt cuộn trang và hiển thị lá thư
            container.classList.add('scrollable'); 
            finalLetter.style.display = 'block';
            return;
        }

        // --- Hiển thị slide hiện tại ---
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));

        slides[slideIndex - 1].style.display = 'block'; 
        dots[slideIndex - 1].classList.add('active'); 

        // Tự động chuyển slide sau 10 giây
        slideInterval = setTimeout(() => {
            slideIndex++;
            showSlides();
        }, SLIDE_DURATION);
    }

    // --- Logic bấm thủ công (Dot và Next/Prev) ---
    // Hàm này sẽ dừng tự động chuyển và bắt đầu slide mới
    function currentSlide(n) {
        clearTimeout(slideInterval); // Dừng timer hiện tại
        slideIndex = n;
        showSlides();
    }
    // Gán hàm cho nút Prev/Next trong HTML
    window.plusSlides = function(n) {
        clearTimeout(slideInterval);
        slideIndex += n;
        
        // Xử lý vòng lặp slide
        if (slideIndex > totalSlides) {slideIndex = 1}    
        if (slideIndex < 1) {slideIndex = totalSlides}
        
        showSlides();
    }


    // --- Xử lý sự kiện khi bấm vào hộp quà (Khởi động) ---
    giftBox.addEventListener('click', () => {
        // 1. PHÁT NHẠC
        music.play().catch(e => {
            console.warn("Tự động phát nhạc bị trình duyệt chặn:", e);
        });

        giftBox.classList.add('open');
        setTimeout(() => {
            giftBox.style.display = 'none'; // Ẩn hộp quà
            slideshow.style.display = 'block'; // Hiển thị slideshow
            dotsContainer.style.display = 'block'; // Hiển thị dots
            
            // 2. BẮT ĐẦU TÍNH THỜI GIAN VÀ CHUYỂN ĐỔI HÌNH ẢNH
            // SlideIndex đã là 1, chỉ cần gọi showSlides lần đầu
            showSlides(); 
        }, 1000); 
    });

    // Gọi showSlides lần đầu để hiển thị slide 1 ngay lập tức khi mở hộp
    // Hàm này được gọi trong sự kiện click, không cần gọi ở đây.
    
});
