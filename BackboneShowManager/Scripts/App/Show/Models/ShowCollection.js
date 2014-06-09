define(["Show/Models/Show"], function (ShowModel) {
    return Backbone.Collection.extend({
        model: ShowModel,
        localStorage: new Backbone.LocalStorage("Show-Collection"),
        destroy: function (model) {
            this.remove(model);
            model.destroy();
        }
    });
});