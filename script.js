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
    
    // スワイプナビゲーションの初期化
    initSwipeNavigation();
    
    // 振動フィードバックの初期化
    initVibrationFeedback();
    
    // バックグラウンド更新の初期化
    initBackgroundUpdate();
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

// 連絡先情報表示
function showContactInfo() {
    const contactInfo = `
連絡先情報:
📧 Email: yu_ta20051021@icloud.com
📱 Phone: 080-9735-2005
📷 Instagram: @yuta223_6767
💬 LINE: @tsutsumiyuta20051021
    `.trim();
    
    createCustomModal('堤祐太 - 連絡先情報', contactInfo);
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
FN:堤祐太
ORG:近畿大学
TITLE:経営学部キャリアマネジメント学科
EMAIL:yu_ta20051021@icloud.com
TEL:08097352005
URL:https://www.instagram.com/yuta223_6767
URL:https://line.me/ti/p/tsutsumiyuta20051021
NOTE:学生団体ツナグ・HANZEON運営、よさこい社会人チーム『嘉們』正規メンバー、和太鼓全国大会優勝
END:VCARD`;

    // Blobオブジェクトを作成してダウンロード
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = '堤祐太.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // メモリリークを防ぐ
    window.URL.revokeObjectURL(url);
    
    // 成功メッセージ
    showToast('堤祐太の連絡先がダウンロードされました！');
}

// タブ切り替え機能
function showTab(tabId) {
    // 全てのタブボタンからactiveクラスを削除
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 全てのタブパネルを非表示
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // クリックされたタブボタンにactiveクラスを追加
    event.target.classList.add('active');
    
    // 対応するタブパネルを表示
    document.getElementById(tabId).classList.add('active');
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

// スワイプナビゲーションの初期化
function initSwipeNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabContent = document.querySelector('.tab-content');
    
    if (!tabContent) return;
    
    let startX = 0;
    let startY = 0;
    let currentTabIndex = 0;
    
    // タブの順序を定義
    const tabOrder = ['about', 'activities', 'achievements'];
    
    tabContent.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    tabContent.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // 水平スワイプが垂直スワイプより大きい場合のみ処理
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // 左スワイプ - 次のタブ
                currentTabIndex = Math.min(currentTabIndex + 1, tabOrder.length - 1);
            } else {
                // 右スワイプ - 前のタブ
                currentTabIndex = Math.max(currentTabIndex - 1, 0);
            }
            
            // タブを切り替え
            switchToTab(tabOrder[currentTabIndex]);
        }
        
        startX = 0;
        startY = 0;
    }, { passive: true });
}

// タブ切り替え関数
function switchToTab(tabId) {
    // 全てのタブボタンからactiveクラスを削除
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 全てのタブパネルを非表示
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // 対応するタブボタンにactiveクラスを追加
    const targetButton = document.querySelector(`[onclick="showTab('${tabId}')"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
    
    // 対応するタブパネルを表示
    const targetPanel = document.getElementById(tabId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

// 振動フィードバックの初期化
function initVibrationFeedback() {
    // 振動がサポートされているかチェック
    if (!navigator.vibrate) return;
    
    // ボタンに振動フィードバックを追加
    const buttons = document.querySelectorAll('button, .social-link, .tag');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            // 短い振動（50ms）
            navigator.vibrate(50);
        }, { passive: true });
        
        button.addEventListener('click', function() {
            // クリック時の振動（100ms）
            navigator.vibrate(100);
        });
    });
}

// バックグラウンド更新の初期化
function initBackgroundUpdate() {
    // Service Workerがサポートされているかチェック
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
    
    // 定期的なデータ更新（5分ごと）
    setInterval(updateData, 5 * 60 * 1000);
    
    // ページがフォーカスされた時の更新
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateData();
        }
    });
}

// データ更新関数
function updateData() {
    // 現在時刻の更新
    const now = new Date();
    console.log('Data updated at:', now.toLocaleString());
    
    // 必要に応じて他のデータも更新
    // 例: ソーシャルメディアの最新情報、訪問者数など
}

// 編集モードの切り替え
function toggleEditMode() {
    const editButton = document.querySelector('.btn-edit');
    const isEditMode = editButton.textContent.includes('編集モード');
    
    if (isEditMode) {
        // 編集モードを有効にする
        enableEditMode();
        editButton.innerHTML = '<i class="fas fa-save"></i> 保存';
    } else {
        // 編集を保存する
        saveChanges();
        editButton.innerHTML = '<i class="fas fa-edit"></i> 編集モード';
    }
}

// 編集モードを有効にする
function enableEditMode() {
    // 編集可能な要素を特定
    const editableElements = [
        { selector: '.profile-name', type: 'text' },
        { selector: '.title', type: 'text' },
        { selector: '.subtitle', type: 'text' },
        { selector: '#about p', type: 'textarea' }
    ];
    
    editableElements.forEach(element => {
        const el = document.querySelector(element.selector);
        if (el) {
            el.contentEditable = true;
            el.style.border = '2px dashed #ff6b35';
            el.style.padding = '5px';
            el.style.borderRadius = '5px';
        }
    });
    
    // 編集モードの説明を表示
    showEditInstructions();
}

