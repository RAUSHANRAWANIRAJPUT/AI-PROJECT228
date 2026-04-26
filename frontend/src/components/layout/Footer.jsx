import React from 'react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-dark text-cream py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div 
              className="font-serif text-2xl font-black text-cream flex items-center gap-2 mb-4 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <span className="w-2.5 h-2.5 bg-gold rounded-full inline-block"></span>
              Let Me Cook
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
              Your AI-powered kitchen companion. Generate recipes, learn techniques, and cook with confidence — powered by OpenRouter.
            </p>
          </div>
          
          <div>
            <h4 className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-4">Product</h4>
            <div className="flex flex-col gap-2">
              <a href="#features" className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Features</a>
              <a href="#how" className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">How it Works</a>
              <a href="#pricing" className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Pricing</a>
              <a className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Changelog</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-4">Company</h4>
            <div className="flex flex-col gap-2">
              <a className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">About</a>
              <a className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Blog</a>
              <a className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Careers</a>
              <a className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Press</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <a className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Privacy</a>
              <a className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Terms</a>
              <a className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Cookies</a>
              <a className="text-gray-400 hover:text-cream text-sm transition-colors cursor-pointer">Contact</a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-gray-600 text-xs">© 2026 Let Me Cook. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Built with OpenRouter AI · Designed with love</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
