const mode = "light";

// Define colors
const colors = {
  primary: {
    main: "#441da0",     // Purple
    light: "#6b45c9",    // Light purple
    dark: "#2f1578",     // Dark purple
    contrastText: "#ffffff",
    background: 'rgba(68, 29, 160, 0.05)',
    gradient: 'linear-gradient(45deg, #441da0 30%, #6b45c9 90%)',
  },
  secondary: {
    main: "#ff9800",     // Orange
    light: "#ffb74d",    
    dark: "#f57c00",     
    contrastText: "#ffffff",
    background: '#fffaf5',
    backgroundHover: '#fff5e6',
    gradient: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
  },
  hot: {
    main: '#ff3b3b',
    light: '#ff6b6b',
    dark: '#cc2f2f',
    background: 'rgba(255, 59, 59, 0.1)',
    contrastText: "#ffffff",
  },
  success: {
    main: "#2e7d32",     // Green
    light: "#4caf50",
    dark: "#1b5e20",
    background: 'rgba(46, 125, 50, 0.05)',
  },
  error: {
    main: "#d32f2f",     // Red
    light: "#ef5350",
    dark: "#c62828",
  },
  warning: {
    main: "#fca34d",     // Orange
    light: "#fdb872",
    dark: "#f88c1a",
  },
  info: {
    main: "#0288d1",     // Blue
    light: "#03a9f4",
    dark: "#01579b",
    background: 'rgba(2, 136, 209, 0.05)',
  },
  grey: {
    50: "#f8f9fa",
    100: "#f0f1f5",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },
  search: {
    highlight: "#441da0",
    background: 'rgba(68, 29, 160, 0.05)',
    text: "#212529"
  },
  text: {
    placeholder: '#e0e0e0',
    italic: {
      color: '#9e9e9e',
      fontSize: '0.813rem'
    }
  },
  card: {
    border: '#f0f1f5',
    background: '#ffffff',
    hover: 'rgba(68, 29, 160, 0.02)'
  },
  feedback: {
    button: {
      background: 'rgba(255, 152, 0, 0.95)',
      hover: 'rgba(255, 152, 0, 1)',
      shadow: 'rgba(255, 152, 0, 0.3)',
      gradient: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
    },
    dialog: {
      background: '#ffffff',
      border: 'rgba(255, 152, 0, 0.2)',
    }
  },
  sidebar: {
    background: '#ffffff',
    hoverBg: 'rgba(68, 29, 160, 0.04)',
    activeBg: 'rgba(68, 29, 160, 0.08)',
    activeText: '#441da0',
    text: '#64748b',
    divider: '#f1f5f9',
    width: 280
  },
};

// Define shadows
const shadows = {
  custom: {
    mini: '0 1px 2px rgba(0,0,0,0.1)',
    small: '0 2px 8px rgba(0,0,0,0.1)',
    medium: '0 4px 16px rgba(187, 0, 255, 0.15)',
    large: '0 8px 30px rgba(68, 29, 160, 0.12)',
    card: '0 4px 20px -4px rgba(68, 29, 160, 0.1)',
    info: '0 2px 20px rgba(0, 0, 0, 0.05)',
    feedback: '0 8px 20px rgba(255, 152, 0, 0.25)',
    sidebar: '0px 2px 20px rgba(0, 0, 0, 0.05)',
  },
};

