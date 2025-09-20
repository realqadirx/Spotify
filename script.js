// Spotify Clone - JavaScript Functionality
// Music Player, Navigation, and Interactive Features

class SpotifyClone {
    constructor() {
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 213; // 3:33 in seconds
        this.volume = 0.7;
        this.currentTrack = {
            title: "Daylight",
            artist: "David Kushner",
            duration: "03:33"
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updatePlayerDisplay();
        this.setupProgressBar();
        this.setupVolumeControl();
        this.setupNavigation();
        this.setupCardInteractions();
        this.testPlayPauseButton();
    }

    setupEventListeners() {
        // Play/Pause button - use multiple selectors for reliability
        const playButton = document.querySelector('.player-control-icon[alt="Play/Pause"]') || 
                          document.querySelector('.player-control-icon[src*="player_icon3"]');
        if (playButton) {
            playButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.togglePlayPause();
            });
            console.log('Play/Pause button event listener added');
        } else {
            console.error('Play/Pause button not found');
        }

        // Previous/Next buttons
        const prevButton = document.querySelector('.player-control-icon[alt="Previous track"]');
        const nextButton = document.querySelector('.player-control-icon[alt="Next track"]');
        
        if (prevButton) prevButton.addEventListener('click', () => this.previousTrack());
        if (nextButton) nextButton.addEventListener('click', () => this.nextTrack());

