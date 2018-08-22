import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("dashboard-layout")) || {};
    } catch (e) {
      /* Ignore */
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "dashboard-layout",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(getFromLS("layouts") || {}))
    };
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  reloadLayout = () => {
    this.setState({layouts: JSON.parse(JSON.stringify(getFromLS("layouts") || {}))});
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={() => this.resetLayout()}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {this.props.children}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default ResponsiveLocalStorageLayout;