const defaultTheme = {
  // Breakpoints for modern responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1300,
      xl: 1500,
    },
  },

  // Configuration components
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${colors.primary.main} ${colors.grey[200]}`,
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
            backgroundColor: colors.grey[200],
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            backgroundColor: colors.primary.main,
            minHeight: 24,
            border: `2px solid ${colors.grey[200]}`,
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: colors.primary.dark,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "12px",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '3px 0',
          height: 'auto',
          '&.MuiChip-outlined': {
            borderWidth: '1.5px',
          },
          '&.MuiChip-filled': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          },
        },
        label: {
          fontSize: '0.875rem',
          fontWeight: 400,
        },
        icon: {
          marginLeft: '8px',
          marginRight: '-4px',
        },
        deleteIcon: {
          marginRight: '8px',
          marginLeft: '-4px',
          '&:hover': {
            opacity: 0.8,
          },
        },
        colorPrimary: {
          '&.MuiChip-filled': {
            backgroundColor: colors.primary.light,
            color: colors.primary.contrastText,
          },
          '&.MuiChip-outlined': {
            borderColor: colors.primary.main,
            color: colors.primary.main,
          },
        },
        colorSecondary: {
          '&.MuiChip-filled': {
            backgroundColor: colors.secondary.light,
            color: colors.secondary.contrastText,
          },
          '&.MuiChip-outlined': {
            borderColor: colors.secondary.main,
            color: colors.secondary.main,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 16px rgba(0, 0, 0, 0.03)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: 0,
          borderRadius: '10px',
          overflow: 'hidden',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          overflow: 'hidden',
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.grey[200]}`,
          padding: '12px 16px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: colors.grey[50],
          borderBottom: `1.5px solid ${colors.grey[200]}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
          '&:hover': {
            backgroundColor: colors.grey[50],
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          padding: '8px',
          borderRadius: '12px',
          // boxShadow: shadows.custom.small,
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        },
        scrollButtons: {
          '&.Mui-disabled': {
            opacity: 0.3,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: '48px',
          padding: '12px 16px',
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          color: colors.grey[600],
          '&:hover': {
            backgroundColor: colors.grey[50],
            color: colors.primary.main,
          },
          '&.Mui-selected': {
            backgroundColor: colors.primary.background,
            color: colors.primary.main,
            fontWeight: 600,
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
            marginRight: '8px',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.card.border,
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: shadows.custom.small,
          '&:hover': {
            boxShadow: shadows.custom.medium,
          }
        },
        sizeSmall: {
          width: 36,
          height: 36,
        }
      }
    }
  },

  // Modern color palette
  palette: {
    mode: mode,
    primary: colors.primary,
    secondary: colors.secondary,
    hot: colors.hot,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    grey: colors.grey,
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600],
      disabled: colors.grey[400],
    },
    background: {
      default: mode === "light" ? colors.grey[50] : colors.grey[900],
      paper: mode === "light" ? "#ffffff" : colors.grey[800],
    },
    divider: colors.grey[200],
    search: colors.search,
    feedback: colors.feedback,
  },

  customShadows: shadows.custom,

  // Fine shadows
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.05)",
    "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
    "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 16px rgba(0, 0, 0, 0.03)",
    "0px 1px 3px rgba(0, 0, 0, 0.08)",
    "0px 2px 4px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px rgba(0, 0, 0, 0.14)",
    "0px 4px 6px rgba(0, 0, 0, 0.16)",
    "0px 5px 7px rgba(0, 0, 0, 0.18)",
    "0px 6px 8px rgba(0, 0, 0, 0.20)",
    "0px 7px 9px rgba(0, 0, 0, 0.22)",
    "0px 8px 10px rgba(0, 0, 0, 0.24)",
    "0px 9px 11px rgba(0, 0, 0, 0.26)",
    "0px 10px 12px rgba(0, 0, 0, 0.28)",
    "0px 11px 13px rgba(0, 0, 0, 0.30)",
    "0px 12px 14px rgba(0, 0, 0, 0.32)",
    "0px 13px 15px rgba(0, 0, 0, 0.34)",
    "0px 14px 16px rgba(0, 0, 0, 0.36)",
    "0px 15px 17px rgba(0, 0, 0, 0.38)",
    "0px 16px 18px rgba(0, 0, 0, 0.40)",
    "0px 17px 19px rgba(0, 0, 0, 0.42)",
    "0px 18px 20px rgba(0, 0, 0, 0.44)",
    "0px 19px 21px rgba(0, 0, 0, 0.46)",
    "0px 20px 22px rgba(0, 0, 0, 0.48)",
    "0px 21px 23px rgba(0, 0, 0, 0.50)",
    "0px 22px 24px rgba(0, 0, 0, 0.52)",
    "0px 23px 25px rgba(0, 0, 0, 0.54)",
  ],

  // Modern typography
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
    },
  },

  // Consistent border radius
  shape: {
    borderRadius: 6,
  },

  zIndex: {
    card: 0,
  },

  props: {
    MuiTooltip: {
      arrow: true,
    },
    MuiAppBar: {
      color: "inherit",
    },
  },

  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: "#689f38",
        color: "#fff",
      },
    },
  },
};

export default defaultTheme;