        // Progress bar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('input', (e) => this.seekTo(e.target.value));
        }

        // Volume control
        const volumeSlider = document.querySelector('.controls-range');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value / 100));
        }

        // Navigation buttons
        const navOptions = document.querySelectorAll('.nav-option');
        navOptions.forEach(option => {
            option.addEventListener('click', () => this.handleNavigation(option));
        });

        // Sticky nav buttons
        const backButton = document.querySelector('.sticky-nav-icons img[alt="Go back"]');
        const forwardButton = document.querySelector('.sticky-nav-icons img[alt="Go forward"]');
        
        if (backButton) backButton.addEventListener('click', () => this.goBack());
        if (forwardButton) forwardButton.addEventListener('click', () => this.goForward());

        // Badge buttons
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            badge.addEventListener('click', () => this.handleBadgeClick(badge));
        });
    }

    setupProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.max = this.duration;
            progressBar.value = this.currentTime;
        }
    }

    setupVolumeControl() {
        const volumeSlider = document.querySelector('.controls-range');
        if (volumeSlider) {
            volumeSlider.value = this.volume * 100;
        }
    }

    setupNavigation() {
        // Add active state to current navigation item
        const homeOption = document.querySelector('.nav-option[style*="opacity: 1"]');
        if (homeOption) {
            homeOption.classList.add('active');
        }
        
        // Prevent default link behavior
        const navLinks = document.querySelectorAll('.nav-option a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
    }

    setupCardInteractions() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => this.playCardTrack(card));
            card.addEventListener('mouseenter', () => this.showPlayButton(card));
            card.addEventListener('mouseleave', () => this.hidePlayButton(card));
        });
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const playButton = document.querySelector('.player-control-icon[alt="Play/Pause"]') || 
                          document.querySelector('.player-control-icon[alt="Play"]') ||
                          document.querySelector('.player-control-icon[alt="Pause"]') ||
                          document.querySelector('.player-control-icon[src*="player_icon3"]') ||
                          document.querySelector('.player-control-icon[src*="player_icon4"]');
        
        if (playButton) {
            if (this.isPlaying) {
                // Switch to pause icon
                playButton.src = './Assets/player_icon4.png';
                playButton.alt = 'Pause';
                playButton.style.opacity = '1';
                playButton.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    playButton.style.transform = 'scale(1)';
                }, 150);
                this.startProgress();
                console.log('🎵 Music started playing');
            } else {
                // Switch to play icon
                playButton.src = './Assets/player_icon3.png';
                playButton.alt = 'Play';
                playButton.style.opacity = '1';
                playButton.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    playButton.style.transform = 'scale(1)';
                }, 150);
                this.stopProgress();
                console.log('⏸️ Music paused');
            }
        } else {
            console.error('❌ Play/Pause button not found for toggle');
        }
    }

    startProgress() {
        this.progressInterval = setInterval(() => {
            if (this.currentTime < this.duration) {
                this.currentTime++;
                this.updateProgressBar();
                this.updateTimeDisplay();
            } else {
                this.nextTrack();
            }
        }, 1000);
    }

    stopProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }

    updateProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.value = this.currentTime;
        }
    }

    updateTimeDisplay() {
        const currentTimeElement = document.querySelector('.curt-time');
        if (currentTimeElement) {
            currentTimeElement.textContent = this.formatTime(this.currentTime);
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    seekTo(value) {
        this.currentTime = parseInt(value);
        this.updateTimeDisplay();
        this.updateProgressBar();
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        // In a real app, this would control actual audio volume
        console.log(`Volume set to: ${Math.round(this.volume * 100)}%`);
    }

    previousTrack() {
        this.currentTime = 0;
        this.updateProgressBar();
        this.updateTimeDisplay();
        console.log('Previous track');
    }

    nextTrack() {
        this.currentTime = 0;
        this.updateProgressBar();
        this.updateTimeDisplay();
        console.log('Next track');
    }

    updatePlayerDisplay() {
        const titleElement = document.querySelector('.para1');
        const artistElement = document.querySelector('.para2');
        
        if (titleElement) titleElement.textContent = this.currentTrack.title;
        if (artistElement) artistElement.textContent = this.currentTrack.artist;
    }

    handleNavigation(option) {
        // Remove active class from all nav options
        document.querySelectorAll('.nav-option').forEach(opt => {
            opt.style.opacity = '0.7';
            opt.classList.remove('active');
        });

        // Add active class to clicked option
        option.style.opacity = '1';
        option.classList.add('active');

        const linkElement = option.querySelector('a');
        const linkText = linkElement ? linkElement.textContent : 'Unknown';
        console.log(`Navigating to: ${linkText}`);
    }

    goBack() {
        console.log('Going back');
        // Add visual feedback
        const backButton = document.querySelector('.sticky-nav-icons img[alt="Go back"]');
        if (backButton) {
            backButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                backButton.style.transform = 'scale(1)';
            }, 150);
        }
        // In a real app, this would use browser history or app state
    }

    goForward() {
        console.log('Going forward');
        // Add visual feedback
        const forwardButton = document.querySelector('.sticky-nav-icons img[alt="Go forward"]');
        if (forwardButton) {
            forwardButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                forwardButton.style.transform = 'scale(1)';
            }, 150);
        }
        // In a real app, this would use browser history or app state
    }

    handleBadgeClick(badge) {
        const badgeText = badge.textContent.trim();
        console.log(`Badge clicked: ${badgeText}`);
        
        if (badgeText.includes('create playlist')) {
            this.showCreatePlaylistModal();
        } else if (badgeText.includes('Browse podcasts')) {
            this.showPodcastBrowser();
        } else if (badgeText.includes('Install App')) {
            this.showInstallPrompt();
        }
    }

    playCardTrack(card) {
        const title = card.querySelector('.card-title').textContent;
        const artist = card.querySelector('.card-text').textContent;
        
        this.currentTrack = {
            title: title,
            artist: artist,
            duration: "03:33"
        };
        
        this.updatePlayerDisplay();
        this.togglePlayPause();
        
        console.log(`Playing: ${title} by ${artist}`);
    }

    showPlayButton(card) {
        // Add play button overlay on hover
        const playButton = document.createElement('div');
        playButton.className = 'play-overlay';
        playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        playButton.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.7);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: white;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        card.style.position = 'relative';
        card.appendChild(playButton);
        
        setTimeout(() => {
            playButton.style.opacity = '1';
        }, 100);
    }

    hidePlayButton(card) {
        const playOverlay = card.querySelector('.play-overlay');
        if (playOverlay) {
            playOverlay.style.opacity = '0';
            setTimeout(() => {
                if (playOverlay.parentNode) {
                    playOverlay.parentNode.removeChild(playOverlay);
                }
            }, 300);
        }
    }

    showCreatePlaylistModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Create Playlist</h3>
                <input type="text" placeholder="Playlist name" class="playlist-input">
                <div class="modal-buttons">
                    <button class="btn-cancel">Cancel</button>
                    <button class="btn-create">Create</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const cancelBtn = modal.querySelector('.btn-cancel');
        const createBtn = modal.querySelector('.btn-create');
        const input = modal.querySelector('.playlist-input');
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            });
        }
        
        if (createBtn && input) {
            createBtn.addEventListener('click', () => {
                const playlistName = input.value;
                if (playlistName.trim()) {
                    console.log(`Creating playlist: ${playlistName}`);
                    if (modal.parentNode) {
                        document.body.removeChild(modal);
                    }
                } else {
                    input.focus();
                    input.style.borderColor = '#e22134';
                    setTimeout(() => {
                        input.style.borderColor = '#333';
                    }, 2000);
                }
            });
        }
        
        // Close modal on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape' && modal.parentNode) {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    showPodcastBrowser() {
        console.log('Opening podcast browser...');
        // In a real app, this would navigate to podcasts section
    }

    showInstallPrompt() {
        console.log('Showing install prompt...');
        // In a real app, this would show PWA install prompt
    }

    testPlayPauseButton() {
        // Test if play/pause button is properly set up
        const playButton = document.querySelector('.player-control-icon[alt="Play/Pause"]') || 
                          document.querySelector('.player-control-icon[src*="player_icon3"]');
        
        if (playButton) {
            console.log('✅ Play/Pause button found and ready');
            console.log('Current button state:', {
                src: playButton.src,
                alt: playButton.alt,
                opacity: playButton.style.opacity
            });
        } else {
            console.error('❌ Play/Pause button not found');
        }
    }
}

