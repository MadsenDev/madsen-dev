'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAccessibility, keyboardNavigation } from '@/hooks/useAccessibility';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

interface AccessibleNavigationProps {
  items: NavigationItem[];
  currentPath?: string;
}

export default function AccessibleNavigation({ items, currentPath }: AccessibleNavigationProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const navRef = useRef<HTMLElement>(null);
  const { announce } = useAccessibility();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        announce(`Collapsed ${itemId}`);
      } else {
        newSet.add(itemId);
        announce(`Expanded ${itemId}`);
      }
      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: NavigationItem, index: number) => {
    const navItems = navRef.current?.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLElement>;
    
    if (navItems) {
      const newIndex = keyboardNavigation.handleArrowKeys(e, Array.from(navItems), index);
      setFocusedIndex(newIndex);
    }

    keyboardNavigation.handleActivation(e, () => {
      if (item.children) {
        toggleExpanded(item.id);
      } else {
        // Navigate to item
        window.location.href = item.href;
        announce(`Navigated to ${item.label}`);
      }
    });
  };

  const renderNavigationItem = (item: NavigationItem, index: number, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isCurrent = currentPath === item.href;

    return (
      <li key={item.id} role="none">
        <motion.a
          href={item.href}
          role="menuitem"
          tabIndex={focusedIndex === index ? 0 : -1}
          onKeyDown={(e) => handleKeyDown(e, item, index)}
          onFocus={() => setFocusedIndex(index)}
          className={`
            flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300
            ${isCurrent 
              ? 'bg-purple-600 text-white' 
              : 'text-gray-300 hover:bg-slate-800 hover:text-white'
            }
            ${level > 0 ? 'ml-4' : ''}
          `}
          aria-current={isCurrent ? 'page' : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-haspopup={hasChildren ? 'menu' : undefined}
        >
          <span>{item.label}</span>
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </motion.div>
          )}
        </motion.a>

        {/* Submenu */}
        {hasChildren && (
          <motion.ul
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
            role="menu"
            aria-label={`${item.label} submenu`}
          >
            {item.children.map((child, childIndex) => 
              renderNavigationItem(child, index + childIndex + 1, level + 1)
            )}
          </motion.ul>
        )}
      </li>
    );
  };

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
      className="space-y-2"
    >
      <ul role="menubar" className="space-y-1">
        {items.map((item, index) => renderNavigationItem(item, index))}
      </ul>
    </nav>
  );
}
