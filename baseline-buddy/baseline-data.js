// Comprehensive Baseline Features Dataset for Devpost Submission
// Features curated from MDN, CanIUse, and Baseline project
const baselineFeatures = [
    // CSS Features
    {
        "name": "css-grid",
        "alias": ["grid", "css grid", "display: grid"],
        "description": "CSS Grid Layout",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "57" },
            "firefox": { "version_added": "52" },
            "safari": { "version_added": "10.1" },
            "edge": { "version_added": "16" }
        },
        "spec": {
            "name": "CSS Grid Layout Module Level 1",
            "url": "https://www.w3.org/TR/css-grid-1/"
        }
    },
    {
        "name": "css-flexbox",
        "alias": ["flexbox", "flex", "display: flex"],
        "description": "CSS Flexible Box Layout",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "29" },
            "firefox": { "version_added": "28" },
            "safari": { "version_added": "9" },
            "edge": { "version_added": "12" }
        },
        "spec": {
            "name": "CSS Flexible Box Layout Module Level 1",
            "url": "https://www.w3.org/TR/css-flexbox-1/"
        }
    },
    {
        "name": "css-custom-properties",
        "alias": ["css variables", "custom properties", "--variable", "var()"],
        "description": "CSS Custom Properties (Variables)",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "49" },
            "firefox": { "version_added": "31" },
            "safari": { "version_added": "9.1" },
            "edge": { "version_added": "15" }
        },
        "spec": {
            "name": "CSS Custom Properties for Cascading Variables",
            "url": "https://www.w3.org/TR/css-variables-1/"
        }
    },
    {
        "name": "css-container-queries",
        "alias": ["container queries", "@container", "cqw", "cqh"],
        "description": "CSS Container Queries",
        "baseline": "low",
        "browser_support": {
            "chrome": { "version_added": "105" },
            "firefox": { "version_added": "110" },
            "safari": { "version_added": "16" },
            "edge": { "version_added": "105" }
        },
        "spec": {
            "name": "CSS Container Queries",
            "url": "https://www.w3.org/TR/css-contain-3/"
        }
    },
    {
        "name": "css-cascade-layers",
        "alias": ["@layer", "cascade layers", "layer"],
        "description": "CSS Cascade Layers",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "99" },
            "firefox": { "version_added": "97" },
            "safari": { "version_added": "15.4" },
            "edge": { "version_added": "99" }
        },
        "spec": {
            "name": "CSS Cascading and Inheritance Level 5",
            "url": "https://www.w3.org/TR/css-cascade-5/"
        }
    },
    {
        "name": "css-subgrid",
        "alias": ["subgrid", "grid-template: subgrid"],
        "description": "CSS Subgrid",
        "baseline": "low",
        "browser_support": {
            "chrome": { "version_added": "117" },
            "firefox": { "version_added": "71" },
            "safari": { "version_added": "16" },
            "edge": { "version_added": "117" }
        },
        "spec": {
            "name": "CSS Grid Layout Module Level 2",
            "url": "https://www.w3.org/TR/css-grid-2/"
        }
    },
    {
        "name": "css-has",
        "alias": [":has", ":has()", "has selector", "parent selector"],
        "description": "CSS :has() relational pseudo-class",
        "baseline": "low",
        "browser_support": {
            "chrome": { "version_added": "105" },
            "firefox": { "version_added": "121" },
            "safari": { "version_added": "15.4" },
            "edge": { "version_added": "105" }
        },
        "spec": {
            "name": "Selectors Level 4",
            "url": "https://www.w3.org/TR/selectors-4/#has-pseudo"
        }
    },
    {
        "name": "css-nesting",
        "alias": ["css nesting", "& selector", "nesting"],
        "description": "CSS Nesting",
        "baseline": "low",
        "browser_support": {
            "chrome": { "version_added": "120" },
            "firefox": { "version_added": "117" },
            "safari": { "version_added": "17.2" },
            "edge": { "version_added": "120" }
        },
        "spec": {
            "name": "CSS Nesting Module",
            "url": "https://www.w3.org/TR/css-nesting-1/"
        }
    },
    {
        "name": "css-color-mix",
        "alias": ["color-mix", "color-mix()", "color mixing"],
        "description": "CSS color-mix() function",
        "baseline": "low",
        "browser_support": {
            "chrome": { "version_added": "111" },
            "firefox": { "version_added": "113" },
            "safari": { "version_added": "16.2" },
            "edge": { "version_added": "111" }
        },
        "spec": {
            "name": "CSS Color Module Level 5",
            "url": "https://www.w3.org/TR/css-color-5/"
        }
    },
    {
        "name": "css-viewport-units",
        "alias": ["vh", "vw", "vmin", "vmax", "viewport units"],
        "description": "CSS Viewport Units",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "26" },
            "firefox": { "version_added": "19" },
            "safari": { "version_added": "6.1" },
            "edge": { "version_added": "12" }
        },
        "spec": {
            "name": "CSS Values and Units Module Level 3",
            "url": "https://www.w3.org/TR/css-values-3/"
        }
    },

    // HTML Features
    {
        "name": "dialog",
        "alias": ["dialog", "<dialog>", "html dialog"],
        "description": "HTML Dialog Element",
        "baseline": "low",
        "browser_support": {
            "chrome": { "version_added": "37" },
            "firefox": { "version_added": "98" },
            "safari": { "version_added": "15.4" },
            "edge": { "version_added": "79" }
        },
        "spec": {
            "name": "HTML Standard",
            "url": "https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element"
        }
    },
    {
        "name": "details-element",
        "alias": ["details", "<details>", "<summary>"],
        "description": "HTML Details Element",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "12" },
            "firefox": { "version_added": "49" },
            "safari": { "version_added": "6" },
            "edge": { "version_added": "79" }
        },
        "spec": {
            "name": "HTML Standard",
            "url": "https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element"
        }
    },
    {
        "name": "input-types",
        "alias": ["input type", "email", "tel", "url", "search"],
        "description": "HTML Input Types",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "5" },
            "firefox": { "version_added": "4" },
            "safari": { "version_added": "10.1" },
            "edge": { "version_added": "12" }
        },
        "spec": {
            "name": "HTML Standard",
            "url": "https://html.spec.whatwg.org/multipage/input.html"
        }
    },

    // JavaScript Features
    {
        "name": "es6-modules",
        "alias": ["import", "export", "es modules", "module"],
        "description": "ECMAScript 6 Modules",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "61" },
            "firefox": { "version_added": "60" },
            "safari": { "version_added": "10.1" },
            "edge": { "version_added": "16" }
        },
        "spec": {
            "name": "ECMAScript 2015",
            "url": "https://tc39.es/ecma262/"
        }
    },
    {
        "name": "fetch-api",
        "alias": ["fetch", "fetch()", "fetch api"],
        "description": "Fetch API",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "42" },
            "firefox": { "version_added": "39" },
            "safari": { "version_added": "10.1" },
            "edge": { "version_added": "14" }
        },
        "spec": {
            "name": "Fetch Standard",
            "url": "https://fetch.spec.whatwg.org/"
        }
    },
    {
        "name": "promises",
        "alias": ["promise", "Promise", "async/await"],
        "description": "JavaScript Promises",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "32" },
            "firefox": { "version_added": "29" },
            "safari": { "version_added": "8" },
            "edge": { "version_added": "12" }
        },
        "spec": {
            "name": "ECMAScript 2015",
            "url": "https://tc39.es/ecma262/"
        }
    },
    {
        "name": "arrow-functions",
        "alias": ["arrow function", "=>", "fat arrow"],
        "description": "Arrow Functions",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "45" },
            "firefox": { "version_added": "22" },
            "safari": { "version_added": "10" },
            "edge": { "version_added": "12" }
        },
        "spec": {
            "name": "ECMAScript 2015",
            "url": "https://tc39.es/ecma262/"
        }
    },
    {
        "name": "async-await",
        "alias": ["async", "await", "async function"],
        "description": "Async/Await",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "55" },
            "firefox": { "version_added": "52" },
            "safari": { "version_added": "10.1" },
            "edge": { "version_added": "15" }
        },
        "spec": {
            "name": "ECMAScript 2017",
            "url": "https://tc39.es/ecma262/"
        }
    },

    // Modern CSS Features
    {
        "name": "backdrop-filter",
        "alias": ["backdrop-filter", "backdrop filter", "glass morphism"],
        "description": "CSS Backdrop Filter",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "76" },
            "firefox": { "version_added": "103" },
            "safari": { "version_added": "9" },
            "edge": { "version_added": "79" }
        },
        "spec": {
            "name": "Filter Effects Module Level 1",
            "url": "https://www.w3.org/TR/filter-effects-1/#BackdropFilterProperty"
        }
    },
    {
        "name": "css-clip-path",
        "alias": ["clip-path", "clipPath", "shape clipping"],
        "description": "CSS clip-path Property",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "55" },
            "firefox": { "version_added": "54" },
            "safari": { "version_added": "9.1" },
            "edge": { "version_added": "79" }
        },
        "spec": {
            "name": "CSS Masking Module Level 1",
            "url": "https://www.w3.org/TR/css-masking-1/"
        }
    },
    {
        "name": "css-scroll-snap",
        "alias": ["scroll-snap", "scroll snap", "snap scrolling"],
        "description": "CSS Scroll Snap",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "69" },
            "firefox": { "version_added": "68" },
            "safari": { "version_added": "11" },
            "edge": { "version_added": "79" }
        },
        "spec": {
            "name": "CSS Scroll Snap Module Level 1",
            "url": "https://www.w3.org/TR/css-scroll-snap-1/"
        }
    },
    {
        "name": "css-transforms",
        "alias": ["transform", "translate", "rotate", "scale"],
        "description": "CSS Transforms",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "36" },
            "firefox": { "version_added": "16" },
            "safari": { "version_added": "9" },
            "edge": { "version_added": "12" }
        },
        "spec": {
            "name": "CSS Transforms Module Level 1",
            "url": "https://www.w3.org/TR/css-transforms-1/"
        }
    },
    {
        "name": "css-transitions",
        "alias": ["transition", "css animation", "ease-in-out"],
        "description": "CSS Transitions",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "26" },
            "firefox": { "version_added": "16" },
            "safari": { "version_added": "6.1" },
            "edge": { "version_added": "12" }
        },
        "spec": {
            "name": "CSS Transitions",
            "url": "https://www.w3.org/TR/css-transitions-1/"
        }
    },
    {
        "name": "css-animations",
        "alias": ["animation", "@keyframes", "css animation"],
        "description": "CSS Animations",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "43" },
            "firefox": { "version_added": "16" },
            "safari": { "version_added": "9" },
            "edge": { "version_added": "12" }
        },
        "spec": {
            "name": "CSS Animations Level 1",
            "url": "https://www.w3.org/TR/css-animations-1/"
        }
    },

    // Advanced Features
    {
        "name": "web-components",
        "alias": ["custom elements", "web components", "shadow dom"],
        "description": "Web Components",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "67" },
            "firefox": { "version_added": "63" },
            "safari": { "version_added": "10.1" },
            "edge": { "version_added": "79" }
        },
        "spec": {
            "name": "Web Components",
            "url": "https://html.spec.whatwg.org/multipage/custom-elements.html"
        }
    },
    {
        "name": "service-workers",
        "alias": ["service worker", "pwa", "offline"],
        "description": "Service Workers",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "40" },
            "firefox": { "version_added": "44" },
            "safari": { "version_added": "11.1" },
            "edge": { "version_added": "17" }
        },
        "spec": {
            "name": "Service Workers",
            "url": "https://w3c.github.io/ServiceWorker/"
        }
    },
    {
        "name": "webgl",
        "alias": ["webgl", "3d graphics", "canvas 3d"],
        "description": "WebGL 3D Graphics",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "9" },
            "firefox": { "version_added": "4" },
            "safari": { "version_added": "5.1" },
            "edge": { "version_added": "12" }
        },
        "spec": {
            "name": "WebGL Specification",
            "url": "https://www.khronos.org/registry/webgl/specs/latest/1.0/"
        }
    },
    {
        "name": "webrtc",
        "alias": ["webrtc", "real time communication", "video call"],
        "description": "WebRTC",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "29" },
            "firefox": { "version_added": "22" },
            "safari": { "version_added": "11" },
            "edge": { "version_added": "15" }
        },
        "spec": {
            "name": "WebRTC",
            "url": "https://w3c.github.io/webrtc-pc/"
        }
    },

    // New & Emerging Features
    {
        "name": "css-anchor-positioning",
        "alias": ["anchor positioning", "position: anchor", "popover anchoring"],
        "description": "CSS Anchor Positioning",
        "baseline": false,
        "browser_support": {
            "chrome": { "version_added": null },
            "firefox": { "version_added": null },
            "safari": { "version_added": null },
            "edge": { "version_added": null }
        },
        "spec": {
            "name": "CSS Anchor Positioning",
            "url": "https://drafts.csswg.org/css-anchor-position-1/"
        }
    },
    {
        "name": "view-transitions",
        "alias": ["view transitions", "document transition", "page transition"],
        "description": "View Transitions API",
        "baseline": "low",
        "browser_support": {
            "chrome": { "version_added": "111" },
            "firefox": { "version_added": null },
            "safari": { "version_added": null },
            "edge": { "version_added": "111" }
        },
        "spec": {
            "name": "View Transitions",
            "url": "https://drafts.csswg.org/css-view-transitions-1/"
        }
    },
    {
        "name": "css-scope",
        "alias": ["@scope", "scoped styles", "scope at-rule"],
        "description": "CSS @scope Rule",
        "baseline": false,
        "browser_support": {
            "chrome": { "version_added": "118" },
            "firefox": { "version_added": null },
            "safari": { "version_added": null },
            "edge": { "version_added": "118" }
        },
        "spec": {
            "name": "CSS Scoping Module Level 1",
            "url": "https://drafts.csswg.org/css-scoping-1/"
        }
    },

    // Additional Popular Features
    {
        "name": "css-gap",
        "alias": ["gap", "grid-gap", "flex-gap"],
        "description": "CSS gap property",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "66" },
            "firefox": { "version_added": "61" },
            "safari": { "version_added": "12" },
            "edge": { "version_added": "16" }
        },
        "spec": {
            "name": "CSS Box Alignment Module Level 3",
            "url": "https://www.w3.org/TR/css-align-3/"
        }
    },
    {
        "name": "css-sticky",
        "alias": ["sticky", "position: sticky"],
        "description": "CSS position: sticky",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "56" },
            "firefox": { "version_added": "32" },
            "safari": { "version_added": "6.1" },
            "edge": { "version_added": "16" }
        },
        "spec": {
            "name": "CSS Positioned Layout Module Level 3",
            "url": "https://www.w3.org/TR/css-position-3/"
        }
    },
    {
        "name": "css-blend-modes",
        "alias": ["mix-blend-mode", "background-blend-mode"],
        "description": "CSS Blend Modes",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "41" },
            "firefox": { "version_added": "32" },
            "safari": { "version_added": "8" },
            "edge": { "version_added": "79" }
        },
        "spec": {
            "name": "Compositing and Blending Level 1",
            "url": "https://www.w3.org/TR/compositing-1/"
        }
    },
    {
        "name": "css-filters",
        "alias": ["filter", "blur", "grayscale", "brightness"],
        "description": "CSS Filter Effects",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "53" },
            "firefox": { "version_added": "35" },
            "safari": { "version_added": "9.1" },
            "edge": { "version_added": "13" }
        },
        "spec": {
            "name": "Filter Effects Module Level 1",
            "url": "https://www.w3.org/TR/filter-effects-1/"
        }
    },
    {
        "name": "css-masks",
        "alias": ["mask", "mask-image", "clip-path"],
        "description": "CSS Masking",
        "baseline": "high",
        "browser_support": {
            "chrome": { "version_added": "24" },
            "firefox": { "version_added": "53" },
            "safari": { "version_added": "9.1" },
            "edge": { "version_added": "79" }
        },
        "spec": {
            "name": "CSS Masking Module Level 1",
            "url": "https://www.w3.org/TR/css-masking-1/"
        }
    }
];