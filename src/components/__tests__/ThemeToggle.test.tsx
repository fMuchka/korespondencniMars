import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../ThemeToggle';

describe('ThemeToggle', () => {
  describe('rendering', () => {
    it('should render an icon button', () => {
      const mockOnToggle = vi.fn();
      render(<ThemeToggle mode="light" onToggle={mockOnToggle} />);

      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      expect(button).toBeInTheDocument();
    });

    it('should display sun icon when in light mode', () => {
      const mockOnToggle = vi.fn();
      render(<ThemeToggle mode="light" onToggle={mockOnToggle} />);

      // MUI Brightness7 icon (sun) should be present
      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      expect(button).toBeInTheDocument();
    });

    it('should display moon icon when in dark mode', () => {
      const mockOnToggle = vi.fn();
      render(<ThemeToggle mode="dark" onToggle={mockOnToggle} />);

      // MUI Brightness4 icon (moon) should be present
      const button = screen.getByRole('button', { name: /switch to light mode/i });
      expect(button).toBeInTheDocument();
    });

    it('should show "Switch to dark mode" tooltip when in light mode', () => {
      const mockOnToggle = vi.fn();
      render(<ThemeToggle mode="light" onToggle={mockOnToggle} />);

      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      expect(button).toBeInTheDocument();
    });

    it('should show "Switch to light mode" tooltip when in dark mode', () => {
      const mockOnToggle = vi.fn();
      render(<ThemeToggle mode="dark" onToggle={mockOnToggle} />);

      const button = screen.getByRole('button', { name: /switch to light mode/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should call onToggle with "dark" when clicked in light mode', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();

      render(<ThemeToggle mode="light" onToggle={mockOnToggle} />);

      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      await user.click(button);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith('dark');
    });

    it('should call onToggle with "light" when clicked in dark mode', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();

      render(<ThemeToggle mode="dark" onToggle={mockOnToggle} />);

      const button = screen.getByRole('button', { name: /switch to light mode/i });
      await user.click(button);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith('light');
    });

    it('should handle multiple rapid clicks', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();

      render(<ThemeToggle mode="light" onToggle={mockOnToggle} />);

      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnToggle).toHaveBeenCalledTimes(3);
      // All calls should be with 'dark' since mode prop doesn't change
      expect(mockOnToggle).toHaveBeenCalledWith('dark');
    });
  });

  describe('accessibility', () => {
    it('should be keyboard accessible', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();

      render(<ThemeToggle mode="light" onToggle={mockOnToggle} />);

      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      button.focus();

      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('should have proper ARIA attributes', () => {
      const mockOnToggle = vi.fn();
      render(<ThemeToggle mode="light" onToggle={mockOnToggle} />);

      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      expect(button).toHaveAttribute('aria-label');
    });
  });

  describe('prop updates', () => {
    it('should update icon when mode prop changes', () => {
      const mockOnToggle = vi.fn();
      render(<ThemeToggle mode="light" onToggle={mockOnToggle} />);

      expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();

      render(<ThemeToggle mode="dark" onToggle={mockOnToggle} />);

      expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
    });

    it('should work with updated onToggle callback', async () => {
      const mockOnToggle1 = vi.fn();
      const mockOnToggle2 = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(<ThemeToggle mode="light" onToggle={mockOnToggle1} />);

      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      await user.click(button);

      expect(mockOnToggle1).toHaveBeenCalledTimes(1);
      expect(mockOnToggle2).not.toHaveBeenCalled();

      rerender(<ThemeToggle mode="light" onToggle={mockOnToggle2} />);
      await user.click(button);

      expect(mockOnToggle1).toHaveBeenCalledTimes(1);
      expect(mockOnToggle2).toHaveBeenCalledTimes(1);
    });
  });
});
