// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const featureInput = document.getElementById('feature-input');
    const checkButton = document.getElementById('check-button');
    const resultsSection = document.getElementById('results-section');
    const loadingElement = document.getElementById('loading');
    const featureNameElement = document.getElementById('feature-name');
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    const explanationElement = document.getElementById('explanation');
    const browserGrid = document.getElementById('browser-grid');
    const tipsElement = document.getElementById('tips');
    const baselineStatusElement = document.getElementById('baseline-status');
    const firstSupportedElement = document.getElementById('first-supported');
    const specificationElement = document.getElementById('specification');
    
    // App state
    let currentFeature = '';
    let searchHistory = JSON.parse(localStorage.getItem('baselineBuddyHistory')) || [];

    // Initialize app
    initApp();

    function initApp() {
        loadSearchHistory();
        setupEventListeners();
        updateSearchExamples();
    }

    function loadSearchHistory() {
        // Could display recent searches in UI
        console.log('Search history:', searchHistory);
    }

    function setupEventListeners() {
        // Example feature click handlers
        document.querySelectorAll('.example-feature').forEach(example => {
            example.addEventListener('click', function() {
                const feature = this.getAttribute('data-feature');
                featureInput.value = feature;
                checkFeatureCompatibility(feature);
            });
        });
        
        // Check button click handler
        checkButton.addEventListener('click', handleCheckFeature);
        
        // Enter key handler for input
        featureInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleCheckFeature();
            }
        });

        // Input validation and auto-suggest
        featureInput.addEventListener('input', debounce(function(e) {
            suggestFeatures(e.target.value);
        }, 300));

        // Clear results when input is cleared
        featureInput.addEventListener('blur', function() {
            if (!this.value.trim()) {
                resultsSection.style.display = 'none';
            }
        });
    }

    function handleCheckFeature() {
        const feature = featureInput.value.trim();
        if (feature) {
            // Add to search history
            if (!searchHistory.includes(feature)) {
                searchHistory.unshift(feature);
                // Keep only last 10 searches
                searchHistory = searchHistory.slice(0, 10);
                localStorage.setItem('baselineBuddyHistory', JSON.stringify(searchHistory));
            }
            
            checkFeatureCompatibility(feature);
        } else {
            showError('Please enter a web feature to check');
            featureInput.focus();
        }
    }

    // Debounce function for performance
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

    // Feature suggestion function
    function suggestFeatures(input) {
        if (input.length < 2) return;
        
        const suggestions = baselineFeatures.filter(f => 
            f.name.toLowerCase().includes(input.toLowerCase()) ||
            f.alias?.some(alias => alias.toLowerCase().includes(input.toLowerCase()))
        ).slice(0, 5);
        
        // Could implement a dropdown with suggestions here
        if (suggestions.length > 0) {
            console.log('Suggestions:', suggestions.map(s => s.name));
        }
    }

    // Update search examples randomly
    function updateSearchExamples() {
        const examples = document.querySelectorAll('.example-feature');
        const featureNames = baselineFeatures.map(f => f.name).filter(name => name.length < 20);
        
        examples.forEach((example, index) => {
            const randomFeature = featureNames[Math.floor(Math.random() * featureNames.length)];
            if (randomFeature) {
                example.textContent = randomFeature;
                example.setAttribute('data-feature', randomFeature);
            }
        });
    }

    // Main function to check feature compatibility
    async function checkFeatureCompatibility(feature) {
        currentFeature = feature;
        
        // Show loading state
        showLoading(true);
        hideResults();
        
        try {
            // Find feature in baseline data
            const featureData = findFeatureInBaseline(feature);
            
            // Generate AI explanation
            const aiResponse = await generateAIExplanation(feature, featureData);
            
            // Update UI with results
            updateUI(feature, featureData, aiResponse);
            
            // Track analytics (optional)
            trackFeatureSearch(feature, featureData, aiResponse.status);
            
        } catch (error) {
            console.error('Error checking feature:', error);
            showError('Error checking feature compatibility. Please try again.');
        } finally {
            showLoading(false);
        }
    }

    function showLoading(show) {
        loadingElement.style.display = show ? 'block' : 'none';
        checkButton.disabled = show;
        checkButton.textContent = show ? 'Checking...' : 'Check Compatibility';
    }

    function hideResults() {
        resultsSection.style.display = 'none';
    }

    function showResults() {
        resultsSection.style.display = 'block';
        // Smooth scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function showError(message) {
        // You could implement a toast notification system here
        alert(message);
    }

    // Find feature in baseline data with improved matching
    function findFeatureInBaseline(feature) {
        const normalizedFeature = feature.toLowerCase().trim();
        
        // Scoring system for better matching
        const featuresWithScores = baselineFeatures.map(featureData => {
            let score = 0;
            
            // Exact name match
            if (featureData.name.toLowerCase() === normalizedFeature) {
                score += 100;
            }
            
            // Exact alias match
            if (featureData.alias?.some(alias => alias.toLowerCase() === normalizedFeature)) {
                score += 90;
            }
            
            // Partial name match
            if (featureData.name.toLowerCase().includes(normalizedFeature)) {
                score += Math.min(50, (normalizedFeature.length / featureData.name.length) * 50);
            }
            
            // Partial alias match
            if (featureData.alias?.some(alias => alias.toLowerCase().includes(normalizedFeature))) {
                score += Math.min(40, (normalizedFeature.length / featureData.name.length) * 40);
            }
            
            // Description match
            if (featureData.description?.toLowerCase().includes(normalizedFeature)) {
                score += 10;
            }
            
            return { featureData, score };
        });
        
        // Find best match
        const bestMatch = featuresWithScores
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)[0];
        
        return bestMatch ? bestMatch.featureData : null;
    }
    
    // Enhanced AI explanation with better error handling
    async function generateAIExplanation(feature, featureData) {
        // For Netlify deployment - use mock data only
        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
        return generateMockAIExplanation(feature, featureData);
    }
    
    // Enhanced AI response parsing
    function parseAIResponse(aiText, featureData) {
        const isSafe = featureData && (featureData.baseline === 'high' || featureData.baseline === 'low');
        const status = isSafe ? 'safe' : featureData ? 'unsafe' : 'unknown';
        
        // Clean up AI response
        const cleanExplanation = aiText
            .replace(/\n+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        return {
            explanation: cleanExplanation,
            status: status,
            tips: extractTipsFromAIResponse(cleanExplanation, featureData),
            timestamp: new Date().toISOString()
        };
    }
    
    // Improved tips extraction
    function extractTipsFromAIResponse(aiText, featureData) {
        const tipPatterns = [
            /(?:tip|recommendation|suggestion)[:\s]+([^.!?]+[.!?])/gi,
            /(?:you should|consider|try)\s+([^.!?]+[.!?])/gi,
            /(?:alternative|fallback)[:\s]+([^.!?]+[.!?])/gi
        ];
        
        for (const pattern of tipPatterns) {
            const matches = aiText.match(pattern);
            if (matches && matches.length > 0) {
                return matches[0].replace(/(tip|recommendation|suggestion)[:\s]+/i, '').trim();
            }
        }
        
        // Fallback tips based on feature status
        if (!featureData) {
            return 'Check MDN Web Docs for documentation and correct feature names.';
        }
        
        switch (featureData.baseline) {
            case 'high':
                return 'This feature is production-ready. Test across browsers for edge cases.';
            case 'low':
                return 'Use progressive enhancement and provide fallbacks for wider compatibility.';
            default:
                return 'Implement feature detection and consider polyfills for better support.';
        }
    }
    
    // Enhanced mock AI explanation
    function generateMockAIExplanation(feature, featureData, context = '') {
        const contextMessage = context ? `${context} ` : '';
        
        if (!featureData) {
            return {
                explanation: `${contextMessage}❓ The feature "${feature}" wasn't found in our database. This could mean it's very new, non-standard, or spelled differently. Check the official documentation for accurate information.`,
                status: 'unknown',
                tips: 'Verify the feature name on MDN Web Docs. Some features have multiple names or syntax variations.',
                isFallback: true
            };
        }
        
        const isBaseline = featureData.baseline === 'high' || featureData.baseline === 'low';
        const status = isBaseline ? 'safe' : 'unsafe';
        
        let explanation, tips;
        
        if (status === 'safe') {
            explanation = `${contextMessage}✅ **${feature}** is Baseline-safe! This feature has widespread support across modern browsers and is stable for production use. You can implement it with confidence knowing most users will have full compatibility.`;
            
            tips = `While widely supported, always test in your target browsers. For critical functionality, consider basic fallbacks for very old browser versions.`;
        } else {
            explanation = `${contextMessage}⚠️ **${feature}** is not yet fully Baseline-safe. Browser support may be limited or inconsistent, so exercise caution in production environments. Some users might experience issues or need fallbacks.`;
            
            tips = `Use feature detection (@supports for CSS) and provide alternative implementations. Monitor browser support updates as this feature evolves.`;
        }
        
        return {
            explanation,
            status,
            tips,
            isFallback: true
        };
    }
    
    // Enhanced UI update with animations
    function updateUI(feature, featureData, aiResponse) {
        // Update feature name with highlighting for fallback
        featureNameElement.textContent = featureData ? featureData.name : feature;
        if (aiResponse.isFallback) {
            featureNameElement.innerHTML += ' <span style="color: var(--gray); font-size: 0.8em;">(offline)</span>';
        }
        
        // Update status badge with enhanced styling
        updateStatusBadge(aiResponse.status);
        
        // Update explanation with formatted text
        explanationElement.innerHTML = formatExplanation(aiResponse.explanation);
        
        // Update tips
        tipsElement.innerHTML = `<h3>Tips & Alternatives</h3><p>${aiResponse.tips}</p>`;
        
        // Update browser support
        updateBrowserSupport(featureData);
        
        // Update baseline info
        updateBaselineInfo(featureData);
        
        // Show results with animation
        setTimeout(() => {
            showResults();
        }, 100);
    }

    function updateStatusBadge(status) {
        statusBadge.className = 'status-badge';
        statusText.textContent = status === 'safe' ? 'Baseline Safe' : 
                               status === 'unsafe' ? 'Not Baseline Safe' : 'Unknown';
        
        switch (status) {
            case 'safe':
                statusBadge.classList.add('safe');
                break;
            case 'unsafe':
                statusBadge.classList.add('unsafe');
                break;
            default:
                statusBadge.classList.add('partial');
        }
    }

    function formatExplanation(text) {
        // Simple formatting for emphasis
        return `<p>${text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/(✅|⚠️|❓)/g, '<span class="emoji">$1</span>')
        }</p>`;
    }
    
    // Enhanced browser support with more info
    function updateBrowserSupport(featureData) {
        browserGrid.innerHTML = '';
        
        if (!featureData) {
            browserGrid.innerHTML = '<p class="no-data">No browser support data available for this feature.</p>';
            return;
        }
        
        const browsers = [
            { name: 'Chrome', icon: 'chrome', versions: featureData.browser_support?.chrome },
            { name: 'Firefox', icon: 'firefox', versions: featureData.browser_support?.firefox },
            { name: 'Safari', icon: 'safari', versions: featureData.browser_support?.safari },
            { name: 'Edge', icon: 'edge', versions: featureData.browser_support?.edge }
        ];
        
        browsers.forEach(browser => {
            const browserItem = createBrowserItem(browser);
            browserGrid.appendChild(browserItem);
        });
    }

    function createBrowserItem(browser) {
        const browserItem = document.createElement('div');
        browserItem.className = 'browser-item';
        
        const browserIcon = document.createElement('div');
        browserIcon.className = `browser-icon ${browser.icon}`;
        browserIcon.textContent = browser.name.charAt(0);
        browserIcon.title = `${browser.name} support`;
        
        const browserName = document.createElement('div');
        browserName.className = 'browser-name';
        browserName.textContent = browser.name;
        
        const browserVersion = document.createElement('div');
        
        if (browser.versions && browser.versions.version_added) {
            const isSupported = browser.versions.version_added !== false;
            browserVersion.className = `browser-version ${isSupported ? 'supported' : 'unsupported'}`;
            browserVersion.textContent = isSupported ? 
                `v${browser.versions.version_added}+` : 
                'Not supported';
            browserVersion.title = isSupported ? 
                `Supported since ${browser.name} ${browser.versions.version_added}` :
                `Not supported in ${browser.name}`;
        } else {
            browserVersion.className = 'browser-version unknown';
            browserVersion.textContent = 'Unknown';
            browserVersion.title = 'Support information unavailable';
        }
        
        browserItem.appendChild(browserIcon);
        browserItem.appendChild(browserName);
        browserItem.appendChild(browserVersion);
        
        return browserItem;
    }
    
    // Enhanced baseline information
    function updateBaselineInfo(featureData) {
        if (!featureData) {
            baselineStatusElement.textContent = 'Not found';
            firstSupportedElement.textContent = 'Unknown';
            specificationElement.innerHTML = 'Unknown';
            return;
        }
        
        // Baseline status with descriptions
        if (featureData.baseline === 'high') {
            baselineStatusElement.textContent = 'Widely available';
            baselineStatusElement.title = 'Supported in all major browsers for at least 2 major versions';
        } else if (featureData.baseline === 'low') {
            baselineStatusElement.textContent = 'Newly available';
            baselineStatusElement.title = 'Recently available across major browsers';
        } else {
            baselineStatusElement.textContent = 'Not baseline';
            baselineStatusElement.title = 'Not yet widely supported across major browsers';
        }
        
        // First supported version
        const firstSupport = getFirstSupportedVersion(featureData);
        firstSupportedElement.textContent = firstSupport || 'Unknown';
        firstSupportedElement.title = firstSupport ? `First available in ${firstSupport}` : 'First support unknown';
        
        // Specification
        if (featureData.spec?.url) {
            specificationElement.innerHTML = `<a href="${featureData.spec.url}" target="_blank" rel="noopener noreferrer">${featureData.spec.name || 'View specification'}</a>`;
        } else {
            specificationElement.textContent = 'Not specified';
        }
    }

    function getFirstSupportedVersion(featureData) {
        const versions = [];
        
        ['chrome', 'firefox', 'safari', 'edge'].forEach(browser => {
            const version = featureData.browser_support?.[browser]?.version_added;
            if (version && version !== false) {
                versions.push({
                    browser: browser.charAt(0).toUpperCase() + browser.slice(1),
                    version: version,
                    numeric: parseFloat(version) || 0
                });
            }
        });
        
        if (versions.length === 0) return null;
        
        // Sort by numeric version and return the earliest
        versions.sort((a, b) => a.numeric - b.numeric);
        return `${versions[0].browser} ${versions[0].version}`;
    }

    // Analytics tracking (optional)
    function trackFeatureSearch(feature, featureData, status) {
        // Basic analytics - you can integrate with Google Analytics, etc.
        const event = {
            feature: feature,
            found: !!featureData,
            status: status,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        console.log('Feature search:', event);
        
        // Example: Send to analytics endpoint
        // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) });
    }
});

// Add some CSS for new elements
const additionalStyles = `
.emoji {
    font-size: 1.2em;
    margin-right: 0.2em;
}
.no-data {
    text-align: center;
    color: var(--gray);
    font-style: italic;
}
.browser-version.unknown {
    color: var(--gray);
}
.browser-item:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);