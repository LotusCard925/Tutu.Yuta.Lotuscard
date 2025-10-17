// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // アニメーション効果の初期化
    initAnimations();
    
    // ボタンのイベントリスナー設定
    initButtonEvents();
    
    // ソーシャルリンクのイベントリスナー設定
    initSocialLinks();
    
    // パフォーマンス最適化のための遅延読み込み
    initLazyLoading();
    
    // タッチデバイス対応の初期化
    initTouchSupport();
    
    // レスポンシブ対応の初期化
    initResponsiveSupport();
});

// アニメーション効果の初期化
function initAnimations() {
    // スクロール時のフェードイン効果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    const animatedElements = document.querySelectorAll('.social-link');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ボタンのイベントリスナー設定
function initButtonEvents() {
    const exchangeButton = document.querySelector('.btn-primary');
    const downloadButton = document.querySelector('.btn-secondary');

    // Exchange Contact ボタンのクリックイベント
    if (exchangeButton) {
        exchangeButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // ボタンのアニメーション効果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // 連絡先交換のモーダルまたはアクション
            showContactModal();
        });
    }

    // Download ボタンのクリックイベント
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // ボタンのアニメーション効果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // ダウンロード機能（vCard形式など）
            downloadContact();
        });
    }
}

// ソーシャルリンクのイベントリスナー設定
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // リンクのホバー効果
            this.style.transform = 'translateX(8px)';
            setTimeout(() => {
                this.style.transform = 'translateX(4px)';
            }, 200);
        });

        // マウスオーバー効果
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// 連絡先交換モーダル表示
function showContactModal() {
    // シンプルなアラートで代替（実際のプロジェクトではモーダルコンポーネントを使用）
    const contactInfo = `
連絡先情報:
📧 Email: lotuscard@example.com
🐙 GitHub: github.com/LotusCard925
🐦 Twitter: @LotusCard925
💼 LinkedIn: linkedin.com/in/lotuscard
    `.trim();
    
    // より良いUXのためにカスタムモーダルを作成
    createCustomModal('連絡先情報', contactInfo);
}

// カスタムモーダル作成
function createCustomModal(title, content) {
    // 既存のモーダルがあれば削除
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // モーダルオーバーレイ
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'custom-modal';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    // モーダルコンテンツ
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 16px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.3s ease;
    `;

    modalContent.innerHTML = `
        <h3 style="color: #ff6b35; margin-bottom: 20px; font-size: 24px;">${title}</h3>
        <div style="white-space: pre-line; line-height: 1.8; color: #333; margin-bottom: 30px;">${content}</div>
        <button onclick="this.closest('.custom-modal').remove()" 
                style="background: #ff6b35; color: white; border: none; padding: 12px 24px; 
                       border-radius: 8px; cursor: pointer; font-weight: 600;">
            閉じる
        </button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // オーバーレイクリックで閉じる
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    // CSS アニメーション追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// 連絡先ダウンロード機能
function downloadContact() {
    // vCard形式の連絡先情報を作成
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:LotusCard
ORG:LotusCard
EMAIL:lotuscard@example.com
URL:https://github.com/LotusCard925
URL:https://twitter.com/LotusCard925
URL:https://linkedin.com/in/lotuscard
END:VCARD`;

    // Blobオブジェクトを作成してダウンロード
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'LotusCard.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // メモリリークを防ぐ
    window.URL.revokeObjectURL(url);
    
    // 成功メッセージ
    showToast('連絡先がダウンロードされました！');
}

// トースト通知表示
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff6b35;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1001;
        animation: slideUp 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 3秒後に自動削除
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 遅延読み込みの初期化
function initLazyLoading() {
    // 画像の遅延読み込み（将来的に画像を追加する場合）
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// パフォーマンス最適化: デバウンス関数
function debounce(func, wait) {
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

// タッチデバイス対応の初期化
function initTouchSupport() {
    // タッチイベントの最適化
    const touchElements = document.querySelectorAll('.social-link, .btn-primary, .btn-secondary');
    
    touchElements.forEach(element => {
        // タッチ開始時のフィードバック
        element.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        // タッチ終了時のリセット
        element.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
        }, { passive: true });
        
        // タッチキャンセル時のリセット
        element.addEventListener('touchcancel', function(e) {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
    
    // ダブルタップズームの無効化（必要に応じて）
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// レスポンシブ対応の初期化
function initResponsiveSupport() {
    // 画面サイズ変更時の処理
    const handleResize = debounce(() => {
        // 画面サイズに応じた処理
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // モバイル判定
        const isMobile = width <= 768;
        const isTablet = width > 768 && width <= 1024;
        const isDesktop = width > 1024;
        
        // デバイスに応じた最適化
        if (isMobile) {
            // モバイル用の最適化
            document.body.classList.add('mobile-device');
            document.body.classList.remove('tablet-device', 'desktop-device');
        } else if (isTablet) {
            // タブレット用の最適化
            document.body.classList.add('tablet-device');
            document.body.classList.remove('mobile-device', 'desktop-device');
        } else if (isDesktop) {
            // デスクトップ用の最適化
            document.body.classList.add('desktop-device');
            document.body.classList.remove('mobile-device', 'tablet-device');
        }
        
        // 縦横比の調整
        if (height < width) {
            document.body.classList.add('landscape');
            document.body.classList.remove('portrait');
        } else {
            document.body.classList.add('portrait');
            document.body.classList.remove('landscape');
        }
    }, 100);
    
    // 初期実行
    handleResize();
    
    // リサイズイベント
    window.addEventListener('resize', handleResize);
    
    // オリエンテーション変更イベント
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResize, 100);
    });
}

// スクロールイベントの最適化
const optimizedScrollHandler = debounce(() => {
    // スクロール時の処理（必要に応じて追加）
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // スクロール位置に応じた処理
    if (scrollY > windowHeight * 0.5) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);
