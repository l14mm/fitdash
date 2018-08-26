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

  function saveToLS2(key, value) {
    if (global.localStorage) {
      var oldLayout = getFromLS(key);
      console.log("oldLayout");
      console.log(oldLayout);
      console.log("toAdd")
      console.log(value)

      var oldLg = oldLayout.lg;
      var toAddLg = value.lg;
      var newLg = oldLg;
      if (oldLg === undefined || oldLg.length === 0) {
        console.log("no oldLg")
        newLg = value.lg;
      }
      else {
        if (toAddLg.length > 0) {
          // newLg = oldLg.map(element => {
          //   const found = toAddLg.filter(obj => obj.name !== undefined && obj.name === element.name)[0]
          //   if(found !== undefined) console.log("found " + element.name)
          //   return found !== null ? found : element;
          // });
          for (var i = 0; i < toAddLg; i++) {
            const found = oldLg.filter(obj => obj.name !== undefined && obj.name === toAddLg[i].name)[0];
            if (found) {
              oldLg[toAddLg[i].name] = toAddLg[i];
            }
            else {
              oldLg.push(toAddLg[i])
            }
          }
        }
      }
      console.log("newLg")
      console.log({ lg: newLg })
      value.lg = newLg;

      // value.lg = newLg;
      // console.log(newLg)

      global.localStorage.setItem(
        "dashboard-layout",
        JSON.stringify({
          [key]: value
        })
      );

      var newLayout = getFromLS(key);
      console.log("newLayout");
      console.log(newLayout);
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
      console.log("onlayoutchange")
      console.log(this.state.layouts)
      this.setState({ layouts });
      this.props.saveDetails(() => {
        console.log('details saved!')
      })
    }

    static get defaultProps() {
      return {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 30
      };
    }

    reloadLayout = () => {
      this.setState({ layouts: JSON.parse(JSON.stringify(getFromLS("layouts") || {})) });
    }

    resetLayout() {
      this.setState({ layouts: {} });
    }

    render() {
      return (
        <div>
          {/* <button type="button" onClick={() => this.resetLayout()}>Reset Layout</button> */}
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