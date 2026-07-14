import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ style, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      width: 380,
      maxWidth: 'calc(100vw - 48px)',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      outline: 'none',
      ...style,
    }}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef(({ style, variant, ...props }, ref) => {
  const isDestructive = variant === 'destructive';
  return (
    <ToastPrimitives.Root
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
        background: 'var(--card)',
        border: '1px solid var(--card-border)',
        borderLeft: isDestructive
          ? '3px solid oklch(0.6 0.2 25)'
          : '3px solid var(--accent)',
        borderRadius: 14,
        padding: '16px 18px',
        boxShadow: '0 8px 40px oklch(0 0 0 / 0.18)',
        fontFamily: 'var(--font)',
        color: 'var(--fg)',
        backdropFilter: 'blur(12px)',
        ...style,
      }}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef(({ style, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      padding: '0 12px',
      borderRadius: 7,
      border: '1px solid var(--card-border)',
      background: 'transparent',
      color: 'var(--fg2)',
      fontSize: 12,
      fontFamily: 'var(--mono)',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'border-color .2s, color .2s',
      flexShrink: 0,
      ...style,
    }}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef(({ style, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    toast-close=""
    style={{
      position: 'absolute',
      top: 10,
      right: 10,
      width: 22,
      height: 22,
      borderRadius: 6,
      border: 'none',
      background: 'transparent',
      color: 'var(--fg3)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      lineHeight: 1,
      transition: 'color .2s, background .2s',
      flexShrink: 0,
      ...style,
    }}
    onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.background = 'var(--bg2)'; }}
    onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg3)'; e.currentTarget.style.background = 'transparent'; }}
    {...props}
  >
    ×
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef(({ style, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    style={{
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--fg)',
      letterSpacing: '-.01em',
      marginBottom: 2,
      ...style,
    }}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef(({ style, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    style={{
      fontSize: 13,
      color: 'var(--fg2)',
      lineHeight: 1.55,
      ...style,
    }}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
