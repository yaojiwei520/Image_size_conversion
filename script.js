const ROUTES = {
  1: 'https://www.yemu.xyz/?url=',
  2: 'https://jx.playerjy.com/?url=',
  3: 'https://jx.nnxv.cn/tv.php?url=',
  4: 'https://jx.dmflv.cc/?url=',
  5: 'https://jx.xymp4.cc/?url=',
  6: 'https://jx.77flv.cc/?url=',
  7: 'https://jx.xmflv.cc/?url='
}

// 当前选中的解析器编号
let selectedRoute = null

// =======================================================
// 模态对话框控制逻辑
// =======================================================

const modalOverlay = document.getElementById('modal-overlay');

/** 弹出模态对话框 */
function openModal() {
    modalOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; // 阻止页面滚动
}

/** 关闭模态对话框 */
function closeModal() {
    modalOverlay.classList.remove('visible');
    document.body.style.overflow = ''; // 恢复页面滚动
}

/** 点击对话框外部（背景）时关闭模态对话框 */
function closeModalIfOutside(event) {
    if (event.target === modalOverlay) {
        closeModal();
    }
}

// =======================================================
// 解析逻辑
// =======================================================

function showError(msg, duration = 2000) {
  let existing = document.querySelector('.error-msg');

  if (!existing) {
    const formSection = document.querySelector('.container'); 
    if (!formSection) return;

    existing = document.createElement('div');
    existing.className = 'error-msg';
    formSection.appendChild(existing); 
  }

  existing.textContent = msg;
  existing.classList.remove('hide');
  existing.classList.add('show');

  setTimeout(() => {
    existing.classList.remove('show');
    existing.classList.add('hide');

    existing.addEventListener('transitionend', function handler() {
      existing.remove();
      existing.removeEventListener('transitionend', handler);
    });
  }, duration);
}

function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return /^[\w-]+(\.[\w-]+)+/i.test(url)
  }
}

function processUrl(url) {
  if (!url.startsWith('http')) {
    return `https://${url}`
  }
  return url
}

function handleRedirect() {
  const videoUrl = document.getElementById('videoUrl').value.trim()
  const btn = document.querySelector('button')

  if (!selectedRoute) {
    showError('请选择解析器')
    return
  }

  if (!isValidUrl(videoUrl)) {
    showError('请输入有效的视频地址')
    return
  }

  btn.innerHTML = '解析中<span class="loading"></span>'
  btn.disabled = true

  const processedUrl = processUrl(videoUrl)
  const fullUrl = ROUTES[selectedRoute] + encodeURIComponent(processedUrl)

  setTimeout(() => {
    window.open(fullUrl, '_blank')
    btn.innerHTML = '🚀 立即解析'
    btn.disabled = false
    
    // 解析完成后关闭模态框
    closeModal(); 
  }, 800)
}

// 回车触发解析
document.getElementById('videoUrl').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleRedirect()
})

// =======================================================
// 自定义下拉菜单交互
// =======================================================

const select = document.querySelector('.custom-select')
const selected = select.querySelector('.select-selected')
const items = select.querySelector('.select-items')
const body = document.querySelector('body') 

/*  显示/隐藏选项 */
selected.addEventListener('click', () => {
    items.classList.toggle('show'); 
});

// 选项点击事件
items.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        selectedRoute = option.dataset.value;
        items.classList.remove('show');  
    });
});

// 点击外部收起菜单
document.addEventListener('click', e => {
    if (!select.contains(e.target)) {
        items.classList.remove('show'); 
    }
})

// =======================================================
// 爱心点击效果
// =======================================================

const colors = ['#e25555', '#ff69b4', '#ff9933', '#66ccff', '#9933ff', '#ff3399'];

document.addEventListener("click", function(e) {
  // 避免点击模态框背景或表单时也生成爱心
  if (e.target.closest('#modal-overlay')) {
      return; 
  }
  
  for (let i = 0; i < 6; i++) {
    createHeart(e.clientX + Math.random() - 1, e.clientY + Math.random() - 1);
  }
});

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}