// 変更を保存する
function saveChanges() {
    const changes = {};
    
    // 変更された内容を収集
    const profileName = document.querySelector('.profile-name').textContent;
    const title = document.querySelector('.title').textContent;
    const subtitle = document.querySelector('.subtitle').textContent;
    
    changes.profileName = profileName;
    changes.title = title;
    changes.subtitle = subtitle;
    
    // ローカルストレージに保存
    localStorage.setItem('profileChanges', JSON.stringify(changes));
    
    // 実際のHTMLファイルを更新
    updateHTMLFile(changes);
    
    // 編集モードを無効にする
    disableEditMode();
    
    // 保存完了の通知
    showSaveNotification();
}

// HTMLファイルを実際に更新する
async function updateHTMLFile(changes) {
    try {
        // 現在のHTMLを取得
        const response = await fetch('index.html');
        let htmlContent = await response.text();
        
        // 変更を適用
        if (changes.profileName) {
            htmlContent = htmlContent.replace(
                /<div class="profile-name">.*?<\/div>/,
                `<div class="profile-name">${changes.profileName}</div>`
            );
        }
        
        if (changes.title) {
            htmlContent = htmlContent.replace(
                /<div class="title">.*?<\/div>/,
                `<div class="title">${changes.title}</div>`
            );
        }
        
        if (changes.subtitle) {
            htmlContent = htmlContent.replace(
                /<div class="subtitle">.*?<\/div>/,
                `<div class="subtitle">${changes.subtitle}</div>`
            );
        }
        
        // 更新されたHTMLをサーバーに送信
        await fetch('/api/update-html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: htmlContent,
                timestamp: new Date().toISOString()
            })
        });
        
        console.log('HTMLファイルが更新されました');
        
    } catch (error) {
        console.error('HTML更新エラー:', error);
        showUpdateErrorNotification();
    }
}

// GitHubに変更をプッシュする
async function pushChangesToGitHub(changes) {
    try {
        // GitHub APIを使用してファイルを更新
        const response = await fetch('/api/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                changes: changes,
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            console.log('変更がGitHubにプッシュされました');
            showPushNotification();
        } else {
            console.error('プッシュに失敗しました');
            showPushErrorNotification();
        }
    } catch (error) {
        console.error('エラー:', error);
        showPushErrorNotification();
    }
}

// プッシュ成功通知
function showPushNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 80px; right: 20px; background: #2196F3; color: white; padding: 15px; border-radius: 10px; z-index: 1000;">
            <i class="fas fa-cloud-upload-alt"></i> GitHubにプッシュされました！
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// プッシュエラー通知
function showPushErrorNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 80px; right: 20px; background: #f44336; color: white; padding: 15px; border-radius: 10px; z-index: 1000;">
            <i class="fas fa-exclamation-triangle"></i> プッシュに失敗しました。手動でプッシュしてください。
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// 更新エラー通知
function showUpdateErrorNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 80px; right: 20px; background: #ff9800; color: white; padding: 15px; border-radius: 10px; z-index: 1000;">
            <i class="fas fa-exclamation-triangle"></i> ファイル更新に失敗しました。手動でファイルを編集してください。
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// 編集モードを無効にする
function disableEditMode() {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(el => {
        el.contentEditable = false;
        el.style.border = 'none';
        el.style.padding = '0';
    });
}

// 編集説明を表示
function showEditInstructions() {
    const instructions = document.createElement('div');
    instructions.id = 'edit-instructions';
    instructions.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: rgba(255, 107, 53, 0.9); color: white; padding: 15px; border-radius: 10px; z-index: 1000; max-width: 300px;">
            <h4>編集モード</h4>
            <p>• オレンジの枠線の要素をクリックして編集</p>
            <p>• 変更後は「保存」ボタンをクリック</p>
            <p>• 編集をキャンセルする場合はページを再読み込み</p>
        </div>
    `;
    document.body.appendChild(instructions);
}

// 保存完了通知を表示
function showSaveNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 15px; border-radius: 10px; z-index: 1000;">
            <i class="fas fa-check"></i> 変更が保存されました！
        </div>
    `;
    document.body.appendChild(notification);
    
    // 3秒後に通知を削除
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 管理者認証（簡単なパスワード認証）
function authenticateAdmin() {
    const password = prompt('管理者パスワードを入力してください:');
    if (password === 'admin123') { // 実際の運用ではより安全な認証を使用
        document.querySelector('.btn-edit').style.display = 'block';
        return true;
    } else {
        alert('パスワードが正しくありません');
        return false;
    }
}

// ページ読み込み時に編集ボタンを表示するかチェック
document.addEventListener('DOMContentLoaded', function() {
    // URLパラメータで編集モードをチェック
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === 'true') {
        if (authenticateAdmin()) {
            // 認証成功時のみ編集ボタンを表示
        }
    }
});
