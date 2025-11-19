document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('giftBox');
    const slideshow = document.getElementById('slideshow');
    const finalLetter = document.getElementById('finalLetter');
    const dotsContainer = document.getElementById('dotsContainer');
    const music = document.getElementById('backgroundMusic');
    let slideIndex = 0;
    let slideInterval;
    const slideDuration = 3000; // Thời gian hiển thị mỗi slide (3 giây)
    const totalSlides = document.querySelectorAll('.mySlides').length;

    // Tạo các chấm chỉ báo slide
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => currentSlide(i + 1));
        dotsContainer.appendChild(dot);
    }

    // Xử lý sự kiện khi bấm vào hộp quà
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('open');
        setTimeout(() => {
            giftBox.style.display = 'none'; // Ẩn hộp quà
            slideshow.style.display = 'block'; // Hiển thị slideshow
            dotsContainer.style.display = 'block'; // Hiển thị dots
            showSlides(); // Bắt đầu slideshow
        }, 1000); // Đợi hiệu ứng mở hộp quà xong
    });

    // Xử lý sự kiện khi bấm vào hộp quà
    giftBox.addEventListener('click', () => {
        // THÊM DÒNG NÀY ĐỂ PHÁT NHẠC
        music.play().catch(e => {
            console.log("Tự động phát nhạc bị trình duyệt chặn:", e);
        });

        giftBox.classList.add('open');
        setTimeout(() => {
            giftBox.style.display = 'none'; 
            slideshow.style.display = 'block'; 
            dotsContainer.style.display = 'block'; 
            showSlides(); 
        }, 1000); 
    });

    function showSlides() {
        const slides = document.querySelectorAll('.mySlides');
        const dots = document.querySelectorAll('.dot');

        // Ẩn tất cả slides
        slides.forEach(slide => slide.style.display = 'none');
        // Xóa trạng thái active của dots
        dots.forEach(dot => dot.classList.remove('active'));

        slideIndex++;
        if (slideIndex > slides.length) {
            // Nếu đã hết slides, chuyển sang lá thư cuối cùng
            clearInterval(slideInterval);
            slideshow.style.display = 'none';
            dotsContainer.style.display = 'none';
            finalLetter.style.display = 'block';
            return;
        }

        slides[slideIndex - 1].style.display = 'block'; // Hiển thị slide hiện tại
        dots[slideIndex - 1].classList.add('active'); // Đánh dấu dot hiện tại

        // Thiết lập tự động chuyển slide
        slideInterval = setTimeout(showSlides, slideDuration);
    }

    // Hàm để chuyển slide khi bấm vào dot (nếu cần)
    function currentSlide(n) {
        clearInterval(slideInterval); // Dừng slide tự động
        slideIndex = n - 1; // Điều chỉnh index để hàm showSlides chạy đúng
        showSlides();
    }
});