// Initialize the Spotify Clone when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const spotifyClone = new SpotifyClone();
    
    // Add some additional interactive features
    setupAdditionalFeatures();
});

function setupAdditionalFeatures() {
    // Add smooth scrolling to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.scrollBehavior = 'smooth';
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const playButton = document.querySelector('.player-control-icon[alt="Play/Pause"]') || 
                              document.querySelector('.player-control-icon[alt="Play"]') ||
                              document.querySelector('.player-control-icon[alt="Pause"]') ||
                              document.querySelector('.player-control-icon[src*="player_icon3"]') ||
                              document.querySelector('.player-control-icon[src*="player_icon4"]');
            if (playButton) {
                playButton.click();
                console.log('🎹 Space bar pressed - toggling play/pause');
            }
        }
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Enhanced sticky navigation functionality
    setupStickyNavEnhancements();
}

function setupStickyNavEnhancements() {
    const stickyNav = document.querySelector('.sticky-nav');
    const mainContent = document.querySelector('.main-content');
    
    if (stickyNav && mainContent) {
        let lastScrollTop = 0;
        
        mainContent.addEventListener('scroll', () => {
            const scrollTop = mainContent.scrollTop;
            
            // Add shadow when scrolled
            if (scrollTop > 10) {
                stickyNav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                stickyNav.style.boxShadow = 'none';
            }
            
            // Hide/show navigation based on scroll direction (optional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - could hide nav
                // stickyNav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show nav
                stickyNav.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Add scroll to top functionality for back button
        const backButton = document.querySelector('.sticky-nav-icons img[alt="Go back"]');
        if (backButton) {
            backButton.addEventListener('click', () => {
                mainContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}
