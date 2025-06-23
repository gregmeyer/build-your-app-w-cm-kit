'use client';

import { useState } from 'react';
import Lightbox from '@/components/ui/Lightbox';

export default function ComponentsDocs() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const openLightbox = (title: string, content: React.ReactNode) => {
    setLightboxContent({ title, content });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxContent(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Library</h1>
        <p className="text-xl text-gray-600">Reusable UI components for CM Kit applications. Click on examples to view them in detail.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Basic Components</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Button</h3>
                <div 
                  className="space-y-2 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  onClick={() => openLightbox('Button Examples', (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Button Variants</h4>
                        <div className="space-y-3">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Primary Button</button>
                          <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors">Secondary Button</button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Danger Button</button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Success Button</button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Button Sizes</h4>
                        <div className="space-y-3">
                          <button className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Small</button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Medium</button>
                          <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Large</button>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Usage Example:</h5>
                        <code className="text-sm text-gray-700 block">
                          {`<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
  Click me
</button>`}
                        </code>
                      </div>
                    </div>
                  ))}
                >
                  <div className="space-y-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Primary Button</button>
                    <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors">Secondary Button</button>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Click to view more examples →</div>
                </div>
                <code className="text-sm text-gray-600 mt-2 block">&lt;button className=&quot;px-4 py-2 bg-blue-600 text-white rounded-md&quot;&gt;</code>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Card</h3>
                <div 
                  className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  onClick={() => openLightbox('Card Examples', (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Card Variants</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                            <h4 className="font-semibold text-gray-900">Basic Card</h4>
                            <p className="text-gray-600 mt-1">Simple card with content</p>
                          </div>
                          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4">
                            <h4 className="font-semibold text-gray-900">Elevated Card</h4>
                            <p className="text-gray-600 mt-1">Card with more shadow</p>
                          </div>
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                            <h4 className="font-semibold">Gradient Card</h4>
                            <p className="mt-1 opacity-90">Card with gradient background</p>
                          </div>
                          <div className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-4">
                            <h4 className="font-semibold text-gray-900">Bordered Card</h4>
                            <p className="text-gray-600 mt-1">Card with colored border</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Usage Example:</h5>
                        <code className="text-sm text-gray-700 block">
                          {`<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
  <h4 className="font-semibold text-gray-900">Card Title</h4>
  <p className="text-gray-600 mt-1">Card content goes here</p>
</div>`}
                        </code>
                      </div>
                    </div>
                  ))}
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                    <h4 className="font-semibold text-gray-900">Card Title</h4>
                    <p className="text-gray-600 mt-1">Card content goes here</p>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Click to view more examples →</div>
                </div>
                <code className="text-sm text-gray-600 mt-2 block">&lt;div className=&quot;bg-white rounded-lg border border-gray-200 shadow-sm p-4&quot;&gt;</code>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Badge</h3>
                <div 
                  className="space-y-2 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  onClick={() => openLightbox('Badge Examples', (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Badge Colors</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Blue</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Green</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Red</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Yellow</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Purple</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Gray</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Badge Sizes</h4>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Small</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Medium</span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">Large</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Usage Example:</h5>
                        <code className="text-sm text-gray-700 block">
                          {`<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  Blue Badge
</span>`}
                        </code>
                      </div>
                    </div>
                  ))}
                >
                  <div className="space-y-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Blue Badge</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Green Badge</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Click to view more examples →</div>
                </div>
                <code className="text-sm text-gray-600 mt-2 block">&lt;span className=&quot;inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800&quot;&gt;</code>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Layout Components</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Navigation</h3>
                <div 
                  className="bg-gray-50 rounded p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => openLightbox('Navigation Examples', (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Navigation Styles</h4>
                        <div className="space-y-4">
                          <div className="bg-white rounded p-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Horizontal Navigation</h5>
                            <div className="flex space-x-4 text-sm">
                              <a href="#" className="text-blue-600 hover:text-blue-800">Home</a>
                              <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
                              <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
                            </div>
                          </div>
                          <div className="bg-white rounded p-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Vertical Navigation</h5>
                            <div className="flex flex-col space-y-2 text-sm">
                              <a href="#" className="text-blue-600 hover:text-blue-800">Dashboard</a>
                              <a href="#" className="text-gray-600 hover:text-gray-800">Profile</a>
                              <a href="#" className="text-gray-600 hover:text-gray-800">Settings</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Usage Example:</h5>
                        <code className="text-sm text-gray-700 block">
                          {`<nav className="flex space-x-4">
  <a href="#" className="text-blue-600 hover:text-blue-800">Home</a>
  <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
</nav>`}
                        </code>
                      </div>
                    </div>
                  ))}
                >
                  <div className="flex space-x-4 text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-800">Home</a>
                    <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
                    <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Click to view more examples →</div>
                </div>
                <code className="text-sm text-gray-600 mt-2 block">&lt;nav className=&quot;flex space-x-4&quot;&gt;</code>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Grid Layout</h3>
                <div 
                  className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  onClick={() => openLightbox('Grid Layout Examples', (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Grid Configurations</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">2 Columns</h5>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 1</div>
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 2</div>
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 3</div>
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 4</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">3 Columns</h5>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 1</div>
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 2</div>
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 3</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Responsive Grid</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 1</div>
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 2</div>
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 3</div>
                              <div className="bg-gray-200 rounded p-2 text-center text-xs">Item 4</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Usage Example:</h5>
                        <code className="text-sm text-gray-700 block">
                          {`<div className="grid grid-cols-2 gap-2">
  <div className="bg-gray-200 rounded p-2">Grid Item 1</div>
  <div className="bg-gray-200 rounded p-2">Grid Item 2</div>
</div>`}
                        </code>
                      </div>
                    </div>
                  ))}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-200 rounded p-2 text-center text-xs">Grid Item 1</div>
                    <div className="bg-gray-200 rounded p-2 text-center text-xs">Grid Item 2</div>
                    <div className="bg-gray-200 rounded p-2 text-center text-xs">Grid Item 3</div>
                    <div className="bg-gray-200 rounded p-2 text-center text-xs">Grid Item 4</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Click to view more examples →</div>
                </div>
                <code className="text-sm text-gray-600 mt-2 block">&lt;div className=&quot;grid grid-cols-2 gap-2&quot;&gt;</code>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Container</h3>
                <div 
                  className="bg-gray-50 rounded p-3 border cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => openLightbox('Container Examples', (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Container Types</h4>
                        <div className="space-y-4">
                          <div className="bg-white rounded p-3 border">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Default Container</h5>
                            <p className="text-sm text-gray-600">Container with max-width and centered content</p>
                          </div>
                          <div className="bg-white rounded p-3 border-2 border-blue-200">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Bordered Container</h5>
                            <p className="text-sm text-gray-600">Container with colored border</p>
                          </div>
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded p-3 border">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Gradient Container</h5>
                            <p className="text-sm text-gray-600">Container with gradient background</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Usage Example:</h5>
                        <code className="text-sm text-gray-700 block">
                          {`<div className="max-w-7xl mx-auto px-4">
  <div className="bg-white rounded p-3 border">
    Container content goes here
  </div>
</div>`}
                        </code>
                      </div>
                    </div>
                  ))}
                >
                  <p className="text-sm text-gray-600">Container with max-width and centered content</p>
                  <div className="text-sm text-gray-500 mt-2">Click to view more examples →</div>
                </div>
                <code className="text-sm text-gray-600 mt-2 block">&lt;div className=&quot;max-w-7xl mx-auto px-4&quot;&gt;</code>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Footer</h3>
                <div 
                  className="bg-gray-900 text-gray-300 rounded p-3 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => openLightbox('Footer Examples', (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Footer Features</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Brand section with logo and description</li>
                          <li>• Legal links (Privacy, Security, Terms)</li>
                          <li>• Resource links (Documentation, Issues, GitHub)</li>
                          <li>• Copyright and license information</li>
                          <li>• CM Kit attribution with GitHub link</li>
                          <li>• Responsive design with grid layout</li>
                          <li>• Dark theme with hover effects</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Footer Sections</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Brand Section</h5>
                            <p className="text-sm text-gray-600">Logo, description, and social links</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Legal Links</h5>
                            <p className="text-sm text-gray-600">Privacy, Security, Terms of Service</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Resources</h5>
                            <p className="text-sm text-gray-600">Documentation, Issues, GitHub</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Copyright</h5>
                            <p className="text-sm text-gray-600">Copyright notice and CM Kit attribution</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Usage Example:</h5>
                        <code className="text-sm text-gray-700 block">
                          {`import Footer from '@/components/ui/Footer';

// In your layout
<Footer />

// The footer automatically includes:
// - Current year copyright
// - CM Kit attribution with GitHub link
// - All legal and resource links`}
                        </code>
                      </div>
                    </div>
                  ))}
                >
                  <div className="text-sm">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">☕</span>
                      <span className="font-semibold text-white">CM Kit</span>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>Privacy • Security • Terms</div>
                      <div>© 2025 Greg Meyer • Built with CM Kit</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Click to view documentation →</div>
                </div>
                <code className="text-sm text-gray-600 mt-2 block">&lt;Footer /&gt;</code>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modal Components</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Lightbox</h3>
            <p className="text-gray-600 mb-3">A modal overlay component for displaying content in a focused view.</p>
            <div 
              className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors border border-gray-200"
              onClick={() => openLightbox('Lightbox Component', (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Modal overlay with backdrop blur</li>
                      <li>• Keyboard support (ESC to close)</li>
                      <li>• Body scroll lock when open</li>
                      <li>• Responsive design</li>
                      <li>• Accessible with ARIA labels</li>
                      <li>• Customizable title and content</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Props</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div><code className="bg-gray-200 px-1 rounded">isOpen: boolean</code> - Controls modal visibility</div>
                        <div><code className="bg-gray-200 px-1 rounded">onClose: () => void</code> - Close handler function</div>
                        <div><code className="bg-gray-200 px-1 rounded">children: React.ReactNode</code> - Modal content</div>
                        <div><code className="bg-gray-200 px-1 rounded">title?: string</code> - Optional modal title</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Usage Example:</h5>
                    <code className="text-sm text-gray-700 block">
                      {`import Lightbox from '@/components/ui/Lightbox';

const [isOpen, setIsOpen] = useState(false);

// Basic usage
<Lightbox isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Your content here
</Lightbox>

// With title
<Lightbox 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Example Modal"
>
  Your content here
</Lightbox>`}
                    </code>
                  </div>
                </div>
              ))}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Lightbox Modal</h4>
                  <p className="text-sm text-gray-600">Click to see detailed documentation and examples</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">Click to view documentation →</div>
            </div>
            <code className="text-sm text-gray-600 mt-2 block">{"<Lightbox isOpen={true} onClose={() => {}}>"}</code>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Usage Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Styling</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Use Tailwind CSS classes for consistent styling</li>
              <li>• Follow the established color palette</li>
              <li>• Maintain consistent spacing and typography</li>
              <li>• Use semantic HTML elements</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Accessibility</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Include proper ARIA labels</li>
              <li>• Ensure keyboard navigation</li>
              <li>• Maintain color contrast ratios</li>
              <li>• Use semantic HTML structure</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-yellow-900 mb-2">💡 Component Development</h2>
        <p className="text-yellow-800 mb-3">When creating new components:</p>
        <ul className="text-yellow-800 space-y-1">
          <li>• Place components in <code className="bg-yellow-100 px-1 rounded">src/components/</code></li>
          <li>• Use TypeScript for type safety</li>
          <li>• Include JSDoc comments for documentation</li>
          <li>• Write tests for component functionality</li>
          <li>• Follow the established naming conventions</li>
        </ul>
      </div>

      {/* Lightbox Modal */}
      <Lightbox 
        isOpen={lightboxOpen} 
        onClose={closeLightbox}
        title={lightboxContent?.title}
      >
        {lightboxContent?.content}
      </Lightbox>
    </div>
  );
}