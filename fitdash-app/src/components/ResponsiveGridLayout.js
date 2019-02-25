import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

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

class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  }

  onLayoutChange(layout, layouts) {
    this.saveToLS("layouts", layouts);
    this.setState({ layouts: originalLayouts })
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  reloadLayout = () => {
    this.setState({ layouts: getFromLS("layouts") });
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "dashboard-layout",
        JSON.stringify({
          [key]: value
        })
      );
    }

    this.props.saveDetails(() => {
      console.log('details saved!')
    })
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
          rowHeight={34.85}
          compactType={this.props.compactType}
        >
          {this.props.children}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default ResponsiveLocalStorageLayout;