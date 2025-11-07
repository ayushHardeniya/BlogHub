// Enhanced BlogHub Application
class BlogHub {
    constructor() {
        this.currentUser = null;
        this.posts = [];
        this.users = [];
        
        // DOM elements
        this.loginModal = document.getElementById('loginModal');
        this.loginForm = document.getElementById('loginForm');
        this.blogForm = document.getElementById('blogForm');
        this.feedContainer = document.getElementById('feedContainer');
        this.userPostsContainer = document.getElementById('userPostsContainer');
        this.searchInput = document.getElementById('searchInput');
        this.categoryFilter = document.getElementById('categoryFilter');
        
        this.init();
    }

    init() {
        this.initSampleData();
        this.loadData();
        this.setupEventListeners();
        this.checkUser();
    }

    // Initialize sample data for demonstration
    initSampleData() {
        const sampleUsers = [
            {
                username: 'john_doe',
                name: 'John Doe',
                bio: 'Tech enthusiast and software developer',
                avatar: 'https://i.pravatar.cc/150?img=1'
            },
            {
                username: 'sarah_writer',
                name: 'Sarah Wilson',
                bio: 'Professional writer and blogger',
                avatar: 'https://i.pravatar.cc/150?img=2'
            },
            {
                username: 'mike_traveler',
                name: 'Mike Johnson',
                bio: 'Travel blogger and photographer',
                avatar: 'https://i.pravatar.cc/150?img=3'
            },
            {
                username: 'emma_chef',
                name: 'Emma Rodriguez',
                bio: 'Food lover and recipe creator',
                avatar: 'https://i.pravatar.cc/150?img=4'
            }
        ];

        const samplePosts = [
            {
                id: Date.now() - 86400000,
                title: 'The Future of Artificial Intelligence in Web Development',
                content: `Artificial Intelligence is revolutionizing how we approach web development. From automated code generation to intelligent debugging, AI tools are becoming indispensable for modern developers.

In this comprehensive guide, we'll explore how AI is changing the landscape of web development and what it means for developers in 2024 and beyond.

Key areas where AI is making an impact:
• Code Generation and Completion
• Automated Testing and Bug Detection  
• User Experience Optimization
• Content Generation and Management

The integration of AI tools like GitHub Copilot, ChatGPT, and various code completion engines has already transformed how we write code. These tools don't just save time; they help us learn new patterns and best practices.

As we look toward the future, we can expect even more sophisticated AI integration in our development workflows.`,
                category: 'Technology',
                author: 'john_doe',
                date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                likes: 24,
                readingTime: 5
            },
            {
                id: Date.now() - 172800000,
                title: 'Building Better Habits: A 30-Day Challenge',
                content: `Creating lasting habits is one of the most powerful ways to transform your life. After years of struggling with consistency, I discovered a framework that actually works.

The key isn't motivation – it's systems. Here's what I learned during my 30-day habit-building challenge:

**Start Small**: Begin with habits so small they seem almost silly. Want to read more? Start with one page per day.

**Stack Habits**: Attach new habits to existing ones. After I pour my morning coffee, I write in my journal.

**Environment Design**: Make good habits obvious and bad habits invisible. I keep my guitar next to my desk and my phone in another room.

**Track Progress**: Use a simple habit tracker. Seeing the chain of successful days motivates you to keep going.

The compound effect of small, consistent actions is remarkable. After 30 days, these tiny changes created meaningful improvements in my productivity, health, and overall well-being.`,
                category: 'Lifestyle',
                author: 'sarah_writer',
                date: new Date(Date.now() - 172800000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                likes: 18,
                readingTime: 4
            },
            {
                id: Date.now() - 259200000,
                title: 'Hidden Gems of Southeast Asia: A Photographer\'s Journey',
                content: `Southeast Asia offers some of the world's most breathtaking landscapes and vibrant cultures. During my three-month photography expedition, I discovered places that don't make it into typical travel guides.

**Sekumpul Falls, Bali**: Beyond the crowded beaches lies this magnificent seven-tiered waterfall hidden in lush jungle. The hike is challenging but absolutely worth it.

**Kampot, Cambodia**: This riverside town offers stunning sunset views and the world's best pepper farms. The French colonial architecture creates perfect photo opportunities.

**El Nido Backcountry, Philippines**: While most tourists stick to the main island hopping tours, the backcountry offers pristine beaches with zero crowds.

**Ban Gioc Falls, Vietnam**: Straddling the border with China, these terraced waterfalls are among Asia's largest and most beautiful.

Each location taught me something new about composition, lighting, and the importance of patience in photography. The best shots often came from waiting for the perfect moment rather than rushing to the next destination.

Travel photography isn't just about capturing beautiful places – it's about telling stories and preserving moments that might otherwise be forgotten.`,
                category: 'Travel',
                author: 'mike_traveler',
                date: new Date(Date.now() - 259200000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                likes: 31,
                readingTime: 6
            },
            {
                id: Date.now() - 345600000,
                title: 'The Science of Sourdough: Perfect Bread Every Time',
                content: `Baking sourdough bread is part art, part science. After hundreds of loaves and countless failures, I've finally cracked the code to consistently perfect sourdough.

**The Starter**: Your sourdough starter is a living ecosystem. Feed it regularly with equal parts flour and water by weight. A healthy starter should double in size within 4-8 hours of feeding.

**Hydration Matters**: Higher hydration (75-80%) creates those beautiful open crumbs and crispy crusts. Start lower and work your way up as your technique improves.

**Temperature Control**: Warmer temperatures speed up fermentation. In summer, I reduce yeast and extend fermentation time. Winter requires the opposite approach.

**The Stretch and Fold**: Instead of traditional kneading, perform 4-6 sets of stretch and folds during the first 2-3 hours. This develops gluten while maintaining the dough's structure.

**Timing is Everything**: Bulk fermentation is done when the dough has increased by 50-70% and feels jiggly. Under-fermented dough won't rise properly; over-fermented dough will collapse.

The most important lesson? Take detailed notes. Record times, temperatures, and results. This data will help you adapt to your specific environment and ingredients.

Sourdough taught me patience, precision, and the joy of creating something nourishing with my own hands.`,
                category: 'Food',
                author: 'emma_chef',
                date: new Date(Date.now() - 345600000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                likes: 15,
                readingTime: 4
            }
        ];

        // Only add sample data if not already present
        if (!localStorage.getItem('blogHubUsers')) {
            this.users = sampleUsers;
            this.saveUsers();
        }
        
        if (!localStorage.getItem('blogHubPosts')) {
            this.posts = samplePosts;
            this.savePosts();
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Login form
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Blog form
        this.blogForm.addEventListener('submit', (e) => this.handlePostSubmit(e));
        
        // Search and filter
        this.searchInput.addEventListener('input', () => this.renderFeed());
        this.categoryFilter.addEventListener('change', () => this.renderFeed());
        
        // Save draft button
        document.querySelector('.save-draft-btn').addEventListener('click', () => this.saveDraft());
    }

    // Check if user is logged in
    checkUser() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUserDisplay();
            this.loginModal.style.display = 'none';
            this.renderFeed();
            this.renderUserPosts();
        } else {
            this.showLoginModal();
        }
    }

    // Show login modal
    showLoginModal() {
        this.loginModal.style.display = 'flex';
    }

    // Handle user login
    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();
        
        if (!username) {
            this.showMessage('Please enter a username', 'error');
            return;
        }

        // Check if user exists, if not create new user
        let user = this.users.find(u => u.username === username);
        if (!user) {
            user = {
                username: username,
                name: username.charAt(0).toUpperCase() + username.slice(1).replace('_', ' '),
                bio: 'New blogger on BlogHub',
                avatar: `https://i.pravatar.cc/150?u=${username}`
            };
            this.users.push(user);
            this.saveUsers();
        }

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.updateUserDisplay();
        this.loginModal.style.display = 'none';
        this.renderFeed();
        this.renderUserPosts();
    }

    // Update user display
    updateUserDisplay() {
        document.getElementById('currentUserName').textContent = this.currentUser.name;
        document.getElementById('profileName').textContent = this.currentUser.name;
        document.getElementById('profileBio').textContent = this.currentUser.bio;
        document.getElementById('profileAvatar').src = this.currentUser.avatar;
        
        // Update stats
        const userPosts = this.posts.filter(post => post.author === this.currentUser.username);
        const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);
        
        document.getElementById('userPostCount').textContent = userPosts.length;
        document.getElementById('userLikesCount').textContent = totalLikes;
    }

