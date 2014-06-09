define(["text!Episode/Templates/ListItem.html"], function (Template) {
    return Backbone.View.extend({
        tagName: "tr",
        template: Handlebars.compile(Template),
        events: {
            "click a.remove": "destroy"
        },
        initialize: function (options) {
            options || (options = {});
            this.model = options.model;
            this.show = options.show;
            this.collection = options.collection;
        },
        render: function () {
            this.$el.html(this.template({ episode: this.model.toJSON(), show: this.show.toJSON() }));
            return this;
        },
        destroy: function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (confirm("Are you sure you want to delete this item")) {
                this.collection.destroy(this.model);
                this.$el.remove();
            }
        }
    });
});