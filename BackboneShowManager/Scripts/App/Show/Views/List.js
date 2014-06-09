define(["text!Show/Templates/List.html",  "Show/Views/ListItem", "css!Show/Css/List"], function (template, ListItem) {   
    return Backbone.View.extend({
        className: "show-list",
        template: Handlebars.compile(template),
        events: {
            "click .remove": "remove"
        },
        initialize: function (options) {
            options || (options = {});
            this.collection = options.collection;
        },
        render: function () {
            var json = this.collection.toJSON();
            this.$el.html(this.template());
            this.addAll();
            return this;
        },
        addAll: function () {
            this.$el.find('.models').children().remove();
            this.collection.each(this.addOne, this);
        },
        addOne: function (model) {
            var view = new ListItem({ model: model, collection: this.collection });
            this.$el.find('.models').append(view.render().el);
        }

    });
});