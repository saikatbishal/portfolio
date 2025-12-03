export const ALL_LEVELS: Level[] = [
    {
        id: 1,
        title: "The Vertical Navbar",
        instruction: "The navigation links are stuck in a column. We need them in a row!",
        selector: ".navbar",
        htmlSnippet: `<nav class="navbar">\n  <a>Home</a>\n  <a>About</a>\n  <a>Contact</a>\n</nav>`,
        RenderPreview: ({ style }) => {(
        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <nav 
                    className="bg-white dark:bg-gray-900 p-4 rounded shadow-md flex gap-4 w-64"
                    style={{ flexDirection: 'column', ...style }}
                >
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-sm font-bold text-center">Home</div>
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-sm font-bold text-center">About</div>
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-sm font-bold text-center">Contact</div>
                </nav>
            </div>)
        },
        options: [
            { id: 'opt1', code: 'flex-direction: column;', style: { flexDirection: 'column' } },
            { id: 'opt2', code: 'flex-direction: row;', style: { flexDirection: 'row' } },
            { id: 'opt3', code: 'justify-content: flex-end;', style: { justifyContent: 'flex-end' } },
        ],
        correctOptionId: 'opt2'
    },
    {
        id: 2,
        title: "The Hidden Button",
        instruction: "The 'Submit' button is trapped behind the card. Bring it to the front!",
        selector: ".submit-btn",
        htmlSnippet: `<div class="card">...</div>\n<button class="submit-btn">Submit</button>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-48 h-32 bg-white dark:bg-gray-900 shadow-xl rounded-lg z-10 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-400">Card Content</span>
                </div>
                <button 
                    className="absolute bg-green-500 text-white px-6 py-2 rounded shadow-lg font-bold transform translate-y-8 translate-x-8 transition-all duration-500"
                    style={{ zIndex: 0, ...style }}
                >
                    Submit
                </button>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'opacity: 0.5;', style: { opacity: 0.5 } },
            { id: 'opt2', code: 'display: none;', style: { display: 'none' } },
            { id: 'opt3', code: 'z-index: 20;', style: { zIndex: 20 } },
        ],
        correctOptionId: 'opt3'
    },
    {
        id: 3,
        title: "The Off-Center Hero",
        instruction: "The hero text is stuck in the corner. Center it perfectly.",
        selector: ".hero-container",
        htmlSnippet: `<div class="hero-container">\n  <h1>Hello World</h1>\n</div>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div 
                    className="w-full h-full bg-white dark:bg-gray-900 rounded shadow-inner flex"
                    style={{ alignItems: 'flex-start', justifyContent: 'flex-start', ...style }}
                >
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                        Hello World
                    </h1>
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'text-align: center;', style: { textAlign: 'center' } },
            { id: 'opt2', code: 'align-items: center; justify-content: center;', style: { alignItems: 'center', justifyContent: 'center' } },
            { id: 'opt3', code: 'margin: 0 auto;', style: { margin: '0 auto' } },
        ],
        correctOptionId: 'opt2'
    },
    {
        id: 4,
        title: "The Squashed Image",
        instruction: "The profile picture is distorted. Fix the aspect ratio!",
        selector: ".profile-pic",
        htmlSnippet: `<img class="profile-pic" src="..." />`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <div className="w-32 h-32 bg-white dark:bg-gray-900 rounded-lg overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                    <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
                        alt="Profile"
                        className="w-full h-full"
                        style={{ objectFit: 'fill', ...style }}
                    />
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'object-fit: cover;', style: { objectFit: 'cover' } },
            { id: 'opt2', code: 'object-fit: contain;', style: { objectFit: 'contain' } },
            { id: 'opt3', code: 'width: auto;', style: { width: 'auto' } },
        ],
        correctOptionId: 'opt1'
    },
    {
        id: 5,
        title: "The Overflowing Text",
        instruction: "The title is too long and breaking the layout. Truncate it gracefully.",
        selector: ".card-title",
        htmlSnippet: `<h3 class="card-title">Very Long Title...</h3>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <div className="w-48 bg-white dark:bg-gray-900 p-4 rounded shadow-lg">
                    <h3 
                        className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2"
                        style={{ whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip', ...style }}
                    >
                        The Quick Brown Fox Jumps Over The Lazy Dog
                    </h3>
                    <p className="text-sm text-gray-500">Card description goes here.</p>
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'overflow: scroll;', style: { overflow: 'scroll' } },
            { id: 'opt2', code: 'word-break: break-all;', style: { wordBreak: 'break-all' } },
            { id: 'opt3', code: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;', style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } },
        ],
        correctOptionId: 'opt3'
    },
    {
        id: 6,
        title: "The Unreadable Text",
        instruction: "The warning text is invisible against the background. Make it readable!",
        selector: ".alert",
        htmlSnippet: `<div class="alert">Warning!</div>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <div className="bg-yellow-400 p-4 rounded shadow-md w-64 text-center">
                    <span 
                        className="font-bold text-lg"
                        style={{ color: 'rgba(255,255,255,0.1)', ...style }}
                    >
                        ⚠️ System Warning
                    </span>
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'color: #000000;', style: { color: '#000000' } },
            { id: 'opt2', code: 'background-color: transparent;', style: { backgroundColor: 'transparent' } },
            { id: 'opt3', code: 'opacity: 0.5;', style: { opacity: 0.5 } },
        ],
        correctOptionId: 'opt1'
    },
    {
        id: 7,
        title: "The Sticky Header",
        instruction: "The header scrolls away with the content. Make it stick to the top!",
        selector: ".header",
        htmlSnippet: `<header class="header">Logo</header>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-hidden relative">
                <div className="h-full overflow-y-auto bg-white dark:bg-gray-900 rounded shadow-inner relative">
                    <header 
                        className="bg-blue-600 text-white p-4 w-full z-10 shadow-md"
                        style={{ position: 'absolute', top: 0, ...style }}
                    >
                        <span className="font-bold">MyApp</span>
                    </header>
                    <div className="p-4 pt-20 space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'position: sticky; top: 0;', style: { position: 'sticky', top: 0 } },
            { id: 'opt2', code: 'position: fixed; bottom: 0;', style: { position: 'fixed', bottom: 0 } },
            { id: 'opt3', code: 'float: top;', style: { float: 'none' } },
        ],
        correctOptionId: 'opt1'
    },
    {
        id: 8,
        title: "The Grid Columns",
        instruction: "The items are stacked vertically. Arrange them in two equal columns.",
        selector: ".grid-container",
        htmlSnippet: `<div class="grid-container">\n  <div>1</div>\n  <div>2</div>\n</div>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <div 
                    className="grid gap-4 w-64"
                    style={{ gridTemplateColumns: '1fr', ...style }}
                >
                    <div className="bg-purple-500 text-white p-4 rounded text-center font-bold">1</div>
                    <div className="bg-pink-500 text-white p-4 rounded text-center font-bold">2</div>
                    <div className="bg-indigo-500 text-white p-4 rounded text-center font-bold">3</div>
                    <div className="bg-blue-500 text-white p-4 rounded text-center font-bold">4</div>
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'display: block;', style: { display: 'block' } },
            { id: 'opt2', code: 'grid-template-columns: 1fr 1fr;', style: { gridTemplateColumns: '1fr 1fr' } },
            { id: 'opt3', code: 'flex-direction: column;', style: { flexDirection: 'column' } },
        ],
        correctOptionId: 'opt2'
    },
    {
        id: 9,
        title: "The Centered Modal",
        instruction: "The modal is not perfectly centered. Fix its alignment.",
        selector: ".modal",
        htmlSnippet: `<div class="modal">Login</div>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 p-4 rounded-lg relative">
                <div 
                    className="absolute bg-white dark:bg-gray-900 p-6 rounded-lg shadow-2xl w-48 text-center"
                    style={{ top: '50%', left: '50%', transform: 'none', ...style }}
                >
                    <h3 className="font-bold mb-2">Login</h3>
                    <input className="w-full border rounded p-1 mb-2 text-sm" placeholder="Username" />
                    <button className="w-full bg-blue-500 text-white rounded py-1 text-sm">Enter</button>
                </div>
                {/* Center guides */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-red-500/30 pointer-events-none"></div>
                <div className="absolute top-0 left-1/2 w-px h-full bg-red-500/30 pointer-events-none"></div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'margin: auto;', style: { margin: 'auto' } },
            { id: 'opt2', code: 'transform: translate(-50%, -50%);', style: { transform: 'translate(-50%, -50%)' } },
            { id: 'opt3', code: 'align-self: center;', style: { alignSelf: 'center' } },
        ],
        correctOptionId: 'opt2'
    },
    {
        id: 10,
        title: "The Circular Avatar",
        instruction: "The avatar should be a perfect circle, not a square.",
        selector: ".avatar",
        htmlSnippet: `<img class="avatar" />`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80" 
                    alt="Avatar"
                    className="w-32 h-32 border-4 border-white dark:border-gray-700 shadow-lg"
                    style={{ borderRadius: '0', ...style }}
                />
            </div>
        ),
        options: [
            { id: 'opt1', code: 'border-radius: 50%;', style: { borderRadius: '50%' } },
            { id: 'opt2', code: 'border: circle;', style: { border: 'none' } },
            { id: 'opt3', code: 'clip-path: circle;', style: { clipPath: 'circle(50%)' } },
        ],
        correctOptionId: 'opt1'
    },
    {
        id: 11,
        title: "The Flat Button",
        instruction: "The button looks too flat. Give it some depth with a shadow.",
        selector: ".btn-primary",
        htmlSnippet: `<button class="btn-primary">Click Me</button>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <button 
                    className="bg-blue-600 text-white px-8 py-3 rounded font-bold transition-all"
                    style={{ boxShadow: 'none', ...style }}
                >
                    Click Me
                </button>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'border: 2px solid black;', style: { border: '2px solid black' } },
            { id: 'opt2', code: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);', style: { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' } },
            { id: 'opt3', code: 'background: linear-gradient(to bottom, blue, darkblue);', style: { background: 'linear-gradient(to bottom, blue, darkblue)' } },
        ],
        correctOptionId: 'opt2'
    },
    {
        id: 12,
        title: "The Ugly Link",
        instruction: "Remove the default underline from the navigation link.",
        selector: ".nav-link",
        htmlSnippet: `<a class="nav-link">Home</a>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <a 
                    href="#"
                    className="text-2xl text-blue-600 dark:text-blue-400 font-bold"
                    style={{ textDecoration: 'underline', ...style }}
                    onClick={(e) => e.preventDefault()}
                >
                    Home
                </a>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'font-style: italic;', style: { fontStyle: 'italic' } },
            { id: 'opt2', code: 'text-decoration: none;', style: { textDecoration: 'none' } },
            { id: 'opt3', code: 'text-transform: uppercase;', style: { textTransform: 'uppercase' } },
        ],
        correctOptionId: 'opt2'
    },
    {
        id: 13,
        title: "The Wrapping Flex",
        instruction: "The tags are overflowing the container. Allow them to wrap to the next line.",
        selector: ".tags",
        htmlSnippet: `<div class="tags">\n  <span>React</span>\n  <span>Vue</span>\n  ... \n</div>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <div 
                    className="bg-white dark:bg-gray-900 p-4 rounded shadow w-64 flex gap-2 overflow-hidden"
                    style={{ flexWrap: 'nowrap', ...style }}
                >
                    {['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt', 'Remix', 'Gatsby'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'flex-wrap: wrap;', style: { flexWrap: 'wrap' } },
            { id: 'opt2', code: 'overflow-x: scroll;', style: { overflowX: 'scroll' } },
            { id: 'opt3', code: 'display: block;', style: { display: 'block' } },
        ],
        correctOptionId: 'opt1'
    },
    {
        id: 14,
        title: "The Clickable Card",
        instruction: "The card is interactive but the cursor doesn't show it. Change the cursor.",
        selector: ".card",
        htmlSnippet: `<div class="card">...</div>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <div 
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-64 hover:shadow-xl transition-shadow"
                    style={{ cursor: 'default', ...style }}
                >
                    <h3 className="font-bold text-lg mb-2">Interactive Card</h3>
                    <p className="text-gray-500 text-sm">Hover over me to see the cursor change.</p>
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'pointer-events: none;', style: { pointerEvents: 'none' } },
            { id: 'opt2', code: 'user-select: none;', style: { userSelect: 'none' } },
            { id: 'opt3', code: 'cursor: pointer;', style: { cursor: 'pointer' } },
        ],
        correctOptionId: 'opt3'
    },
    {
        id: 15,
        title: "The Box Sizing",
        instruction: "Padding is increasing the element's width. Fix the box model.",
        selector: ".box",
        htmlSnippet: `<div class="box">Content</div>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center gap-4">
                <div className="w-full max-w-xs relative">
                    <div className="absolute -top-6 left-0 w-full text-center text-xs text-gray-500">Target Width (100%)</div>
                    <div className="w-full h-12 border-2 border-dashed border-gray-400 rounded"></div>
                </div>
                <div 
                    className="bg-orange-500 text-white p-4 rounded font-bold text-center w-full max-w-xs"
                    style={{ boxSizing: 'content-box', border: '4px solid white', ...style }}
                >
                    Content
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'margin: 0;', style: { margin: 0 } },
            { id: 'opt2', code: 'box-sizing: border-box;', style: { boxSizing: 'border-box' } },
            { id: 'opt3', code: 'width: auto;', style: { width: 'auto' } },
        ],
        correctOptionId: 'opt2'
    },
    {
        id: 16,
        title: "The Justified Text",
        instruction: "The text edges are ragged. Make the text align to both left and right edges.",
        selector: ".article",
        htmlSnippet: `<p class="article">Lorem ipsum...</p>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <div className="bg-white dark:bg-gray-900 p-6 rounded shadow w-64">
                    <p 
                        className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                        style={{ textAlign: 'left', ...style }}
                    >
                        Design is not just what it looks like and feels like. Design is how it works. Good design is obvious. Great design is transparent.
                    </p>
                </div>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'text-align: center;', style: { textAlign: 'center' } },
            { id: 'opt2', code: 'text-align: justify;', style: { textAlign: 'justify' } },
            { id: 'opt3', code: 'text-indent: 20px;', style: { textIndent: '20px' } },
        ],
        correctOptionId: 'opt2'
    },
    {
        id: 17,
        title: "The Clean List",
        instruction: "Remove the bullet points from the list.",
        selector: ".features",
        htmlSnippet: `<ul class="features">\n  <li>Fast</li>\n  <li>Secure</li>\n</ul>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <ul 
                    className="bg-white dark:bg-gray-900 p-6 rounded shadow w-48 pl-8"
                    style={{ listStyle: 'disc', ...style }}
                >
                    <li className="mb-2">Fast Performance</li>
                    <li className="mb-2">Secure Data</li>
                    <li className="mb-2">Cloud Sync</li>
                </ul>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'text-decoration: none;', style: { textDecoration: 'none' } },
            { id: 'opt2', code: 'display: inline;', style: { display: 'inline' } },
            { id: 'opt3', code: 'list-style: none;', style: { listStyle: 'none', paddingLeft: 0 } },
        ],
        correctOptionId: 'opt3'
    },
    {
        id: 18,
        title: "The Ghost Button",
        instruction: "Create a transparent 'ghost' button with a border.",
        selector: ".btn-ghost",
        htmlSnippet: `<button class="btn-ghost">Cancel</button>`,
        RenderPreview: ({ style }) => (
            <div className="w-full h-full bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <button 
                    className="px-6 py-2 rounded font-bold transition-all"
                    style={{ backgroundColor: 'white', color: 'black', border: 'none', ...style }}
                >
                    Cancel
                </button>
            </div>
        ),
        options: [
            { id: 'opt1', code: 'background: transparent; border: 2px solid white; color: white;', style: { background: 'transparent', border: '2px solid white', color: 'white' } },
            { id: 'opt2', code: 'opacity: 0.5;', style: { opacity: 0.5 } },
            { id: 'opt3', code: 'visibility: hidden;', style: { visibility: 'hidden' } },
        ],
        correctOptionId: 'opt1'
    }
];
