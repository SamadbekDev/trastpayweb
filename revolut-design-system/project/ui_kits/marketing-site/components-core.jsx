// Core helpers: Icon, Button, Logo
function Icon({ name, size = 24, color, style, className }) {
  return (
    <svg className={"ds-icon " + (className || "")}
         style={{ width: size, height: size, color, ...style }}
         aria-hidden="true">
      <use href={"#icon-" + name}></use>
    </svg>
  );
}

function Button({ variant = "primary", size = "md", children, onClick, style }) {
  const cls = "btn btn-" + variant + (size === "sm" ? " btn-pill-sm" : "");
  return <button className={cls} onClick={onClick} style={style}>{children}</button>;
}

function Logo({ onClick }) {
  return (
    <span className="nav-logo" onClick={onClick}>
      <img src={(window.__resources && window.__resources.logoWordmark) || "../../assets/logo-wordmark.svg"} alt="Revolut" />
    </span>
  );
}

Object.assign(window, { Icon, Button, Logo });
