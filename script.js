// 第一个DOMContentLoaded已废弃，保留第二个完整版本

// 标签页切换
function initTabSwitch() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      navButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetTab) {
          content.classList.add('active');
        }
      });
    });
  });
}

// 美食筛选
function initFoodFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const foodCards = document.querySelectorAll('.food-card');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      foodCards.forEach(card => {
        if (filter === 'all' || card.dataset.city === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 返回顶部
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 倒计时功能
function initCountdown() {
  const targetDate = new Date('2024-06-13T23:59:59').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
      document.querySelector('.countdown').innerHTML = `
        <div class="countdown-item">
          <span class="countdown-num" style="font-size: 1.5rem;">旅行开始啦！</span>
        </div>
      `;
    }
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// 日期标签切换
function initDayTabs() {
  const dayTabs = document.querySelectorAll('.day-tab');
  const dayCards = document.querySelectorAll('.day-card');
  
  dayTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetDay = this.dataset.day;
      
      dayTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      dayCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.day === targetDay) {
          card.classList.add('active');
        }
      });
    });
  });
}

// 打卡按钮
function initCheckButtons() {
  const checkButtons = document.querySelectorAll('.check-btn');
  
  checkButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const isChecked = this.classList.contains('checked');
      
      if (isChecked) {
        this.classList.remove('checked');
        this.style.transform = 'scale(1)';
      } else {
        this.classList.add('checked');
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 300);
      }
      
      // 更新进度
      updateProgress();
    });
  });
}

// 更新进度
function updateProgress() {
  const totalActivities = document.querySelectorAll('.check-btn').length;
  const completedActivities = document.querySelectorAll('.check-btn.checked').length;
  const progress = (completedActivities / totalActivities) * 100;
  
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `已完成 ${completedActivities} / ${totalActivities} 个活动`;
  
  // 检查成就
  checkAchievements(completedActivities, totalActivities);
}

// 成就系统
const achievements = {
  firstCheck: { name: '首次打卡', desc: '迈出旅行的第一步！', icon: '🚩', unlocked: false },
  halfDone: { name: '半程英雄', desc: '完成了一半的行程！', icon: '✨', unlocked: false },
  fullDone: { name: '旅行达人', desc: '完成所有行程安排！', icon: '🏅', unlocked: false },
  foodie: { name: '吃货专家', desc: '收藏了5种美食！', icon: '🍔', unlocked: false },
  photo: { name: '摄影大师', desc: '上传了3张照片！', icon: '📸', unlocked: false },
  diary: { name: '日记作家', desc: '写下了第一篇日记！', icon: '📝', unlocked: false }
};

// 检查成就
function checkAchievements(completed, total) {
  const achievementCards = document.querySelectorAll('.achievement-card');
  
  // 首次打卡
  if (completed >= 1 && !achievements.firstCheck.unlocked) {
    unlockAchievement('firstCheck');
  }
  
  // 半程完成
  if (completed >= Math.floor(total / 2) && !achievements.halfDone.unlocked) {
    unlockAchievement('halfDone');
  }
  
  // 全部完成
  if (completed >= total && !achievements.fullDone.unlocked) {
    unlockAchievement('fullDone');
  }
  
  // 更新成就卡片状态
  achievementCards.forEach(card => {
    const id = card.dataset.achievement;
    if (achievements[id].unlocked) {
      card.classList.remove('locked');
      card.classList.add('unlocked');
    }
  });
}

// 解锁成就
function unlockAchievement(id) {
  achievements[id].unlocked = true;
  
  // 显示成就弹窗
  const modal = document.createElement('div');
  modal.className = 'achievement-modal show';
  modal.innerHTML = `
    <div class="modal-icon">${achievements[id].icon}</div>
    <div class="modal-title">🎉 成就解锁！</div>
    <div class="modal-desc">获得「${achievements[id].name}」</div>
    <p style="color:#636e72;font-size:0.9rem;">${achievements[id].desc}</p>
    <button class="modal-close">太棒了！</button>
  `;
  
  document.body.appendChild(modal);
  
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    modal.remove();
  });
  
  // 点击外部关闭
  setTimeout(() => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }, 100);
}

