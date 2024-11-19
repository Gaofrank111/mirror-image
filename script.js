document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const originalImage = document.getElementById('originalImage');
    const mirrorCanvas = document.getElementById('mirrorImage');
    const imageContainer = document.getElementById('imageContainer');
    const ctx = mirrorCanvas.getContext('2d');

    uploadBtn.addEventListener('click', function() {
        imageInput.click();
    });

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    // 计算显示尺寸（保持宽高比）
                    let displayWidth = img.width;
                    let displayHeight = img.height;
                    const maxSize = 600; // 最大显示尺寸

                    if (displayWidth > maxSize || displayHeight > maxSize) {
                        if (displayWidth > displayHeight) {
                            displayHeight = (maxSize * displayHeight) / displayWidth;
                            displayWidth = maxSize;
                        } else {
                            displayWidth = (maxSize * displayWidth) / displayHeight;
                            displayHeight = maxSize;
                        }
                    }

                    // 设置原始图片尺寸
                    originalImage.width = displayWidth;
                    originalImage.height = displayHeight;
                    originalImage.src = event.target.result;
                    
                    // 设置画布尺寸与原图完全相同
                    mirrorCanvas.width = displayWidth;
                    mirrorCanvas.height = displayHeight;
                    
                    // 创建镜像效果
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, -displayWidth, 0, displayWidth, displayHeight);
                    
                    // 重置变换
                    ctx.setTransform(1, 0, 0, 1, 0, 0);

                    // 显示图片容器
                    imageContainer.style.display = 'flex';
                };
                img.src = event.target.result;
            };
            
            reader.readAsDataURL(file);
        }
    });
}); 