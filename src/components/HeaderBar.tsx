import * as React from "react";

import "../css/headerbar.css";

class HeaderBar extends React.Component {
  public render() {
    return (
      <header>
        <section id="header-actions">
          <h1>Mney</h1>
          <div id="budget-container">
            <span>Total Budget:</span>
            <p>$50.0</p>
          </div>
        </section>
      </header>
    );
  }
}

export default HeaderBar;