    // Handle post submission
    handlePostSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const category = document.getElementById('category').value;
        
        if (!title || !content || !category) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const newPost = {
            id: Date.now(),
            title: title,
            content: content,
            category: category,
            author: this.currentUser.username,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            likes: 0,
            readingTime: this.calculateReadingTime(content)
        };

        this.posts.unshift(newPost);
        this.savePosts();
        this.renderFeed();
        this.renderUserPosts();
        this.updateUserDisplay();
        
        // Clear form and show success
        this.blogForm.reset();
        this.showMessage('Story published successfully!', 'success');
        this.showSection('feed');
    }

    // Calculate reading time
    calculateReadingTime(content) {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    }

    // Save draft
    saveDraft() {
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const category = document.getElementById('category').value;
        
        if (!title && !content) {
            this.showMessage('Nothing to save', 'error');
            return;
        }

        const draft = { title, content, category, timestamp: Date.now() };
        localStorage.setItem('blogDraft', JSON.stringify(draft));
        this.showMessage('Draft saved successfully!', 'success');
    }

    // Load draft
    loadDraft() {
        const draft = localStorage.getItem('blogDraft');
        if (draft) {
            const { title, content, category } = JSON.parse(draft);
            document.getElementById('title').value = title || '';
            document.getElementById('content').value = content || '';
            document.getElementById('category').value = category || '';
        }
    }

    // Render feed
    renderFeed() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedCategory = this.categoryFilter.value;
        
        let filteredPosts = this.posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                                post.content.toLowerCase().includes(searchTerm) ||
                                this.getUserName(post.author).toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        this.feedContainer.innerHTML = '';

        if (filteredPosts.length === 0) {
            this.feedContainer.innerHTML = `
                <div class="no-posts">
                    <i class="fas fa-search"></i>
                    <h3>No stories found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        filteredPosts.forEach(post => {
            const postElement = this.createPostElement(post, true);
            this.feedContainer.appendChild(postElement);
        });
    }

    // Render user posts
    renderUserPosts() {
        const userPosts = this.posts.filter(post => post.author === this.currentUser.username);
        this.userPostsContainer.innerHTML = '';

        if (userPosts.length === 0) {
            this.userPostsContainer.innerHTML = `
                <div class="no-posts">
                    <i class="fas fa-pen"></i>
                    <h3>No stories yet</h3>
                    <p>Start writing your first story to see it here!</p>
                </div>
            `;
            return;
        }

        userPosts.forEach(post => {
            const postElement = this.createPostElement(post, false);
            this.userPostsContainer.appendChild(postElement);
        });
    }

    // Create post element
    createPostElement(post, showLike = true) {
        const author = this.users.find(u => u.username === post.author);
        const isCurrentUser = this.currentUser && post.author === this.currentUser.username;
        
        const postDiv = document.createElement('div');
        postDiv.className = 'post-card';
        postDiv.setAttribute('data-post-id', post.id);

        const contentPreview = post.content.length > 300 
            ? post.content.substring(0, 300) + '...' 
            : post.content;

        postDiv.innerHTML = `
            <div class="post-header">
                <img src="${author?.avatar || 'https://i.pravatar.cc/150?u=' + post.author}" 
                     alt="${author?.name || post.author}" class="author-avatar">
                <div class="author-info">
                    <div class="author-name">${author?.name || post.author}</div>
                    <div class="post-meta">
                        <span>${post.date}</span>
                        <span class="category-tag">${post.category}</span>
                        <span class="reading-time">${post.readingTime} min read</span>
                    </div>
                </div>
            </div>
            <h3 class="post-title">${this.escapeHtml(post.title)}</h3>
            <div class="post-content">${this.escapeHtml(contentPreview).replace(/\n/g, '<br>')}</div>
            <div class="post-actions">
                <div class="post-interactions">
                    ${showLike ? `
                        <button class="like-btn" onclick="blogHub.toggleLike(${post.id})">
                            <i class="fas fa-heart"></i>
                            <span>${post.likes}</span>
                        </button>
                    ` : ''}
                </div>
                <div class="post-controls">
                    ${isCurrentUser ? `
                        <button class="delete-btn" onclick="blogHub.deletePost(${post.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        return postDiv;
    }

    // Toggle like
    toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            // Simple like system - in a real app, you'd track who liked what
            post.likes += 1;
            this.savePosts();
            this.renderFeed();
            
            // Update profile stats if it's current user's post
            if (post.author === this.currentUser.username) {
                this.updateUserDisplay();
            }
        }
    }

    // Delete post
    deletePost(postId) {
        if (confirm('Are you sure you want to delete this story?')) {
            this.posts = this.posts.filter(post => post.id !== postId);
            this.savePosts();
            this.renderFeed();
            this.renderUserPosts();
            this.updateUserDisplay();
            this.showMessage('Story deleted successfully!', 'success');
        }
    }

    // Get user name
    getUserName(username) {
        const user = this.users.find(u => u.username === username);
        return user?.name || username;
    }

    // Show section
    showSection(sectionName) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionName + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Activate corresponding nav button
        const navButtons = document.querySelectorAll('.nav-btn');
        const buttonTexts = ['Feed', 'Write', 'Profile'];
        const buttonIndex = ['feed', 'write', 'profile'].indexOf(sectionName);
        if (buttonIndex !== -1 && navButtons[buttonIndex]) {
            navButtons[buttonIndex].classList.add('active');
        }
        
        // Load draft when entering write section
        if (sectionName === 'write') {
            setTimeout(() => this.loadDraft(), 100);
        }
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Storage functions
    savePosts() {
        localStorage.setItem('blogHubPosts', JSON.stringify(this.posts));
    }

    loadPosts() {
        const savedPosts = localStorage.getItem('blogHubPosts');
        if (savedPosts) {
            this.posts = JSON.parse(savedPosts);
        }
    }

    saveUsers() {
        localStorage.setItem('blogHubUsers', JSON.stringify(this.users));
    }

    loadUsers() {
        const savedUsers = localStorage.getItem('blogHubUsers');
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        }
    }

    loadData() {
        this.loadUsers();
        this.loadPosts();
    }
}

// Global functions for onclick handlers
window.showSection = function(section) {
    blogHub.showSection(section);
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.blogHub = new BlogHub();
});
