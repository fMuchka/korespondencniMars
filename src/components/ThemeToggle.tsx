import { ThemeMode } from '../utils/themeSettings';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { Button } from '@mui/material';

export interface ThemeToggleProps {
  /**
   * The current theme mode (e.g., 'light', 'dark').
   */
  mode: ThemeMode;

  /**
   *  Callback function invoked when the theme toggle is triggered.
   *    The function receives the new theme mode as a parameter.
   */
  onToggle: (mode: ThemeMode) => void;
}

/**
 * A button component that toggles between light and dark theme modes.
 *
 * @component
 * @param props - The component props {@link ThemeToggleProps}
 *
 * @returns  A button that displays a sun icon in light mode or moon icon in dark mode
 *
 * @example
 * ```tsx
 * <ThemeToggle
 *   mode="dark"
 *   onToggle={(newTheme) => console.log('Theme changed to:', newTheme)}
 * />
 * ```
 */
export const ThemeToggle = (props: ThemeToggleProps) => {
  const { mode, onToggle } = props;

  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={() => onToggle(mode === 'light' ? 'dark' : 'light')}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {mode === 'dark' ? <Brightness4 /> : <Brightness7 />}
    </Button>
  );
};

export default ThemeToggle;
