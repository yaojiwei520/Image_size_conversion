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

function showError(msg, duration = 2000) {
    let existing = document.querySelector('.error-msg');

    if (!existing) {
        const btn = document.querySelector('button');
        if (!btn || !btn.parentNode) return;

        existing = document.createElement('div');
        existing.className = 'error-msg';
        btn.parentNode.insertBefore(existing, btn.nextSibling);
    }

    existing.textContent = msg;

    // 触发显示
    existing.classList.remove('hide');
    existing.classList.add('show');

    // 延迟隐藏
    setTimeout(() => {
        existing.classList.remove('show');
        existing.classList.add('hide');

        // 动画结束后移除元素
        existing.addEventListener('transitionend', function handler() {
            existing.remove();
            existing.removeEventListener('transitionend', handler);
        });
    }, duration);
}

// 验证 URL
function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return /^[\w-]+(\.[\w-]+)+/i.test(url)
  }
}

// 处理 URL
function processUrl(url) {
  if (!url.startsWith('http')) {
    return `https://${url}`
  }
  return url
}

// 处理解析
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
  }, 800)
}

// 回车触发解析
document.getElementById('videoUrl').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleRedirect()
})

// 自定义下拉菜单交互
const select = document.querySelector('.custom-select')
const selected = select.querySelector('.select-selected')
const items = select.querySelector('.select-items')
const body = document.querySelector('body') //拿到body元素

/*  显示/隐藏选项，增加/移除模糊 */
selected.addEventListener('click', () => {
    items.classList.toggle('show'); // 显示/隐藏菜单
    body.classList.toggle('blurred');  // 添加/移除模糊效果
});

// 选项点击事件
items.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        selectedRoute = option.dataset.value;
        items.classList.remove('show');  // 点击选项后，确保菜单隐藏
        body.classList.remove('blurred');   // 移除模糊效果
    });
});

// 点击外部收起菜单
document.addEventListener('click', e => {
  if (!select.contains(e.target)) {
    items.classList.remove('show'); //关闭菜单
    body.classList.remove('blurred');  //点击容器外部也需要移除模糊
  }
})

// ------------------ 爱心点击效果 ------------------
const colors = ['#e25555', '#ff69b4', '#ff9933', '#66ccff', '#9933ff', '#ff3399'];

// 点击时生成多个爱心
document.addEventListener("click", function(e) {
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

