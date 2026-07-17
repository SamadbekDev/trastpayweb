// Top navigation bar — 64px, true black, sticky.
function NavBar({ tab, setTab, onGetStarted, onLogin }) {
  const [open, setOpen] = React.useState(false);
  const tabs = ["Personal", "Business", "Company"];
  return (
    <nav className="nav">
      <div className="inner">
        <Logo onClick={() => setTab("Personal")} />
        <div className="nav-center">
          {tabs.map(t => (
            <button key={t}
              className={"nav-tab" + (tab === t ? " active" : "")}
              onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="nav-right">
          <button className="nav-lang">
            <Icon name="globe" size={18} /> EN
          </button>
          <button className="nav-link" onClick={onLogin}>Log in</button>
          <Button variant="primary" onClick={onGetStarted}>Get started</Button>
          <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </nav>
  );
}
Object.assign(window, { NavBar });