// 收藏按钮
function initFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  
  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const isFavorited = this.classList.contains('favorited');
      
      if (isFavorited) {
        this.classList.remove('favorited');
        this.textContent = '❤️ 收藏';
      } else {
        this.classList.add('favorited');
        this.textContent = '❤️ 已收藏';
      }
      
      // 检查美食收藏成就
      checkFoodieAchievement();
    });
  });
}

// 检查美食收藏成就
function checkFoodieAchievement() {
  const favoritedCount = document.querySelectorAll('.favorite-btn.favorited').length;
  
  if (favoritedCount >= 5 && !achievements.foodie.unlocked) {
    unlockAchievement('foodie');
  }
}

// 日记保存和照片上传
function initDiarySave() {
  const saveBtn = document.getElementById('saveDiaryBtn');
  const addPhotoBtn = document.getElementById('addPhotoBtn');
  const photoInput = document.getElementById('diaryPhotoInput');
  const textarea = document.querySelector('.diary-input textarea');
  const diaryList = document.getElementById('diaryList');
  const previewContainer = document.getElementById('diaryImagesPreview');
  const selectedImages = [];
  
  // 检查元素是否存在
  console.log('Diary elements:', {
    saveBtn: !!saveBtn,
    addPhotoBtn: !!addPhotoBtn,
    photoInput: !!photoInput,
    textarea: !!textarea,
    diaryList: !!diaryList,
    previewContainer: !!previewContainer
  });
  
  // 添加照片按钮点击
  addPhotoBtn.addEventListener('click', function() {
    console.log('Add photo button clicked');
    photoInput.click();
  });
  
  // 文件选择处理
  photoInput.addEventListener('change', function(e) {
    console.log('File input changed');
    const files = Array.from(e.target.files);
    console.log('Selected files:', files);
    
    if (files.length === 0) {
      console.log('No files selected');
      return;
    }
    
    files.forEach(file => {
      console.log('Processing file:', file.name, 'Type:', file.type);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
          console.log('File loaded successfully:', file.name);
          const imgData = {
            src: event.target.result,
            name: file.name
          };
          selectedImages.push(imgData);
          console.log('Selected images count:', selectedImages.length);
          renderImagePreview();
        };
        
        reader.onerror = function(error) {
          console.error('Error reading file:', error);
          alert('图片读取失败，请重试');
        };
        
        reader.readAsDataURL(file);
      } else {
        console.log('Skipping non-image file:', file.name);
        alert('请选择图片文件');
      }
    });
    
    // 清空input，允许重复选择相同文件
    photoInput.value = '';
  });
  
  // 渲染图片预览
  function renderImagePreview() {
    if (selectedImages.length === 0) {
      previewContainer.innerHTML = '';
      previewContainer.style.display = 'none';
      return;
    }
    
    previewContainer.style.display = 'flex';
    previewContainer.innerHTML = selectedImages.map((img, index) => `
      <div class="preview-item">
        <img src="${img.src}" alt="${img.name}">
        <button class="remove-preview-btn" data-index="${index}">×</button>
      </div>
    `).join('');
    
    // 绑定删除按钮事件
    document.querySelectorAll('.remove-preview-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        selectedImages.splice(index, 1);
        renderImagePreview();
      });
    });
  }
  
  // 保存日记
  saveBtn.addEventListener('click', function() {
    const content = textarea.value.trim();
    
    if (!content && selectedImages.length === 0) {
      alert('请写下旅行感受或添加照片！✍️📷');
      return;
    }
    
    // 创建图片HTML
    const imagesHtml = selectedImages.length > 0 ? `
      <div class="diary-images">
        ${selectedImages.map(img => `<img src="${img.src}" alt="${img.name}">`).join('')}
      </div>
    ` : '';
    
    // 创建新日记卡片
    const newDiary = document.createElement('div');
    newDiary.className = 'diary-card';
    newDiary.innerHTML = `
      <div class="diary-date">${new Date().toLocaleDateString('zh-CN')} · 旅行中</div>
      <div class="diary-content">
        ${content ? `<p>${content}</p>` : ''}
      </div>
      ${imagesHtml}
      <div class="diary-footer">
        <button class="diary-action">❤️ 喜欢 (0)</button>
        <button class="diary-action">💬 评论</button>
        <button class="diary-action">🔄 分享</button>
        <button class="diary-action delete-diary">🗑️ 删除</button>
      </div>
    `;
    
    // 移除空状态
    const emptyState = diaryList.querySelector('.empty-state');
    if (emptyState) {
      diaryList.removeChild(emptyState);
    }
    
    diaryList.insertBefore(newDiary, diaryList.firstChild);
    
    // 添加动画
    newDiary.style.opacity = '0';
    newDiary.style.transform = 'translateY(20px)';
    setTimeout(() => {
      newDiary.style.transition = 'all 0.3s ease';
      newDiary.style.opacity = '1';
      newDiary.style.transform = 'translateY(0)';
    }, 10);
    
    // 绑定新日记的互动按钮
    const actions = newDiary.querySelectorAll('.diary-action');
    actions.forEach(btn => {
      btn.addEventListener('click', function() {
        if (this.textContent.includes('喜欢')) {
          const currentLikes = parseInt(this.textContent.match(/\d+/)[0]);
          const newLikes = currentLikes + 1;
          this.textContent = `❤️ 喜欢 (${newLikes})`;
        } else if (this.textContent.includes('评论')) {
          alert('评论功能开发中... 💬');
        } else if (this.textContent.includes('分享')) {
          alert('分享链接已复制到剪贴板！🔗');
        } else if (this.textContent.includes('删除')) {
          if (confirm('确定要删除这篇日记吗？')) {
            newDiary.style.opacity = '0';
            newDiary.style.transform = 'translateX(-20px)';
            setTimeout(() => {
              diaryList.removeChild(newDiary);
              // 如果没有日记了，显示空状态
              if (diaryList.querySelectorAll('.diary-card').length === 0) {
                diaryList.innerHTML = `
                  <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <p>还没有日记</p>
                    <p class="empty-hint">写下你的旅行感受吧</p>
                  </div>
                `;
              }
            }, 300);
          }
        }
      });
    });
    
    // 清空表单
    textarea.value = '';
    selectedImages.length = 0;
    renderImagePreview();
    
    // 检查日记作家成就
    checkDiaryAchievement();
    
    // 检查摄影大师成就
    const totalPhotos = document.querySelectorAll('.diary-images img').length;
    if (totalPhotos >= 3 && !achievements.photo.unlocked) {
      unlockAchievement('photo');
    }
  });
}

