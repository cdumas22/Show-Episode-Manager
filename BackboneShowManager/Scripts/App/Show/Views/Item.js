define(["text!Show/Templates/Item.html", "css!Show/Css/Item"], function (template) {
    return Backbone.View.extend({
        className: "show-view",
        template: Handlebars.compile(template),
        events: {
            "dblclick .field": "edit",
            "click button.save": "save",
            "click button.cancel": "edit"
        },
        initialize: function (options) {
            options || (options = {});
            this.model = options.model;
            this.collection = options.collection;

            if (this.model) {
                this.model.on('change', this.render, this);
            }
            
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            if (this.collection) {
                this.$el.addClass("editing");
            }
            return this;
        },
        edit: function () {
            if (this.collection) {
                window.location.hash = "shows";
            }

            if (this.$el.hasClass("editing")) {
                this.$el.removeClass("editing");
            } else {
                this.$el.addClass("editing");
            }
        },
        save: function (event) {
            event.stopPropagation();
            event.preventDefault();

            this.edit();

            this.model.set({
                title: this.$el.find('input[name=title]').val(),
                description: this.$el.find('input[name=description]').val()
            });
            if (this.collection) {
                this.model.set({ id: Math.floor(Math.random() * 100) + 1 })
                this.collection.create(this.model);
            } else {
                this.model.save();
            }

            
        }
    });
});