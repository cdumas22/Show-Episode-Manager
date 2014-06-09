define(["Episode/Models/Episode"], function (EpisodeModel) {
    return Backbone.Collection.extend({
        model: EpisodeModel,
        localStorage: new Backbone.LocalStorage("Episode-Collection"),
        initialize: function(){

        },
        byShow: function (show) {
            return this.filter(function (model) { return model.get('show').id === show.get('id'); });
        },
        destroy: function (model) {
            this.remove(model);
            model.destroy();
        },
        removeByShow: function (show) {
            this.each(function (model) {
                if (model.get("show").id === show.get("id")) {
                    this.destroy(model);
                }
            }, this);
        }
    });
});