// 检查日记作家成就
function checkDiaryAchievement() {
  const diaryCount = document.querySelectorAll('.diary-card').length;
  
  if (diaryCount >= 1 && !achievements.diary.unlocked) {
    unlockAchievement('diary');
  }
}

// 日记互动
function initDiaryActions() {
  const likeButtons = document.querySelectorAll('.diary-action');
  
  likeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.textContent.includes('喜欢')) {
        const currentLikes = parseInt(this.textContent.match(/\d+/)[0]);
        const newLikes = currentLikes + 1;
        this.textContent = `❤️ 喜欢 (${newLikes})`;
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
      } else if (this.textContent.includes('评论')) {
        alert('评论功能开发中... 💬');
      } else if (this.textContent.includes('分享')) {
        alert('分享链接已复制到剪贴板！🔗');
      }
    });
  });
}

// 角色心情变化和对话
function initCharacterMoods() {
  const moods = [
    '😊 兴奋中',
    '🤤 想恰饭',
    '🌞 好天气',
    '💤 困了',
    '🎉 开心',
    '🍜 觅食中',
    '📸 拍照中',
    '🚶 走路中'
  ];
  
  const jiangMood = document.querySelector('.character-card.jiang .character-mood');
  const suMood = document.querySelector('.character-card.su .character-mood');
  
  setInterval(() => {
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    jiangMood.textContent = randomMood;
    jiangMood.style.animation = 'fadeIn 0.3s ease';
  }, 5000);
  
  setInterval(() => {
    const foodMoods = ['🤤 想恰饭', '🍜 觅食中', '🍤 想吃虾饺', '🥟 想吃肠粉', '🍦 想吃甜品'];
    const randomFoodMood = foodMoods[Math.floor(Math.random() * foodMoods.length)];
    suMood.textContent = randomFoodMood;
    suMood.style.animation = 'fadeIn 0.3s ease';
  }, 4000);
  
  // 角色对话
  initCharacterDialogue();
}

