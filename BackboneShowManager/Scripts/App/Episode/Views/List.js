define(["text!Episode/Templates/List.html",
    "Episode/Models/EpisodeCollection",
    "Episode/Views/ListItem", "css!Episode/Css/List"], function (template, EpisodeCollection, ListItem) {
    return Backbone.View.extend({
        className: "episode-list",
        template: Handlebars.compile(template),
        initialize: function (options) {
            options || (options = {});
            this.collection = options.collection;
            this.show = options.show;
        },
        render: function () {
            var json = (new EpisodeCollection(this.collection.byShow(this.show))).toJSON();
            this.$el.html(this.template({ show: this.show.toJSON() }));
            this.addAll();
            return this;
        },
        addAll: function () {
            this.$el.find('.models').children().remove();
            this.collection.each(this.addOne, this);
        },
        addOne: function (model) {
            var view = new ListItem({ model: model, collection: this.collection, show: this.show });
            this.$el.find('.models').append(view.render().el);
        }
    });
});