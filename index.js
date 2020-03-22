class MustacheLayout {
  constructor() {
    if (!MustacheLayout.instance) {
      MustacheLayout.instance = this;
    }
    return MustacheLayout.instance;
  }

  /**
     * Build one or many html `layers` with optional data for each layer
     *
     * Returns Promise of HTML String of all the combined/builded layers
     *
     * `layers`:
     *
     *  - `layers.name` name, path/name to the view
     *  - `layers.data?` [require]: properties must be named as in the view.
     *
     *
     * @param {Object} layers
     * @param {string} layers.name
     * @param {{}} [layers.data]
     *
     */
  async build(...layers) {
    let previousLayer = '';
    let combinedLayout = '';
    for (const layer of layers) {
      const { name: layerName } = layer;
      let { data: layerData } = layer;
      if (!layerData) layerData = {};
      layerData.child = previousLayer;
      combinedLayout = await this.renderHtml(layerName, layerData);
      previousLayer = combinedLayout;
    }
    return combinedLayout;
  }

  renderHtml(viewName, data) {
    return new Promise((resolve, reject) => {
      this.app.render(viewName, data, (error, html) => {
        if (error) reject(error);
        resolve(html);
      });
    });
  }


  /**
     *
     * @param {Object} expressApp express app instance
     */
  setExpressApp(expressApp) {
    this.app = expressApp;
  }
}

module.exports = new MustacheLayout();