// 角色对话功能
function initCharacterDialogue() {
  const jiangLines = [
    '好期待这次旅行啊！✈️',
    '听说广州早茶超好吃！',
    '澳门的蛋挞一定要尝尝！',
    '珠海的海一定很美~',
    '终于可以出去玩啦！🎉',
    '希望天气好好的！🌞',
    '我们的行程安排得好棒！',
    '好想快点吃到虾饺！🦐'
  ];
  
  const suLines = [
    '什么时候吃饭啊？🤤',
    '听说广州有好多好吃的！',
    '蛋挞蛋挞蛋挞！🍮',
    '海鲜大餐我来了！🦞',
    '我已经饿了...',
    '猪扒包看起来好好吃！',
    '木糠布甸是什么？好吃吗？',
    '快带我去吃东西！🍜'
  ];
  
  const jiangBubble = document.querySelector('.jiang-bubble');
  const suBubble = document.querySelector('.su-bubble');
  const jiangText = jiangBubble.querySelector('.bubble-text');
  const suText = suBubble.querySelector('.bubble-text');
  
  function showDialogue() {
    // Jiang说话
    jiangText.textContent = jiangLines[Math.floor(Math.random() * jiangLines.length)];
    jiangBubble.classList.add('show');
    
    setTimeout(() => {
      jiangBubble.classList.remove('show');
      
      // Su回应
      setTimeout(() => {
        suText.textContent = suLines[Math.floor(Math.random() * suLines.length)];
        suBubble.classList.add('show');
        
        setTimeout(() => {
          suBubble.classList.remove('show');
        }, 3000);
      }, 500);
    }, 3000);
  }
  
  // 初始延迟后开始对话
  setTimeout(showDialogue, 2000);
  
  // 定时触发对话
  setInterval(showDialogue, 15000);
}

// 欢迎动画
function welcomeAnimation() {
  const hero = document.querySelector('.hero');
  hero.style.opacity = '0';
  hero.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    hero.style.transition = 'all 0.8s ease';
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
  }, 100);
  
  const stats = document.querySelectorAll('.stat-card');
  stats.forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'scale(0.8)';
    setTimeout(() => {
      stat.style.transition = 'all 0.5s ease';
      stat.style.opacity = '1';
      stat.style.transform = 'scale(1)';
    }, 400 + index * 150);
  });
  
  const comments = document.querySelectorAll('.comment-item');
  comments.forEach((comment, index) => {
    comment.style.opacity = '0';
    comment.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      comment.style.transition = 'all 0.5s ease';
      comment.style.opacity = '1';
      comment.style.transform = 'translateX(0)';
    }, 1000 + index * 200);
  });
}

