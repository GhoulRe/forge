import { navigate } from '../router.js';

// A real <a href>: middle-click and "open in new tab" work, normal clicks navigate without a reload.
export default function Link({ to, replace = false, onClick = null, children = null, ...rest }) {
  return (
    <a href={to} {...rest} onClick={e => {
      if (onClick) onClick(e);
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault(); navigate(to, replace);
    }}>{children}</a>
  );
}