// 评论系统
function initCommentSystem() {
  const commentInput = document.getElementById('newComment');
  const commentSubmit = document.querySelector('.comment-submit');
  const commentList = document.getElementById('commentList');
  const likeButtons = document.querySelectorAll('.like-btn');
  const loadMoreBtn = document.querySelector('.load-more');
  
  // 发布评论
  commentSubmit.addEventListener('click', function() {
    const content = commentInput.value.trim();
    if (content) {
      const newComment = document.createElement('div');
      newComment.className = 'comment-item';
      newComment.innerHTML = `
        <img src="小人1-JIANG.jpg" alt="用户头像" class="comment-avatar">
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-user">我</span>
            <span class="comment-time">刚刚</span>
          </div>
          <div class="comment-text">${content}</div>
          <div class="comment-actions">
            <button class="action-btn like-btn" data-likes="0">👍 0</button>
            <button class="action-btn reply-btn">💬 回复</button>
          </div>
        </div>
      `;
      
      commentList.insertBefore(newComment, commentList.firstChild);
      commentInput.value = '';
      
      // 添加动画
      newComment.style.opacity = '0';
      newComment.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        newComment.style.transition = 'all 0.3s ease';
        newComment.style.opacity = '1';
        newComment.style.transform = 'translateX(0)';
      }, 10);
      
      // 为新评论的点赞按钮绑定事件
      bindLikeButton(newComment.querySelector('.like-btn'));
    }
  });
  
  // 按回车键发布
  commentInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      commentSubmit.click();
    }
  });
  
  // 绑定现有点赞按钮
  likeButtons.forEach(btn => bindLikeButton(btn));
  
  // 加载更多评论
  loadMoreBtn.addEventListener('click', function() {
    loadMoreBtn.textContent = '加载中...';
    
    setTimeout(() => {
      const moreComments = [
        { user: '吃货日记', text: '广州酒家的流沙包真的会流沙！超级好吃！', likes: 45 },
        { user: '旅行小确幸', text: '沙面岛的欧式建筑拍照太出片了！建议下午去光线好~', likes: 76 },
        { user: '澳门通', text: '水蟹粥一定要试！诚昌饭店的最正宗！', likes: 112 },
        { user: '美食侦探', text: '珠海横琴蚝真的很肥美！蒜蓉蒸绝了！', likes: 38 }
      ];
      
      moreComments.forEach(comment => {
        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
          <img src="${Math.floor(Math.random() * 6) + 1}.png" alt="用户头像" class="comment-avatar">
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-user">${comment.user}</span>
              <span class="comment-time">3天前</span>
            </div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-actions">
              <button class="action-btn like-btn" data-likes="${comment.likes}">👍 ${comment.likes}</button>
              <button class="action-btn reply-btn">💬 回复</button>
            </div>
          </div>
        `;
        commentList.appendChild(newComment);
        bindLikeButton(newComment.querySelector('.like-btn'));
      });
      
      loadMoreBtn.textContent = '查看更多评论 →';
    }, 800);
  });
}

// 绑定点赞按钮事件
function bindLikeButton(btn) {
  btn.addEventListener('click', function() {
    const currentLikes = parseInt(this.dataset.likes);
    const newLikes = currentLikes + 1;
    this.dataset.likes = newLikes;
    this.textContent = `👍 ${newLikes}`;
    this.style.transform = 'scale(1.2)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 200);
  });
}

// 角色点击交互
function initCharacterClick() {
  const jiangCard = document.querySelector('.character-card.jiang');
  const suCard = document.querySelector('.character-card.su');
  
  jiangCard.addEventListener('click', function() {
    // Jiang被点击时的反应
    jiangCard.style.transform = 'scale(1.15)';
    setTimeout(() => {
      jiangCard.style.transform = 'scale(1)';
    }, 300);
    
    // 显示Jiang的对话框
    const jiangBubble = document.querySelector('.jiang-bubble');
    const jiangText = jiangBubble.querySelector('.bubble-text');
    const jiangLines = [
      '嗨！我是Jiang！',
      '准备好出发了吗？',
      '广州的早茶超期待！',
      '一起去旅行吧！🎉'
    ];
    jiangText.textContent = jiangLines[Math.floor(Math.random() * jiangLines.length)];
    jiangBubble.classList.add('show');
    setTimeout(() => {
      jiangBubble.classList.remove('show');
    }, 3000);
  });
  
  suCard.addEventListener('click', function() {
    // Su被点击时的反应
    suCard.style.transform = 'scale(1.15)';
    setTimeout(() => {
      suCard.style.transform = 'scale(1)';
    }, 300);
    
    // 显示Su的对话框
    const suBubble = document.querySelector('.su-bubble');
    const suText = suBubble.querySelector('.bubble-text');
    const suLines = [
      '饿了饿了！🍜',
      '什么时候吃饭？',
      '我想吃虾饺！🦐',
      '美食在哪里？🤤'
    ];
    suText.textContent = suLines[Math.floor(Math.random() * suLines.length)];
    suBubble.classList.add('show');
    setTimeout(() => {
      suBubble.classList.remove('show');
    }, 3000);
  });
}

// 美食评价按钮
function initFoodReviewButtons() {
  const reviewButtons = document.querySelectorAll('.review-btn');
  
  reviewButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const foodName = this.closest('.food-card').querySelector('h3').textContent;
      const review = prompt(`写下你对「${foodName}」的评价：`);
      
      if (review) {
        const foodReviews = this.closest('.food-card').querySelector('.food-reviews');
        const newReview = document.createElement('div');
        newReview.className = 'review-item';
        newReview.innerHTML = `
          <span class="review-user">我</span>
          <span class="review-text">${review}</span>
        `;
        
        foodReviews.appendChild(newReview);
        
        // 添加动画
        newReview.style.opacity = '0';
        newReview.style.transform = 'translateX(-10px)';
        setTimeout(() => {
          newReview.style.transition = 'all 0.3s ease';
          newReview.style.opacity = '1';
          newReview.style.transform = 'translateX(0)';
        }, 10);
        
        alert('评价成功！感谢分享你的体验！');
      }
    });
  });
}

// 美食打卡功能
function initFoodCheckButtons() {
  const checkGoodButtons = document.querySelectorAll('.check-good');
  const checkBadButtons = document.querySelectorAll('.check-bad');
  
  checkGoodButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const foodCard = this.closest('.food-card');
      const badBtn = foodCard.querySelector('.check-bad');
      
      // 切换状态
      if (this.classList.contains('checked')) {
        this.classList.remove('checked');
      } else {
        this.classList.add('checked');
        badBtn.classList.remove('checked');
        // 添加打卡成功动画
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
        
        const foodName = foodCard.querySelector('h3').textContent;
        showCheckToast(`✅ 打卡成功！${foodName}超好吃！`);
      }
    });
  });
  
  checkBadButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const foodCard = this.closest('.food-card');
      const goodBtn = foodCard.querySelector('.check-good');
      
      // 切换状态
      if (this.classList.contains('checked')) {
        this.classList.remove('checked');
      } else {
        this.classList.add('checked');
        goodBtn.classList.remove('checked');
        // 添加打卡成功动画
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
        
        const foodName = foodCard.querySelector('h3').textContent;
        showCheckToast(`❌ 已标记「${foodName}」一般`);
      }
    });
  });
}

// 打卡提示
function showCheckToast(message) {
  const toast = document.createElement('div');
  toast.className = 'check-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

// 购物页面筛选
function initShoppingFilter() {
  const filterButtons = document.querySelectorAll('#shopping .filter-btn');
  const shoppingCards = document.querySelectorAll('.shopping-card');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      shoppingCards.forEach(card => {
        if (filter === 'all' || card.dataset.city === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 准备去吃功能
function initFoodPlanButtons() {
  const planButtons = document.querySelectorAll('.plan-btn');
  const planList = document.getElementById('foodPlanList');
  const planCount = document.getElementById('planCount');
  
  // 从本地存储加载已计划的美食
  let plannedFoods = JSON.parse(localStorage.getItem('plannedFoods')) || [];
  
  // 渲染已计划的美食
  renderPlannedFoods();
  
  planButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const foodCard = this.closest('.food-card');
      const foodName = foodCard.querySelector('h3').textContent;
      const foodImg = foodCard.querySelector('.food-img').src;
      const foodCity = foodCard.dataset.city;
      const foodRecommend = foodCard.querySelector('.food-recommend')?.textContent || '';
      
      const foodData = {
        name: foodName,
        img: foodImg,
        city: foodCity,
        recommend: foodRecommend
      };
      
      const index = plannedFoods.findIndex(f => f.name === foodName);
      
      if (index === -1) {
        // 添加到计划列表
        plannedFoods.push(foodData);
        this.classList.add('planned');
        this.textContent = '✓ 已计划';
        showToast(`✅ 已添加「${foodName}」到准备吃列表`);
      } else {
        // 从计划列表移除
        plannedFoods.splice(index, 1);
        this.classList.remove('planned');
        this.textContent = '🍽️ 准备去吃';
        showToast(`❌ 已移除「${foodName}」`);
      }
      
      // 保存到本地存储
      localStorage.setItem('plannedFoods', JSON.stringify(plannedFoods));
      
      // 更新UI
      renderPlannedFoods();
    });
  });
  
  function renderPlannedFoods() {
    // 更新计数
    planCount.textContent = plannedFoods.length;
    
    if (plannedFoods.length === 0) {
      planList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🥢</div>
          <p>还没有选择准备去吃的美食</p>
          <p class="empty-hint">点击美食卡片上的「准备去吃」按钮添加</p>
        </div>
      `;
      return;
    }
    
    planList.innerHTML = plannedFoods.map((food, index) => `
      <div class="plan-item">
        <img src="${food.img}" alt="${food.name}">
        <div class="plan-item-info">
          <h4>${food.name}</h4>
          <p>${food.recommend}</p>
        </div>
        <button class="remove-plan-btn" data-index="${index}">×</button>
      </div>
    `).join('');
    
    // 添加移除按钮事件
    document.querySelectorAll('.remove-plan-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        const removedFood = plannedFoods[index];
        
        plannedFoods.splice(index, 1);
        localStorage.setItem('plannedFoods', JSON.stringify(plannedFoods));
        renderPlannedFoods();
        
        // 更新对应的按钮状态
        const planButtons = document.querySelectorAll('.plan-btn');
        planButtons.forEach(b => {
          const foodCard = b.closest('.food-card');
          const foodName = foodCard.querySelector('h3').textContent;
          if (foodName === removedFood.name) {
            b.classList.remove('planned');
            b.textContent = '🍽️ 准备去吃';
          }
        });
        
        showToast(`❌ 已移除「${removedFood.name}」`);
      });
    });
  }
  
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'check-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  }
}

// 行程编辑功能
function initPlanEdit() {
  const addBtn = document.getElementById('addActivityBtn');
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="modalTitle">添加行程</span>
        <button class="modal-close" id="modalClose">×</button>
      </div>
      <form class="modal-form" id="activityForm">
        <div class="form-group">
          <label for="activityDay">选择日期</label>
          <select id="activityDay">
            <option value="1">D1 - 6月8日 广州</option>
            <option value="2">D2 - 6月9日 珠海→澳门</option>
            <option value="3">D3 - 6月10日 澳门→珠海→广州</option>
            <option value="4">D4 - 6月11日 广州</option>
            <option value="5">D5 - 6月12日 广州</option>
          </select>
        </div>
        <div class="form-group">
          <label for="activityTime">时间</label>
          <input type="text" id="activityTime" placeholder="如：14:30">
        </div>
        <div class="form-group">
          <label for="activityTitle">活动名称</label>
          <input type="text" id="activityTitle" placeholder="如：🍲 陶陶居晚餐">
        </div>
        <div class="form-group">
          <label for="activityDesc">活动描述</label>
          <textarea id="activityDesc" placeholder="描述一下这个活动..."></textarea>
        </div>
        <div class="form-group">
          <label for="activityTips">小贴士</label>
          <input type="text" id="activityTips" placeholder="如：🦐 必点虾饺">
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel" id="btnCancel">取消</button>
          <button type="submit" class="btn-save">保存</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  // 编辑模式标识
  let editMode = false;
  let currentActivity = null;

  // 添加行程
  addBtn.addEventListener('click', function() {
    editMode = false;
    document.getElementById('modalTitle').textContent = '添加行程';
    document.getElementById('activityForm').reset();
    modalOverlay.classList.add('show');
  });

  // 关闭弹窗
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('btnCancel').addEventListener('click', closeModal);

  function closeModal() {
    modalOverlay.classList.remove('show');
    editMode = false;
    currentActivity = null;
  }

  // 提交表单
  document.getElementById('activityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const day = document.getElementById('activityDay').value;
    const time = document.getElementById('activityTime').value;
    const title = document.getElementById('activityTitle').value;
    const desc = document.getElementById('activityDesc').value;
    const tips = document.getElementById('activityTips').value;

    if (!time || !title) {
      alert('请填写时间和活动名称');
      return;
    }

    if (editMode && currentActivity) {
      // 编辑模式
      currentActivity.querySelector('.time').textContent = time;
      currentActivity.querySelector('.activity-title').textContent = title;
      currentActivity.querySelector('.activity-desc').textContent = desc;
      currentActivity.querySelector('.activity-tips').textContent = tips;
      showToast('✏️ 行程已修改');
    } else {
      // 添加模式
      addActivity(day, time, title, desc, tips);
      showToast('➕ 行程已添加');
    }

    closeModal();
  });

  // 添加活动到指定日期
  function addActivity(day, time, title, desc, tips) {
    const dayCard = document.querySelector(`.day-card[data-day="${day}"] .day-content`);
    const activityCount = dayCard.querySelectorAll('.activity').length + 1;
    
    const newActivity = document.createElement('div');
    newActivity.className = 'activity';
    newActivity.setAttribute('data-activity', activityCount);
    newActivity.innerHTML = `
      <div class="time">${time}</div>
      <div class="activity-info">
        <div class="activity-title">${title}</div>
        <div class="activity-desc">${desc}</div>
        <div class="activity-tips">${tips}</div>
      </div>
      <div class="activity-actions">
        <button class="check-btn" data-checked="false">✅</button>
        <button class="edit-btn" data-day="${day}" data-activity="${activityCount}">✏️</button>
        <button class="delete-btn" data-day="${day}" data-activity="${activityCount}">🗑️</button>
      </div>
    `;
    
    dayCard.appendChild(newActivity);
    
    // 绑定新按钮事件
    bindActivityActions(newActivity);
  }

  // 绑定活动按钮事件
  function bindActivityActions(activity) {
    const checkBtn = activity.querySelector('.check-btn');
    const editBtn = activity.querySelector('.edit-btn');
    const deleteBtn = activity.querySelector('.delete-btn');

    checkBtn.addEventListener('click', function() {
      const isChecked = this.getAttribute('data-checked') === 'true';
      this.setAttribute('data-checked', !isChecked);
      this.style.background = !isChecked ? '#00b894' : '#f0f0f0';
    });

    editBtn.addEventListener('click', function() {
      editMode = true;
      currentActivity = activity;
      document.getElementById('modalTitle').textContent = '编辑行程';
      document.getElementById('activityDay').value = this.dataset.day;
      document.getElementById('activityTime').value = activity.querySelector('.time').textContent;
      document.getElementById('activityTitle').value = activity.querySelector('.activity-title').textContent;
      document.getElementById('activityDesc').value = activity.querySelector('.activity-desc').textContent;
      document.getElementById('activityTips').value = activity.querySelector('.activity-tips').textContent;
      modalOverlay.classList.add('show');
    });

    deleteBtn.addEventListener('click', function() {
      if (confirm('确定要删除这个行程吗？')) {
        activity.remove();
        showToast('🗑️ 行程已删除');
      }
    });
  }

  // 绑定所有现有活动的按钮事件
  document.querySelectorAll('.activity').forEach(bindActivityActions);

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'check-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  }
}

// 更新DOMContentLoaded添加新功能
document.addEventListener('DOMContentLoaded', function() {
  initTabSwitch();
  initFoodFilter();
  initShoppingFilter();
  initScrollTop();
  initCountdown();
  initDayTabs();
  initCheckButtons();
  initFavoriteButtons();
  initFoodCheckButtons();
  initFoodPlanButtons();
  initDiarySave();
  initDiaryActions();
  initCharacterMoods();
  initCommentSystem();
  initCharacterClick();
  initFoodReviewButtons();
  initPlanEdit();
  welcomeAnimation();
});

// 页面加载动画
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
